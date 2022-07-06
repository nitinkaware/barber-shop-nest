import { IsDateString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateEventDto {
  @IsEmail()
  @Length(5, 255)
  email: string;

  @IsNotEmpty()
  @Length(1, 255)
  firstName: string;

  @IsNotEmpty()
  @Length(1, 255)
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  bookingTime: string;
}
