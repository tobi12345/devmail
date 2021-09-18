import { ColumnType, IDatabaseClient, SQL } from "postgres-schema-builder"

const getEmailAddressesCountQuery = SQL.raw<{
	count: {
		type: ColumnType.Integer
		nullable: false
	}
}>(`
	SELECT count(*) as count FROM email_addresses; 
`)

export const getEmailAddressesCount = async (database: IDatabaseClient) => {
	return (await database.query(getEmailAddressesCountQuery))[0].count
}
