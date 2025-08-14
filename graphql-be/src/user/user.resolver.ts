import { Resolver, Query, Mutation, Args, Int, ID, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/gql-auth.guard';
import { CurrentUser } from '../decorator/current-user.decorator';
import { Public } from 'src/decorator/public.decorator';
import { GqlContextType } from 'src/gql-context.type';

@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Mutation(() => User)
    @Public()
    createUser(@Args('input') input: CreateUserInput) {
        return this.userService.create(input);
    }

    @Mutation(() => String)
    @Public()
    async login(@Args('input') input: LoginInput) {
        const user = await this.userService.validateUser(input.email, input.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const token = await this.userService.login(user);
        return token.access_token;
    }

    @Query(() => [User], { nullable: true })
    users(@Context() context: GqlContextType) {
        console.log("🚀 ~ context.user:", context.user)
        return this.userService.findAll();
    }

    @Query(() => User, { nullable: true })
    // @UseGuards(GqlAuthGuard)
    // users(@CurrentUser() user: User) {
    user(@Args('id', { type: () => ID }) id: number) {
        return this.userService.findOne(id);
    }

    @Mutation(() => User, { nullable: true })
    updateUser(@Args('input') input: UpdateUserInput) {
        return this.userService.update(input.id, input);
    }

    @Mutation(() => Boolean)
    deleteUser(@Args('id', { type: () => ID }) id: number) {
        return this.userService.remove(id);
    }

    @Query(() => User, { nullable: true })
    userPosts(@Args('id', { type: () => ID }) id: number): Promise<User | null> {
        return this.userService.findOneWithPosts(id);
    }
}
