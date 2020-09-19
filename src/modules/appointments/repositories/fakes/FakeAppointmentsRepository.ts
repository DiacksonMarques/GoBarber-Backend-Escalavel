import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmetDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointements: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointements.find(appointement =>
            isEqual(appointement.date, date),
        );

        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointements.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
