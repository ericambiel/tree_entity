import { createConnection as _createConnection,
  createConnections as _createConnections } from 'typeorm';
import { ConsoleLog } from '@libs/index';
import { api } from '@config/index';
import { ConnectionOptions } from "typeorm/connection/ConnectionOptions";
import { Connection } from "typeorm/connection/Connection";

async function createConnection(name?: string): Promise<Connection>{
  const apiConfig = api();
  try {
    ConsoleLog.print(
      `Creating DB connection...`,
      'info',
      'DB',
      apiConfig.SILENT,
    );

    return await _createConnection(name ?? 'eKaizen').then(connection => {
      success(connection);
      return connection;
    });
  } catch (err) {
    throw error(err);
  }
}

async function createConnections(options?: ConnectionOptions[]): Promise<Connection[]> {
  const apiConfig = api();
  try {
    ConsoleLog.print(
        `Creating DBs connections...`,
        'info',
        'DB',
        apiConfig.SILENT,
    );

    return await _createConnections(options).then(connections => {
      connections.forEach(connection => success(connection))
      return connections;
    });
  } catch (err) {
    throw error(err);
  }
}

function success(connection: Connection){
  const apiConfig = api();
  ConsoleLog.print(
      `The DB connection: "${
          connection.name
      }" is in the "${connection.isConnected.valueOf().toString()}" state.`,
      'info',
      'DB',
      apiConfig.SILENT,
  );
}

function error(err: Error): Error {
  const apiConfig = api();
  ConsoleLog.print(
      `DB connection failed: ${err.message}.`,
      'error',
      'DB',
      apiConfig.SILENT,
  );

  return err;
}

export { createConnection, createConnections };