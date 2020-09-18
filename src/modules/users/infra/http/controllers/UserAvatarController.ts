import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpadateUserAvatarService';

export default class UsersAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );

        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        return response.json(user);
    }
}
