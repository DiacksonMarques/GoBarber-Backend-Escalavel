import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpadateUserAvatarService from './UpadateUserAvatarService';

describe('UpadateUserAvatar', () => {
    it('should be able to update a new user avatar', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const upadateUserAvatar = new UpadateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@exempla.com',
            password: '123456',
        });

        await upadateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to uptade avatar from non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const upadateUserAvatar = new UpadateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        expect(
            upadateUserAvatar.execute({
                user_id: 'non-existing-user',
                avatarFilename: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const upadateUserAvatar = new UpadateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@exempla.com',
            password: '123456',
        });

        await upadateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        await upadateUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
