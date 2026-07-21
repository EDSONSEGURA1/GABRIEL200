import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMantenimientoDto {
  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNotEmpty()
  equipoId!: number;
}