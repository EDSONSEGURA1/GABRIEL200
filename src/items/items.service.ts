import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createItemDto: CreateItemDto) {

    const existe = await this.prisma.equipo.findUnique({
      where: {
        codigo: createItemDto.codigo,
      },
    });

    if (existe) {
      throw new BadRequestException(
        `El equipo con código ${createItemDto.codigo} ya existe`
      );
    }

    return this.prisma.equipo.create({
      data: createItemDto,
    });
  }

  async findAll() {
    return this.prisma.equipo.findMany();
  }

  async findOne(id: string) {

    const item = await this.prisma.equipo.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!item) {
      throw new NotFoundException(
        `Registro con ID ${id} no encontrado`
      );
    }

    return item;
  }

  async update(
    id: string,
    updateItemDto: UpdateItemDto
  ) {

    await this.findOne(id);

    return this.prisma.equipo.update({
      where: {
        id: Number(id),
      },
      data: updateItemDto,
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