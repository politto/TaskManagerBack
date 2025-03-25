import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  imports: [
    SequelizeModule.forFeature([
      Users
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [AuthService]
})
export class AuthModule {}

//now work on the auth.controller.ts file and integrate with front end
