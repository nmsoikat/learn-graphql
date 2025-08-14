import { InputType, Field, Int, ID } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => ID)
  authorId: number; // User ID
}
