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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipoController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const create_equipo_dto_1 = require("./dto/create-equipo.dto");
const prisma = new client_1.PrismaClient();
let EquipoController = class EquipoController {
    // 1. SELECT (Listar todos los equipos con sus mantenimientos)
    async obtenerEquipos(res) {
        try {
            const equipos = await prisma.equipo.findMany({
                include: { mantenimientos: true },
            });
            return res.status(common_1.HttpStatus.OK).json(equipos);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener los equipos' });
        }
    }
    // 2. INSERT (Crear un equipo validado con DTO)
    async crearEquipo(createEquipoDto, res) {
        try {
            const nuevoEquipo = await prisma.equipo.create({
                data: {
                    nombre: createEquipoDto.nombre,
                    codigo: createEquipoDto.codigo,
                    categoria: createEquipoDto.categoria,
                },
            });
            return res.status(common_1.HttpStatus.CREATED).json(nuevoEquipo);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: 'Error al crear el equipo (verifica que el código sea único)' });
        }
    }
    // 3. UPDATE (Actualizar un equipo por ID)
    async actualizarEquipo(id, body, res) {
        try {
            const equipoActualizado = await prisma.equipo.update({
                where: { id: Number(id) },
                data: body,
            });
            return res.status(common_1.HttpStatus.OK).json(equipoActualizado);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: 'Error al actualizar el equipo' });
        }
    }
    // 4. DELETE (Eliminar un equipo por ID)
    async eliminarEquipo(id, res) {
        try {
            const equipoEliminado = await prisma.equipo.delete({
                where: { id: Number(id) },
            });
            return res.status(common_1.HttpStatus.OK).json({ mensaje: 'Equipo eliminado correctamente', equipoEliminado });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ error: 'Error al eliminar el equipo' });
        }
    }
};
exports.EquipoController = EquipoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EquipoController.prototype, "obtenerEquipos", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_equipo_dto_1.CreateEquipoDto, Object]),
    __metadata("design:returntype", Promise)
], EquipoController.prototype, "crearEquipo", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], EquipoController.prototype, "actualizarEquipo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EquipoController.prototype, "eliminarEquipo", null);
exports.EquipoController = EquipoController = __decorate([
    (0, common_1.Controller)('equipos')
], EquipoController);
