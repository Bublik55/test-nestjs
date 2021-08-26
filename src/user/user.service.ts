import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    console.log(createUserDto);
    return user.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
  /*
  update(id: number, updateUserDto: UpdateUserDto):User {
    return this.users[id];
  }
*/
  async remove(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
