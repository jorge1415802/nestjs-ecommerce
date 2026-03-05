import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/database/entities/role.entity';
import { errorMessages } from 'src/errors/custom';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  async findById(roleId: number) {
    const role = await this.rolesRepository.findOne({
      where: {
        id: roleId,
      },
    });
    if (!role) {
      throw new NotFoundException(errorMessages.role.notFound);
    }
    return role;
  }
}
