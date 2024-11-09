import { DataSource, DataSourceOptions } from 'typeorm';
import { Users } from '../modules/users/entities/users.entity';
import { Companies } from '../modules/companies/entities/companies.entity';

export const datasource: DataSourceOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'backend_crud',
  entities: [Users, Companies],
  synchronize: true,
  migrations: ['dist/migrations/*.{ts,js}'],
};

const dataSource = new DataSource(datasource);

export default dataSource;
