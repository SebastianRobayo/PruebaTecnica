// src/messages/messages.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: createMessageDto.userId },
    });

    if (!userExists) {
      throw new NotFoundException(
        `Usuario con ID ${createMessageDto.userId} no fue encontrado.`,
      );
    }

    return this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        user: {
          connect: { id: createMessageDto.userId },
        },
      },
    });
  }
}
