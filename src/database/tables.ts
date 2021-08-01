import { Table, TableRecord } from "postgres-schema-builder"
import { TablesV1 } from "./versions/TablesV1"

export const Tables = TablesV1

export interface IUserDBResult extends TableRecord<typeof Tables.users> {}
export const UserTable = Table(Tables, "users")
