import { CronJob } from "cron"
import { IDatabaseClient } from "postgres-schema-builder"
import { deleteAllEmailAddresses } from "../database/queries/deleteAllEmailAddresses"
import { deleteAllEmails } from "../database/queries/deleteAllEmails"
import { getEmailAddressesCount } from "../database/queries/getEmailAddressesCount"
import { getEmailsCount } from "../database/queries/getEmailsCount"
import { insertStatistics } from "../database/queries/insertStatistic"

export const DailyCleanup = (database: IDatabaseClient) => {
	const job = new CronJob("0 0 3 * * *", cleanup(database))
	return job
}

export const cleanup = (database: IDatabaseClient) => async () => {
	const emailsCount = await getEmailsCount(database)
	await insertStatistics(database, { value: emailsCount, topic: "email" })
	await deleteAllEmails(database)

	const emailAddressesCount = await getEmailAddressesCount(database)
	await insertStatistics(database, { value: emailAddressesCount, topic: "email_address" })
	await deleteAllEmailAddresses(database)
}
