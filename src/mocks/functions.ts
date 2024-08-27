
const tables: Record<string, number> = {}

export function setMaxId (table: string, id: number) {
  tables[table] = id+1;
}

export function isIdCounterExists(table: string): boolean {
  return tables.hasOwnProperty(table);
}

export function generateId(tableName: string) {
  tables[tableName] = tables[tableName] || 1
  console.log(tables);
  return tables[tableName]++
}
