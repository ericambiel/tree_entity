import database from '@config/database';
// import DatabaseNamingStrategy from "@libs/DatabaseNamingStrategy";
import {NameStrategyDataBase} from "@libs/NameStrategyDataBase";

const databaseConfig = database();

module.exports = {
  type: databaseConfig.DIALECT,
  host: databaseConfig.HOST,
  port: databaseConfig.PORT,
  username: databaseConfig.USER,
  password: databaseConfig.PASSWORD,
  database: databaseConfig.BASE,
  synchronize: false,
  entities: [
    './src/entities/**/*.{ts,js}',
  ],
  migrations: [`./src/migrations/**/*.{ts,js}`],
  cli: {
    entitiesDir: [
      './src/entities/**/*.{ts,js}',
    ],
    migrationsDir: `./src/migrations`,
  },
  //namingStrategy: new DatabaseNamingStrategy(),
  namingStrategy: new NameStrategyDataBase(),
  autoLoadEntities: true,
};
