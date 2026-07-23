import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';

@Injectable()
export class EquipoService {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  async findAll() {
    return this.prisma.equipo.findMany({
      include: {
        mantenimientos: true,
      },
    });
  }

  async create(createEquipoDto: CreateEquipoDto) {

    const equipoExistente = await this.prisma.equipo.findUnique({
      where: {
        codigo: createEquipoDto.codigo,
      },
    });

    if (equipoExistente) {
      throw new BadRequestException(
        `El equipo con código ${createEquipoDto.codigo} ya está registrado`
      );
    }

    return this.prisma.equipo.create({
      data: createEquipoDto,
    });
  }

  async findOne(id: string) {

    const equipo = await this.prisma.equipo.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        mantenimientos: true,
      },
    });

    if (!equipo) {
      throw new NotFoundException(
        `Equipo con ID ${id} no encontrado`
      );
    }

    return equipo;
  }

  async update(
    id: string,
    body: Partial<CreateEquipoDto>
  ) {

    await this.findOne(id);

    return this.prisma.equipo.update({
      where: {
        id: Number(id),
      },
      data: body,
    });
  }

  async remove(id: string) {

    await this.findOne(id);

    return this.prisma.equipo.delete({
      where: {
        id: Number(id),
      },
    });
  }
}