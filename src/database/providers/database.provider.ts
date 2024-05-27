import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import mongoose from 'mongoose';

const logger = new Logger('DATABASE PROVIDER');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: String(process.env.DATABASE_PSWD),
  database: process.env.DATABASE_NAME,
  entities: [],
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
});

export const databaseProviders = [
  {
    provide: 'POSTGRES_CONNECTION',
    useFactory: async () => {
      try {
        const connection = await AppDataSource.initialize();
        logger.debug('Postgres connection successfully');
        return connection;
      } catch (error) {
        logger.error('Postgres connection error', error);
      }
    },
  },
  {
    provide: 'MONGODB_CONNECTION',
    useFactory: () =>
      mongoose
        .connect(
          `mongodb://${process.env.DATABASE_USER}:${
            process.env.DATABASE_PSWD
          }@${process.env.MONGO_DATABASE_HOST}:${
            process.env.MONGO_PORT || 27017
          }/${process.env.DATABASE_NAME}`,
        )
        .then((connection) => {
          logger.debug('MongoDb connection successfully');
          return connection;
        })
        .catch((error) => {
          logger.error('MongoDb connection error', error);
        }),
  },
];
