import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    const created = await this.prisma.book.create({
      data: {
        ...dto,
        availableCopies: dto.totalCopies ?? 1,
      },
    });
    return created;
  }

  findAll(search?: string) {
    const where = search ? {
      OR: [
        { title: { contains: search } },
        { author: { contains: search } },
        { isbn: { contains: search } },
      ]
    } : undefined;

    return this.prisma.book.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id }});
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id);
    return this.prisma.book.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({ where: { id }});
  }
}
