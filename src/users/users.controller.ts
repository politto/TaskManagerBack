import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { CreateUser } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }

    @Get()
    async findAll(): Promise<Users[]> {
        return this.usersService.findAll();
    }
    
    @Get(":id")
    async getUsers(@Param('id') userId: string) {
        return this.usersService.getUsers(userId);
    }

    @Post("createUser")
    async createUser(@Body() userBody: CreateUser): Promise<Users> {
        return  this.usersService.createUser(userBody);
    }

    @Put("updateUser")
    async updateUser(@Body() userBody: UpdateUserDto): Promise<Users> {
        return  this.usersService.updateUser(userBody);
    }

    @Patch("patchUser")
    async patchUser(@Body() userBody: any): Promise<Users> {
        return  this.usersService.patchUser(userBody);
    }

    @Delete("deleteUser/:id")
    async deleteUser(@Param('id') userId: string): Promise<number> {
        return  this.usersService.deleteUser(userId);
    }
}
