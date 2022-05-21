import {IsNumber, IsPositive} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto{
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Nome do jogo',
    example: 'Forza 7',
  })
  nome: string;
  @ApiProperty({
    description: 'Descrição do jogo',
    example: 'História, etc.',
  })
  descricao: string;
  @ApiProperty({
    description: 'O número do jogo',
    example: '1',
  })
  number: number;
}
