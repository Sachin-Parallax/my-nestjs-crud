import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user') //like prefix we need to use /user
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info') //URL/user/info
  async getUserById(@Query('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  //this is how custom route setting
  @Post('create/new/user') // user/create/new/user
  async createUser(
    @Body() userData: { name: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Delete('delete/user')
  async deleteUserData(@Query('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }

  @Put('update/user')
  async updateUserData(
    @Query('id') id: string, // Using @Query to get the id from the query parameter
    @Body() userData: { name?: string; email?: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Get('all') //URL/user/all
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

}

//service and controller are connected and if we declare a method like createUser deleteUser
//it must be done in service.ts
