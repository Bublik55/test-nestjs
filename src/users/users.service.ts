import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  create(createUserDto: UserDto): Promise<User> {
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

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByName(name: string): Promise<User | undefined>{
	  return await  this.userModel.findOne({
		  where: {
			 name,
		  }
	  });
  }
  /*
  update(id: number, updateUserDto: UpdateUserDto):User {
    return this.users[id];
  }
*/
  async remove(id: string) {
    const user = await this.findOne(id);
    if (user) {
		await this.userModel.destroy({
			where:{
				
			}
		})
		return true;
	} 
	return false;
  }
}
