import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const user = await this.userRepo.findOneBy({ id: createPostInput.authorId });
    if (!user) throw new Error('User not found');

    const post = this.postRepo.create({
      ...createPostInput,
      author: user,
    });

    return this.postRepo.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepo.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepo.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    return post;
  }

  async update(id: number, input: UpdatePostInput) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) return null;
    await this.postRepo.update(id, input)
    return Object.assign(post, input);
  }

  async remove(id: number) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) return false;
    await this.postRepo.remove(post);
    return true;
  }
}
