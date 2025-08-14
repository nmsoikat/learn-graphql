import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
    @Field()
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @Field()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}