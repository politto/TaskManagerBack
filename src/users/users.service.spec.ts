import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './entities/users.entity';
import { DatabaseModule } from '../database.module';
import { ConfigModule } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;
//   let controller: UsersController;
// 
//   const mockUsersController = {
//     getUsers: jest.fn(),
//     createUser: jest.fn(),
//     putUser: jest.fn(),
//     patchUser: jest.fn(),
//     deleteUser: jest.fn()
//   }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(
        {
          isGlobal: true,
        }
      ), DatabaseModule, SequelizeModule.forFeature([Users])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it ('should return the correct list of users from the database', async () => {
      const result = await service.findAll();
  
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('createUser', () => {
    it ('should return the user after creating it', async () => {
      const user = {
        email:"dd@gmail.com",
        password: "password"
      }
      const result = await service.createUser(user);

      const expectedUser = {
        id: expect.any(String),
        email:"dd@gmail.com",
        password: "password"
      }

      console.log(result);

      expect(result.dataValues).toMatchObject(expectedUser)

      const updateUser = {
        id: result.id,
        firstName: 'Johnny',
        lastName: 'Sins',
        age: 28
      }

      const updated = await service.updateUser(updateUser);

      expect(updated.dataValues).toMatchObject(updateUser);

      const deleted = await service.deleteUser(result.id);

      expect(deleted).toBe(1);
    })
  });


});


