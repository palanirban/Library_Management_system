import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        ...dto,
        availableCopies: dto.totalCopies ?? 1,
      },
    });
  }

  findAll(search?: string) {
    if (search) {
      return this.prisma.book.findMany({
        where: {
          OR: [
            { title: { contains: search} },
            { author: { contains: search} },
            { isbn: { contains: search} },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return this.prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id); // check existence

    return this.prisma.book.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // check existence

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
