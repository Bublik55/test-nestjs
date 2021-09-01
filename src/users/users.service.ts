import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import * as bcrypt from 'bcrypt';
import { Users, Columns } from 'src/models';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new Users();
    user.username = createUserDto.name;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    return await user.save();
  }

  async findAll() {
    return await this.usersModel.findAll({
      limit: 10,
      include: [
        {
          model: Columns,
        },
      ],
    });
  }

  async findOne(id: string) {
    const res = await this.usersModel.findOne({
      where: { id },
      include: [{ model: Columns }],
    });
    if (res) {
      return res;
    } else throw new NotFoundException(`User don't exists`);
  }

  async findOneByName(name: string) {
    return await this.usersModel.findOne({
      where: {
        username: name,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
    const model = await this.usersModel.findOne({ where: { id } });
    if (model) {
      return await model.update(
        {
          username: updateUserDto.name,
          password: hashPassword,
        },
        { where: { id } },
      );
    } else throw new NotFoundException("User don't exists");
  }

  async remove(id: string) {
    const res = await this.usersModel.destroy({ where: { id } });
    if (res) return true;
    else return false;
  }
}
