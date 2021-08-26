import { IDatabaseClient, SQL } from "postgres-schema-builder"

const deleteAllEmailAddressesQuery = SQL.raw(`
	TRUNCATE TABLE email_addresses; 
`)

export const deleteAllEmailAddresses = async (database: IDatabaseClient) => {
	return await database.query(deleteAllEmailAddressesQuery)
}
