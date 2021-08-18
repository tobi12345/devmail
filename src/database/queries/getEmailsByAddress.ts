import { IDatabaseClient } from "postgres-schema-builder"
import { EmailsTable } from "../tables"

const getEmailByAddressQuery = EmailsTable.select("*", ["email_address"])

interface GetEmailByAddressArgs {
	emailAddress: string
}

export const getEmailByAddress = async (database: IDatabaseClient, { emailAddress }: GetEmailByAddressArgs) => {
	return await database.query(getEmailByAddressQuery([emailAddress]))
}
