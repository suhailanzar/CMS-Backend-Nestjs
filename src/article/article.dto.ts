import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class articleDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsOptional()
  date?: Date;

  @IsNotEmpty({ message: 'User ID is required' })
  userid: Types.ObjectId;

  @IsOptional() // Make it optional for cases where the ID might not be provided
  articleId?: Types.ObjectId; // Adding articleId for updates or retrievals
}
