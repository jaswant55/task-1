import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService:JwtService) { }

  async login(dto: {email:string, id:string}) {
    const payload = { sub: dto.id, email: dto.email };
    return { access_token: this.jwtService.sign(payload) };
  }

   async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { password, ...rest } = user.toObject();
      return rest;
    }
    return null;
  }

  async register(body: { email: string, password: string, name: string }) {
    const existing = await this.userService.findByEmail(body.email);
    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }
    const user = await this.userService.create({ email: body.email, password: body.password, name: body.name });
    const { password: pwd, ...rest } = user.toObject();
    return rest;
  }

}
