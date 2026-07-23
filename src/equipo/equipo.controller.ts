import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param
} from '@nestjs/common';

import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';

@Controller('equipos')
export class EquipoController {

  constructor(
    private readonly equipoService: EquipoService
  ) {}

  @Get()
  obtenerEquipos() {
    return this.equipoService.findAll();
  }

  @Post()
  crearEquipo(
    @Body() createEquipoDto: CreateEquipoDto
  ) {
    return this.equipoService.create(createEquipoDto);
  }

  @Put(':id')
  actualizarEquipo(
    @Param('id') id: string,
    @Body() body: Partial<CreateEquipoDto>
  ) {
    return this.equipoService.update(id, body);
  }

  @Delete(':id')
  eliminarEquipo(
    @Param('id') id: string
  ) {
    return this.equipoService.remove(id);
  }
}