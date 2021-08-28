import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @IsString()
  @ApiProperty({
	  description: 'Column\'s content',
	  example: 'Some awesome content'
  })
  @IsNotEmpty()
  readonly content: string;
}
