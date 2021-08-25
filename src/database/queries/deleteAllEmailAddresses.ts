import { IDatabaseClient } from "postgres-schema-builder"
import { EmailAddressesTable } from "../tables"

const deleteAllEmailAddressesQuery = EmailAddressesTable.delete([] as [])

export const deleteAllEmailAddresses = async (database: IDatabaseClient) => {
	return await database.query(deleteAllEmailAddressesQuery([] as []))
}
