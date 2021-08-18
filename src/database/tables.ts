import { Table, TableRecord } from "postgres-schema-builder"
import { TablesV1 } from "./versions/TablesV1"

export const Tables = TablesV1

export interface IEmailAddressDBResult extends TableRecord<typeof Tables.email_addresses> {}
export interface IEmailDBResult extends TableRecord<typeof Tables.emails> {}

export const EmailAddressesTable = Table(Tables, "email_addresses")
export const EmailsTable = Table(Tables, "emails")
