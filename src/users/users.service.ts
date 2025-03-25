import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/users.entity';
import { CreateUser } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    updateUserPassword(id: string, hashedPassword: string) {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectModel(Users)
        private readonly UsersRepository: typeof Users
    ) {}

    async findAll(): Promise<Users[]> {
        return this.UsersRepository.findAll();
    }

    async getUsers(id: string)  {
        return await this.UsersRepository.findOne({ where: { id: id } });
    }

    async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }

    async getUserByEmail (email: string) {
        return await this.UsersRepository.findOne({ where: { email: email } });
    }

    async createUser(user: CreateUser) {
        
        return this.UsersRepository.create({
            // id: user.id,
            email: user.email,
            password: user.password
    });
    }

    async hashPassword(password: string) {
        //hash password here using bcrypt
        const saltRnds = 15;
        return await bcrypt.hash(password, saltRnds);
    }

        

    async updateUser(user: any) {
        const foundUser = this.UsersRepository.findOne({ where: { id: user.id } });

        return (await foundUser)!.update({ 
            email: user.email,
            password: user.password
        });

    }

    async patchUser(user: any) {
        const foundUser = this.UsersRepository.findOne({ where: { id: user.id } });

        return (await foundUser)!.update({ 
            email: user.email,
            password: user.password
        });
    }


    async deleteUser(id: string) {
        return await this.UsersRepository.destroy({ where: { id: id } });
    }
}

