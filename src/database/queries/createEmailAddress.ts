import { IDatabaseClient } from "postgres-schema-builder"
import { EmailAddressesTable } from "../tables"

const createEmailAddressQuery = EmailAddressesTable.insert(["email_address"])

interface CreateEmailAddressArgs {
	emailAddress: string
}

export const createEmailAddress = async (database: IDatabaseClient, { emailAddress }: CreateEmailAddressArgs) => {
	return await database.query(createEmailAddressQuery([emailAddress]))
}
