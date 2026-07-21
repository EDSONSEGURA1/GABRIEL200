"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MantenimientoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
let MantenimientoService = class MantenimientoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMantenimientoDto) {
        return this.prisma.mantenimiento.create({
            data: createMantenimientoDto,
        });
    }
    async findAll() {
        return this.prisma.mantenimiento.findMany({
            include: { equipo: true },
        });
    }
    async findOne(id) {
        const mantenimiento = await this.prisma.mantenimiento.findUnique({
            where: { id },
            include: { equipo: true },
        });
        if (!mantenimiento) {
            throw new common_1.NotFoundException(`Mantenimiento con ID ${id} no encontrado`);
        }
        return mantenimiento;
    }
    async update(id, createMantenimientoDto) {
        await this.findOne(id); // Valida que exista
        return this.prisma.mantenimiento.update({
            where: { id },
            data: createMantenimientoDto,
        });
    }
    async remove(id) {
        await this.findOne(id); // Valida que exista
        return this.prisma.mantenimiento.delete({
            where: { id },
        });
    }
};
exports.MantenimientoService = MantenimientoService;
exports.MantenimientoService = MantenimientoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MantenimientoService);
