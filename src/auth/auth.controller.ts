import { Body, Controller, Get, Headers, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from 'src/users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(200)
    //@HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Post('signup')
    signUp(@Body() signUpDto: CreateUser) {
        return this.authService.signUp(signUpDto);
    }

    //verify token and return user
    @Get('verifyToken')
    verifyToken(@Headers('authorization') authHeader: string) {
        // Extract token from Bearer token format if needed
        const token = authHeader && authHeader.split(' ')[1];
        return this.authService.verifyToken(token);
    }

}
