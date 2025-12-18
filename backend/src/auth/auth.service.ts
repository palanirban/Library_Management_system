import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { username }});
    if (!user) throw new UnauthorizedException();
    const ok = await bcrypt.compare(pass, user.password);
    if (!ok) throw new UnauthorizedException();
    const { password, ...rest } = user;
    return rest;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
