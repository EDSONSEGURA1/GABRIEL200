"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const items_controller_1 = require("./items/items.controller");
const items_service_1 = require("./items/items.service");
const mantenimiento_controller_1 = require("./mantenimientos/mantenimiento.controller");
const mantenimiento_service_1 = require("./mantenimientos/mantenimiento.service");
const equipo_controller_1 = require("./equipo/equipo.controller");
const equipo_service_1 = require("./equipo/equipo.service");
const prisma_service_1 = require("./prisma.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [items_controller_1.ItemsController, mantenimiento_controller_1.MantenimientoController, equipo_controller_1.EquipoController],
        providers: [items_service_1.ItemsService, mantenimiento_service_1.MantenimientoService, equipo_service_1.EquipoService, prisma_service_1.PrismaService],
    })
], AppModule);
