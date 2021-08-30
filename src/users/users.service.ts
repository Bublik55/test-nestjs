import { Injectable } from '@nestjs/common';
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
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    console.log(createUserDto);
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

  async findOne(id: string)  {
    return await this.usersModel.findOne({
      where: {
        id,
      },
      include: [{ model: Columns }],
    });
  }

  async findOneByName(name: string) {
    return await this.usersModel.findOne({
      where: {
        name,
      },
    });
  }

  
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ){
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

  async remove(id: string): Promise<Boolean> {
    const user = await this.findOne(id);
    if (user) {
      await this.usersModel.destroy({
        where: { id },
      });
      return true;
    }
    return false;
  }
}
