import { IDatabaseClient } from "postgres-schema-builder"
import { StatisticsTable } from "../tables"

const createEMailQuery = StatisticsTable.insert(["topic", "value", "date_added"])

interface InsertStatisticsArgs {
	topic: "email_address" | "email"
	value: number
}

export const insertStatistics = async (database: IDatabaseClient, { topic, value }: InsertStatisticsArgs) => {
	return await database.query(createEMailQuery([topic, value, new Date()]))
}
