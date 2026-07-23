import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe
} from '@nestjs/common';

import { MantenimientoService } from './mantenimiento.service';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';

@Controller('mantenimientos')
export class MantenimientoController {

  constructor(
    private readonly mantenimientoService: MantenimientoService
  ) {}

  @Post()
  create(
    @Body() createMantenimientoDto: CreateMantenimientoDto
  ) {
    return this.mantenimientoService.create(createMantenimientoDto);
  }

  @Get()
  findAll() {
    return this.mantenimientoService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.mantenimientoService.findOne(id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.mantenimientoService.remove(id);
  }
}