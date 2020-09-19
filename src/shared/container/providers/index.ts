import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import ISotageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<ISotageProvider>(
    'ISotageProvider',
    DiskStorageProvider,
);
