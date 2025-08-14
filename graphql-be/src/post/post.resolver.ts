import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) { }

  @Mutation(() => Post)
  createPost(@Args('input') input: CreatePostInput) {
    return this.postService.create(input);
  }

  @Query(() => [Post], { nullable: true })
  posts() {
    return this.postService.findAll();
  }

  @Query(() => Post, { nullable: true })
  post(@Args('id', { type: () => ID }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post, { nullable: true })
  updatePost(@Args('input') input: UpdatePostInput) {
    return this.postService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  deletePost(@Args('id', { type: () => ID }) id: number) {
    return this.postService.remove(id);
  }
}
