import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export default class DatabaseNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
  ): string {
    const tableName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;

    const fkName = columnNames.reduce(
      (name, column) => `_${name}_${column}`,
      `${tableName}_${referencedTablePath}`,
    );

    return `fk${fkName}`;
  }

  indexName(tableOrName: Table | string, columns: string[]): string {
    const indexName = columns.reduce(column => `_${column}`, `${columns}`);

    return `idx${indexName}`;
  }
}
