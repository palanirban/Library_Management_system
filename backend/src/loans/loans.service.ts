import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { addDays, startOfDay } from 'date-fns';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  // Issue a book
  async issue({ bookId, memberId, serialNo, issuedAt, dueAt, remarks }: any) {
    // validations:
    const book = await this.prisma.book.findUnique({ where: { id: bookId }});
    if (!book) throw new NotFoundException('Book not found');
    if (book.availableCopies <= 0) throw new BadRequestException('Book not available');

    const member = await this.prisma.member.findUnique({ where: { id: memberId }});
    if (!member) throw new NotFoundException('Member not found');

    // Issue Date cannot be less than today:
    if (issuedAt && new Date(issuedAt) < startOfDay(new Date())) {
      throw new BadRequestException('Issue date cannot be earlier than today');
    }
    // Default due date = issuedAt + 15 days
    const issued = issuedAt ? new Date(issuedAt) : new Date();
    const defaultDue = addDays(issued, 15);
    const due = dueAt ? new Date(dueAt) : defaultDue;

    // due cannot be > issued + 15 days
    const maxAllowed = addDays(issued, 15);
    if (due > maxAllowed) throw new BadRequestException('Return date cannot be greater than 15 days from issue');

    // create loan and decrease availableCopies
    const loan = await this.prisma.loan.create({
      data: {
        bookId, memberId, serialNo, issuedAt: issued, dueAt: due, remarks,
      },
    });

    await this.prisma.book.update({
      where: { id: bookId },
      data: { availableCopies: book.availableCopies - 1 },
    });

    return loan;
  }

  // Return book
  async returnBook({ loanId, returnedAt, serialNo, finePaid, finePaidAmount, remarks }: any) {
    const loan = await this.prisma.loan.findUnique({ where: { id: loanId }, include: { book: true }});
    if (!loan) throw new NotFoundException('Loan not found');

    // serial no is mandatory to return:
    if (!serialNo) throw new BadRequestException('Serial No is required');

    // fine calculation (if returned after dueDate)
    const returned = returnedAt ? new Date(returnedAt) : new Date();
    let fineRecord = null;
    if (returned > loan.dueAt) {
      const daysLate = Math.ceil((returned.getTime() - loan.dueAt.getTime()) / (1000*60*60*24));
      const amount = daysLate * 1.0; // e.g., 1 currency per day
      fineRecord = await this.prisma.fine.create({
        data: { amount, paid: !!finePaid, paidAt: finePaid ? returned : null, remarks },
      });
      // link fine
      await this.prisma.loan.update({ where: { id: loanId }, data: { fineId: fineRecord.id }});
    }

    // if pending fine and not paid, disallow finalizing return (per requirements)
    if (fineRecord && !finePaid) {
      throw new BadRequestException('Fine exists; please mark fine as paid to complete return');
    }

    // finalize return: set returnedAt and increase book availableCopies
    await this.prisma.loan.update({ where: { id: loanId }, data: { returnedAt: returned }});
    await this.prisma.book.update({
      where: { id: loan.bookId },
      data: { availableCopies: loan.book.availableCopies + 1 },
    });

    // mark fine as paid if applicable
    if (fineRecord && finePaid) {
      await this.prisma.fine.update({ where: { id: fineRecord.id }, data: { paid: true, paidAt: returned }});
    }

    return { success: true };
  }

  // Search books and include radio-select logic happens on frontend
}
