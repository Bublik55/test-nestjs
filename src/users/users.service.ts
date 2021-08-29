import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { Users } from '../models/users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    console.log(createUserDto);
    return await user.save();
  }

  async findAll(): Promise<Users[]> {
    return await this.usersModel.findAll();
  }

  async findOne(id: string): Promise<Users> {
    return await this.usersModel.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByName(name: string): Promise<Users> {
    return await this.usersModel.findOne({
      where: {
        name,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
    await this.usersModel.update(
      {
        name: updateUserDto.name,
        password: hashPassword,
        email: updateUserDto.email,
      },
      { where: { id } },
    );
    return await this.usersModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
      await this.usersModel.destroy({
        where: {},
      });
      return true;
    }
    return false;
  }
}
