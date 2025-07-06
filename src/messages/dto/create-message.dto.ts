import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
