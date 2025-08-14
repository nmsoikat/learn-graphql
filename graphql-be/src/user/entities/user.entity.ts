import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@ObjectType() // <-- Makes it a GraphQL type
@Entity()     // <-- Makes it a TypeORM table
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Field(() => [Post], { nullable: true })
    @OneToMany(() => Post, post => post.author)
    posts: Post[];
}
