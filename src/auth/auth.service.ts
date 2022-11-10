import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/user-create.dto';
import { Users } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtSerivce: JwtService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);

        if(candidate) {
            throw new HttpException({message: "Пользователь уже существует"},HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password,5);
        
        const user = await this.usersService.create({...userDto, password: hashPassword});

        return this.generateToken(user)
    }

    private async generateToken(user: Users) {
        const payload = {
            email: user.email
        }

        return {
            token: this.jwtSerivce.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        
        const user = await this.usersService.getUserByEmail(userDto.email);
        const passCheck = await bcrypt.compare(userDto.password, user.password);

        if(user && passCheck) user;

        throw new UnauthorizedException({message: "Некорректные данные."})

    }
}
