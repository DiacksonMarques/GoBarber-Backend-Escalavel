/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Router } from 'express';


import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsCrontroller = new AppointmentsController;

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointments = await appointmentsRepository.find();
//
//    return response.json(appointments);
//  })

appointmentsRouter.post('/', appointmentsCrontroller.create);

export default appointmentsRouter;
