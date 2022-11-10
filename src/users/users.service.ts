// Nest module
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// Mongoose
import { Model } from 'mongoose';
// Schema
import { Users, UsersDocument } from "./schemas/user.schema"
// Dto
import { CreateUserDto } from "./dto/user-create.dto"
import { UpdateUserDto } from "./dto/user-update.dto"

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name) private usersModel: Model<UsersDocument>
    ) {}

    async getAll(): Promise<Users[]> {

        return this.usersModel.find().exec();

    }

    async getById(id: string): Promise<Users> {

        return this.usersModel.findById(id);

    }

    async create(userDto: CreateUserDto): Promise<Users> {

        const newUsers = new this.usersModel(userDto);

        return newUsers.save();

    }

    async remove(id: string): Promise<Users> {
        
        return this.usersModel.findByIdAndRemove(id);

    }

    async update(id: string, userDto: UpdateUserDto): Promise<Users> {
        
        return this.usersModel.findByIdAndUpdate(id, userDto);

    }

    async getUserByEmail(email: string): Promise<Users> {
        const user = await this.usersModel.findOne({email: email});

        return user
    }

}
