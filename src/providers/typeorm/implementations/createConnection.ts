import { createConnection as _createConnection } from 'typeorm';

import { ConsoleLog } from '@libs/index';
import { api } from '@config/index';

export default async function createConnection(): Promise<void> {
  const apiConfig = api();
  try {
    ConsoleLog.print(
      `Creating DB connection...`,
      'info',
      'DB',
      apiConfig.SILENT,
    );

    await _createConnection().then(connection => {
      ConsoleLog.print(
        `The DB connection: "${
          connection.name
        }" is in the "${connection.isConnected.valueOf().toString()}" state.`,
        'info',
        'DB',
        apiConfig.SILENT,
      );
    });
  } catch (err) {
    ConsoleLog.print(
      `DB connection failed: ${err.message}.`,
      'error',
      'DB',
      apiConfig.SILENT,
    );

    throw err;
  }
}
