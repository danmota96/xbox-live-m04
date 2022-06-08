import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { generateKey } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';



@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async findById(id: string): Promise<Genre> {
    const record = await this.prisma.genre.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o ID: '${id}' não encontrado`);
    }

    return record;
  }

  async create(user: User, dto: CreateGenreDto ): Promise<Genre> {
     if(user.isAdmin){
       const genre: Genre = { ...dto};
       return await this.prisma.genre.create({ data: genre})
     }else{
      throw new UnauthorizedException('Usuário não autorizado. Contate o Administrador!')
     }
  }

  async update( id: string, dto: UpdateGenreDto, user: User,): Promise<Genre> {
    if(user.isAdmin){
      await this.findById(id);
      const data: Partial<Genre> = { ...dto };
      return this.prisma.genre
      .update({
        where: { id },
         data
        }).catch(handleError);
    }else{
      throw new UnauthorizedException('Usuário não autorizado. Contate o Administrador!')
    }
  }

  async delete(user: User, id: string) {
    if(user.isAdmin){
      await this.findById(id);
      await this.prisma.genre.delete({ where: { id } });
    }else{
     throw new UnauthorizedException('Usuário não autorizado. Contate o Administrador!')
    }
  }
}
