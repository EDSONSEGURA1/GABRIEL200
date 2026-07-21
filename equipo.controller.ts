import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateEquipoDto } from './dto/create-equipo.dto';

const prisma = new PrismaClient();

@Controller('equipos')
export class EquipoController {

  // 1. SELECT (Listar todos los equipos con sus mantenimientos)
  @Get()
  async obtenerEquipos(@Res() res: any) {
    try {
      const equipos = await (prisma as any).equipo.findMany({
        include: { mantenimientos: true },
      });
      return res.status(HttpStatus.OK).json(equipos);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener los equipos' });
    }
  }

  // 2. INSERT (Crear un equipo validado con DTO)
  @Post()
  async crearEquipo(@Body() createEquipoDto: CreateEquipoDto, @Res() res: any) {
    try {
      const nuevoEquipo = await (prisma as any).equipo.create({
        data: {
          nombre: createEquipoDto.nombre,
          codigo: createEquipoDto.codigo,
          categoria: createEquipoDto.categoria,
        },
      });
      return res.status(HttpStatus.CREATED).json(nuevoEquipo);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error al crear el equipo (verifica que el código sea único)' });
    }
  }

  // 3. UPDATE (Actualizar un equipo por ID)
  @Put(':id')
  async actualizarEquipo(@Param('id') id: string, @Body() body: any, @Res() res: any) {
    try {
      const equipoActualizado = await (prisma as any).equipo.update({
        where: { id: Number(id) },
        data: body,
      });
      return res.status(HttpStatus.OK).json(equipoActualizado);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error al actualizar el equipo' });
    }
  }

  // 4. DELETE (Eliminar un equipo por ID)
  @Delete(':id')
  async eliminarEquipo(@Param('id') id: string, @Res() res: any) {
    try {
      const equipoEliminado = await (prisma as any).equipo.delete({
        where: { id: Number(id) },
      });
      return res.status(HttpStatus.OK).json({ mensaje: 'Equipo eliminado correctamente', equipoEliminado });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error al eliminar el equipo' });
    }
  }
}