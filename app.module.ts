import { Module } from '@nestjs/common';
import { MantenimientoController } from './dto/mantenimientos/mantenimiento.controller';
import { MantenimientoService } from './dto/mantenimientos/mantenimiento.service';
import { PrismaService } from './prisma.service';
@Module({
  imports: [],
  controllers: [MantenimientoController],
  providers: [MantenimientoService, PrismaService],
})
export class AppModule {}