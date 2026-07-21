import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    // Regla de negocio: Verificar si ya existe un equipo con ese mismo código
    const equipoExistente = await this.prisma.equipo.findUnique({
      where: { codigo: createItemDto.codigo },
    });

    if (equipoExistente) {
      throw new BadRequestException(`El equipo con el código ${createItemDto.codigo} ya está registrado.`);
    }

    return await this.prisma.equipo.create({ 
      data: createItemDto as any,
    });
  }

  async findAll() {
    return await this.prisma.equipo.findMany(); 
  }

  async findOne(id: string) {
    const data = await this.prisma.equipo.findUnique({ 
      where: { id: Number(id) }, 
    });
    if (!data) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
    return data;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    await this.findOne(id);
    return await this.prisma.equipo.update({ 
      where: { id: Number(id) }, 
      data: updateItemDto as any,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.equipo.delete({ 
      where: { id: Number(id) }, 
    });
  }
}