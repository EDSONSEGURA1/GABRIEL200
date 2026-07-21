import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  codigo!: string;      // <-- Agregado para cumplir con la base de datos

  @IsString()
  @IsNotEmpty()
  categoria!: string;   // <-- Agregado para cumplir con la base de datos

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  precio!: number;

  @IsNumber()
  @Min(0)
  stock!: number;
}