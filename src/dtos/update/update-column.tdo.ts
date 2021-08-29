import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateColumnDto } from '../';

export class UpdateColumnDto extends PartialType (CreateColumnDto) {
  @IsString()
  @ApiProperty({
	  description: 'Author\'s id. Only auhor can update content'
  })
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @ApiProperty({
	  description: 'Column\'s content',
	  example: 'Some awesome content which will replace exists content'
  })
  @IsNotEmpty()
  readonly content: string;
}