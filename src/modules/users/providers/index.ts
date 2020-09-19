import { container } from 'tsyringe';

import IHahsProvider from './HashProvider/models/IHahsProvider';
import BCryptHahsProvider from './HashProvider/implementations/BCryptHahsProvider';

container.registerSingleton<IHahsProvider>('HahsProvider', BCryptHahsProvider);
