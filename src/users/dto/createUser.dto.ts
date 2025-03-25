import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateUser {
    // id: string;
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    password: string;
}