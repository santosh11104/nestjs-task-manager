import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Task } from './src/tasks/task.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.ENV_PATH || '.env.local' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*.ts'],




});
