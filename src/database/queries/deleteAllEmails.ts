import { IDatabaseClient, SQL } from "postgres-schema-builder"

const deleteAllEMailsQuery = SQL.raw(`
	TRUNCATE TABLE emails; 
`)

export const deleteAllEmails = async (database: IDatabaseClient) => {
	return await database.query(deleteAllEMailsQuery)
}
