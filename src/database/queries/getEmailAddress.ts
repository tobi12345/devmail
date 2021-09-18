import { IDatabaseClient } from "postgres-schema-builder"
import { EmailAddressesTable } from "../tables"

const getEmailAddressQuery = EmailAddressesTable.select("*", ["email_address"])

interface CreateEmailAddressArgs {
	emailAddress: string
}

export const getEmailAddress = async (database: IDatabaseClient, { emailAddress }: CreateEmailAddressArgs) => {
	return (await database.query(getEmailAddressQuery([emailAddress])))[0]
}
