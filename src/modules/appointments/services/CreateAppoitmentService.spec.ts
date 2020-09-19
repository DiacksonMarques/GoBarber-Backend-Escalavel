import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointementService from './CreateAppoitmentService';

describe('CreateAppointement', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointement = new CreateAppointementService(
            fakeAppointmentsRepository,
        );

        const appointemente = await createAppointement.execute({
            date: new Date(),
            provider_id: '123456789',
        });

        expect(appointemente).toHaveProperty('id');
        expect(appointemente.provider_id).toBe('123456789');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointement = new CreateAppointementService(
            fakeAppointmentsRepository,
        );

        const appointementDate = new Date(2020, 4, 10, 11);

        await createAppointement.execute({
            date: appointementDate,
            provider_id: '123456789',
        });

        expect(
            createAppointement.execute({
                date: appointementDate,
                provider_id: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
