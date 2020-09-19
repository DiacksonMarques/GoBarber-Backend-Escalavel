import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHahsProvider from '../providers/HashProvider/models/IHahsProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
    email: string;
    password: string;
}

interface Reponse {
    user: User;
    token: string;
}

@injectable()
class AutheticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HahsProvider')
        private hahsProvider: IHahsProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<Reponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorret email/password combination.', 401);
        }

        const passwordMatched = await this.hahsProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorret email/password combination.', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AutheticateUserService;
