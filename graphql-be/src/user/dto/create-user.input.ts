import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @Field()
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @Field()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}