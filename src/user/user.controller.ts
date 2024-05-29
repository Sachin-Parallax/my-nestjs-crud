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
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('user') //like prefix we need to use /user
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info') //URL/user/info
  async getUserById(@Query('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  // @Post('create/new/user') // user/create/new/user
  // async createUser(
  //   @Body() userData: { name: string; email: string }, //old validation(default)
  // ): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }

  //this is how custom route setting
  @Post('create/new/user') // user/create/new/user
  async createUser(@Body(new ValidationPipe({ transform: true, whitelist: true })) createUserDto : CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.createUser(createUserDto);
  }


  @Delete('delete/user')
  async deleteUserData(@Query('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }

  @Put('update/user')
  async updateUserData(
    @Query('id') id: string, // Using @Query to get the id from the query parameter
    @Body(new ValidationPipe({transform: true, whitelist:true})) updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: updateUserDto,
    });
  }

  @Get('all') //URL/user/all
  async getUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

}

//service and controller are connected and if we declare a method like createUser deleteUser
//it must be done in service.ts
