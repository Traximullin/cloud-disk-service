import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { Users } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get()
    getAll(): Promise<Users[]> {

        return this.usersService.getAll();

    }

    @Get(":id")
    getOne(@Param("id") id: string): Promise<Users> {

        return this.usersService.getById(id);

    }
    
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<Users> {

        return this.usersService.create(createUserDto);

    }

}
