import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findUserMessages(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
        errors: [
          {
            field: 'userId',
            message: `El usuario con ID ${userId} no está registrado en el sistema`,
          },
        ],
      });
    }

    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { messages: true },
    });
  }
}
