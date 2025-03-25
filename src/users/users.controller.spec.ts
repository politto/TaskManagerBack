import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  
  const mockUsersService = {
    getUsers: jest.fn(),
    createUser: jest.fn(),
    putUser: jest.fn(),
    patchUser: jest.fn(),
    deleteUser: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);

    
  });

  const mockParams = '1';
  const mockUserBody = {
    "id": "1",
    "email": "dd@hotmail.com",
    "password": "password"
  }


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return params', async () => {
    mockUsersService.getUsers.mockResolvedValue('User id:' + mockParams + " says Ambatukammm ahhh");
    mockUsersService.createUser.mockResolvedValue(mockUserBody);
    mockUsersService.putUser.mockResolvedValue("sleepy ah");
    mockUsersService.patchUser.mockResolvedValue("You are my mita");
    mockUsersService.deleteUser.mockResolvedValue('User id:' + mockParams + " deleted i u a ii o ia");

    const getRes = await controller.getUsers(mockParams);
    expect(usersService.getUsers).toHaveBeenCalledWith(mockParams);
    expect(getRes).toEqual('User id:' + mockParams + " says Ambatukammm ahhh");

    const postRes = await controller.createUser(mockUserBody);
    expect(usersService.createUser).toHaveBeenCalledWith(mockUserBody);
    expect(postRes).toEqual(mockUserBody);

    const putRes = await controller.updateUser(mockUserBody);
    expect(usersService.updateUser).toHaveBeenCalledWith(mockUserBody);
    expect(putRes).toEqual("sleepy ah");

    const patchRes = await controller.patchUser(mockUserBody);
    expect(usersService.patchUser).toHaveBeenCalledWith(mockUserBody);
    expect(patchRes).toEqual("You are my mita");

    const deleteRes = await controller.deleteUser(mockParams);
    expect(usersService.deleteUser).toHaveBeenCalledWith(mockParams);
    expect(deleteRes).toEqual('User id:' + mockParams + " deleted i u a ii o ia");
  });
});
