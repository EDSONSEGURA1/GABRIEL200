import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';

@Injectable()
export class MantenimientoService {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createMantenimientoDto: CreateMantenimientoDto) {

    return this.prisma.mantenimiento.create({
      data: createMantenimientoDto,
    });
  }

  async findAll() {

    return this.prisma.mantenimiento.findMany({
      include: {
        equipo: true,
      },
    });
  }

  async findOne(id: number) {

    const mantenimiento =
      await this.prisma.mantenimiento.findUnique({
        where: {
          id,
        },
        include: {
          equipo: true,
        },
      });

    if (!mantenimiento) {
      throw new NotFoundException(
        `Mantenimiento con ID ${id} no encontrado`
      );
    }

    return mantenimiento;
  }

  async update(
    id: number,
    createMantenimientoDto: CreateMantenimientoDto
  ) {

    await this.findOne(id);

    return this.prisma.mantenimiento.update({
      where: {
        id,
      },
      data: createMantenimientoDto,
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    return this.prisma.mantenimiento.delete({
      where: {
        id,
      },
    });
  }
}