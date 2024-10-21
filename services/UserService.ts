import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AppDataSource } from '../configs/database';
import { User } from '../entities/User';

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getOne(id: number) {
        const user = await this.userRepository.find({
            where: { id: id }
        });
        return user || null;
    }

    async create(userData: User) {
        const user = this.userRepository.create(userData);
        user.password = await bcrypt.hash(user.password, 10);
        return await this.userRepository.save(user);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (user) {
            const pass = await bcrypt.compare(password, user.password);
            const token = jwt.sign({ id: user.id }, 'key');
            if (pass) {
                return { success: true, user, token };
            } else {
                return { success: false, message: 'Login failed !' };
            }
        } else {
            return { success: false, message: 'Login failed !' };
        }
    }
}
