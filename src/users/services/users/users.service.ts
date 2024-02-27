import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'john', email: 'john@example.com' },
    { username: 'Cory', email: 'cory@example.com' },
    { username: 'Greg', email: 'greg@example.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }
  createUsers(userDetails: CreateUserType) {
    this.fakeUsers.push(userDetails);
    return;
  }
  fetchUserById(id: number) {
    return { id, username: 'john', email: 'john@example.com' };
  }
}
