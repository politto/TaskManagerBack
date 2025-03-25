import { IsString, IsNotEmpty, Length, IsNumber } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    password: string;
}