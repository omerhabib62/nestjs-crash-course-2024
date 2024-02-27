import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  // ParseBoolPipe,
  ParseIntPipe,
  Post,
  // Query,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Req,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request, Response } from 'express';
// import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Get('posts')
  getUserPosts() {
    return [
      {
        username: 'john',
        email: 'john@example.com',
        posts: [
          {
            id: 1,
            title: 'Post 1',
          },
          {
            id: 2,
            title: 'Post 2',
          },
          {
            id: 3,
            title: 'Post 3',
          },
        ],
      },
    ];
  }
  //Using Request for post
  //   @Post()
  //   createUser(@Req() request: Request, @Res() response: Response) {
  //     const body = request.body;
  //     console.log(body);
  //     // response.status(201).send(body);
  //     response.status(201).send(body);
  //   }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUsers(userData);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    if (id == null) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    // Use id variable
    return this.userService.fetchUserById(id);
  }
}
