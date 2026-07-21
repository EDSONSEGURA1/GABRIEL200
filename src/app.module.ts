import { Module } from '@nestjs/common';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { MantenimientoController } from './mantenimientos/mantenimiento.controller';
import { MantenimientoService } from './mantenimientos/mantenimiento.service';
import { EquipoController } from './equipo/equipo.controller';
import { EquipoService } from './equipo/equipo.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [ItemsController, MantenimientoController, EquipoController],
  providers: [ItemsService, MantenimientoService, EquipoService, PrismaService],
})
export class AppModule {}