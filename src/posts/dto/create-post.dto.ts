import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 20)
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
}
