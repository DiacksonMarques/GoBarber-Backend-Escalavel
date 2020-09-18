import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppoitmentService from '@modules/appointments/services/CreateAppoitmentService';

export default class AppointmetsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppoitment = container.resolve(CreateAppoitmentService);

        const appointment = await createAppoitment.execute({
            date: parsedDate,
            provider_id,
        });

        return response.json(appointment);
    }
}
