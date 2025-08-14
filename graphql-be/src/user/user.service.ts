import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async create(input: CreateUserInput) {
        const { name, email, password } = input;
        const hashed = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ name, email, password: hashed });
        return this.userRepo.save(user);
    }

    async validateUser(email: string, password: string) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }),
        };
    }

    findAll() {
        return this.userRepo.find();
    }

    findOne(id: number) {
        return this.userRepo.findOneBy({ id });
    }

    async update(id: number, input: UpdateUserInput) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) return null;
        await this.userRepo.update(id, input)
        return Object.assign(user, input);
    }

    async remove(id: number) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) return false;
        await this.userRepo.remove(user);
        return true;
    }

    async findOneWithPosts(id: number): Promise<User | null> {
        return this.userRepo.findOne({
            where: { id },
            relations: ['posts'], // Load posts along with the user
        });
    }
}
