import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  @Field(() => User)
  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
  author: User;

  @Field(() => [String], { nullable: true })
  @Column("text", { array: true, default: [] })
  tags: string[];
}
