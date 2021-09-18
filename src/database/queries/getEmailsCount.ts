import { ColumnType, IDatabaseClient, SQL } from "postgres-schema-builder"

const getEmailsCountQuery = SQL.raw<{
	count: {
		type: ColumnType.Integer
		nullable: false
	}
}>(`
	SELECT count(*) as count FROM emails; 
`)

export const getEmailsCount = async (database: IDatabaseClient) => {
	return (await database.query(getEmailsCountQuery))[0].count as number
}
