import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import * as bcrypt from 'bcrypt';
import { Users, Columns } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new Users();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const res = await this.userRepository.findOne(id);
    if (res) {
      return res;
    } else throw new NotFoundException(`User don't exists`);
  }

  async findOneByName(name: string) {
    return await this.userRepository.findOne({
      where: {
        username: name,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
    const model = await this.userRepository.findOne({ where: { id } });
    if (model) {
     } else throw new NotFoundException("User don't exists");
  }

  async remove(id: string) {
    const res = await this.userRepository.delete(id);
    if (res) return true;
    else return false;
  }
}
