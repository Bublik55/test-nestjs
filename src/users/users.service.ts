import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: typeof Users,
  ) {}

  create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    console.log(createUserDto);
    return user.save();
  }

  findAll(): Promise<Users[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<Users> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByName(name: string): Promise<Users | undefined> {
    return await this.userModel.findOne({
      where: {
        name,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
    await this.userModel.update(
      {
        name: updateUserDto.name,
        password: hashPassword,
        email: updateUserDto.email,
      },
      { where: { id } },
    );
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      await this.userModel.destroy({
        where: {},
      });
      return true;
    }
    return false;
  }
}
