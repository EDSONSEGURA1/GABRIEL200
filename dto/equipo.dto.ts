import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEquipoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  codigo!: string;

  @IsString()
  @IsNotEmpty()
  categoria!: string;
}