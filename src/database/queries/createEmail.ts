import { ParsedMail } from "mailparser"
import { IDatabaseClient } from "postgres-schema-builder"
import { EmailsTable } from "../tables"

const createEMailQuery = EmailsTable.insert(["email_address", "email"])

interface CreateEmailAddressArgs {
	emailAddress: string
	email: ParsedMail
}

export const createEmail = async (database: IDatabaseClient, { emailAddress, email }: CreateEmailAddressArgs) => {
	return await database.query(createEMailQuery([emailAddress, email]))
}
