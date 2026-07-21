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
exports.EquipoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let EquipoService = class EquipoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.equipo.findMany({
            include: { mantenimientos: true },
        });
    }
    async create(createEquipoDto) {
        const equipoExistente = await this.prisma.equipo.findUnique({
            where: { codigo: createEquipoDto.codigo },
        });
        if (equipoExistente) {
            throw new common_1.BadRequestException(`El equipo con el código ${createEquipoDto.codigo} ya está registrado.`);
        }
        return this.prisma.equipo.create({
            data: createEquipoDto,
        });
    }
    async update(id, body) {
        await this.findOne(id);
        return this.prisma.equipo.update({
            where: { id: Number(id) },
            data: body,
        });
    }
    async findOne(id) {
        const equipo = await this.prisma.equipo.findUnique({
            where: { id: Number(id) },
            include: { mantenimientos: true },
        });
        if (!equipo) {
            throw new common_1.NotFoundException(`Equipo con ID ${id} no encontrado`);
        }
        return equipo;
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.equipo.delete({
            where: { id: Number(id) },
        });
    }
};
exports.EquipoService = EquipoService;
exports.EquipoService = EquipoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EquipoService);
