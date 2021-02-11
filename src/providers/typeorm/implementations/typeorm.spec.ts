import { getConnection } from "typeorm";
import createConnection from '@providers/typeorm/implementations/createConnection'

it('should create a connection to the database', async () => {
  await createConnection();
  const connection = getConnection();
  expect(connection).toHaveProperty('isConnected');
});
