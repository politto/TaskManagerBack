import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";

export class createAndUpdateTask {
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    title: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    description: string;

    @IsEnum(["pending", "in_progress", "completed"])
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}