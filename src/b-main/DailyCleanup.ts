import { CronJob } from "cron"
import { IDatabaseClient } from "postgres-schema-builder"
import { deleteAllEmailAddresses } from "../database/queries/deleteAllEmailAddresses"
import { deleteAllEmails } from "../database/queries/deleteAllEmails"

export const DailyCleanup = (database: IDatabaseClient) => {
	const cleanup = async () => {
		await deleteAllEmails(database)
		await deleteAllEmailAddresses(database)
	}

	const job = new CronJob("0 0 3 * * *", cleanup)
	return job
}
