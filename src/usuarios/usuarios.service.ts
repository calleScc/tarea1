import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly servicio: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    return this.servicio.user.create({ data: createUsuarioDto });
  }

  async listarTodos() {
    return this.servicio.user.findMany();
  }

  async findOne(id: number) {
    const usuario = await this.servicio.user.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);
    return this.servicio.user.update({ where: { id }, data: updateUsuarioDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.servicio.user.delete({ where: { id } });
  }
}
