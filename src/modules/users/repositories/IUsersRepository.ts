import User from '../infra/typeorm/entities/User';
import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmail(id: string): Promise<User | undefined>;
    create(data: ICreateUsersDTO): Promise<User>;
    save(user: User): Promise<User>;
}
