import { IDatabaseClient } from "postgres-schema-builder"
import { EmailsTable } from "../tables"

const deleteAllEMailsQuery = EmailsTable.delete([] as [])

export const deleteAllEmails = async (database: IDatabaseClient) => {
	return await database.query(deleteAllEMailsQuery([] as []))
}
