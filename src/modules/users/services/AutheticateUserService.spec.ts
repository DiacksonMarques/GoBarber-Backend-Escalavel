import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AutheticateUserService from './AutheticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const autheticateUser = new AutheticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@exempla.com',
            password: '123456',
        });

        const response = await autheticateUser.execute({
            email: 'johndoe@exempla.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const autheticateUser = new AutheticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        expect(
            autheticateUser.execute({
                email: 'johndoe@exempla.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should note be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const autheticateUser = new AutheticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@exempla.com',
            password: '123456',
        });

        expect(
            autheticateUser.execute({
                email: 'johndoe@exempla.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
