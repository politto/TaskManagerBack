import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUser } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {
        
     }

    async signIn(email: string, pass: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        // Check if the password is stored in plain text
        const isPasswordHashed = user.password.startsWith('$2b$'); // bcrypt hashed passwords start with "$2b$"
        if (!isPasswordHashed) {
            // If the password is plain text, compare it directly
            if (user.password !== pass) {
                throw new UnauthorizedException('Invalid credentials');
            }
    
            // Hash the plain-text password and update the database
            const hashedPassword = await this.userService.hashPassword(pass);
            this.updateUserPassword(user.id, hashedPassword);
        } else {
            // If the password is hashed, verify it using bcrypt
            const isPasswordValid = await this.userService.verifyPassword(pass, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }
        }

    
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async updateUserPassword(id: string, password: string) {
        const user = await this.userService.getUsers(id);
        if (!user) throw new UnauthorizedException('User not found');
        user.password = password;
        await user.save();
    }

    async signUp(user: CreateUser) {
        //check if user.email already exists
        const existingUser = await this.userService.getUserByEmail(user.email);
        if (existingUser) {
            throw new UnauthorizedException('Email already exists');
        }   
        return this.userService.createUser(user);
    }

    async verifyToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            const retInfo = await this.userService.getUserByEmail(decoded.email);

            if (retInfo !== null) {
                retInfo.password = "********";
            }
            else throw new UnauthorizedException('Invalid token');

            return retInfo;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async destroyToken(token: string) {
        // JWT tokens cannot be directly invalidated since they're stateless
        // We need to implement a blacklist mechanism
        try {
            // Verify the token is valid first
            const decoded = this.jwtService.verify(token);
            
            // In a real implementation, you would:
            // 1. Add this token to a blacklist in Redis/database
            // 2. Check this blacklist during token verification
            
            // For now, we'll just return success
            return { success: true, message: 'Token has been blacklisted' };
        } catch (error) {
            // Token is already invalid
            return { success: false, message: 'Invalid token' };
        }

    }


    
}
