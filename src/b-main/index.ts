import { IDatabaseClient } from "postgres-schema-builder"
import { configFromEnv, IConfig } from "./config"
import { connectAndSetupDatabase } from "../database/database"
import { Server } from "./rest/Server"
import { loadEnvFromDotenv } from "../b-shared/utils/loadEnvFromDotenv"
import { onShutdown } from "../b-shared/onShutdown"
import * as Express from "express"
import { SMTPServer } from "./SMTPServer"

require("source-map-support").install()

const nodeEnv = process.env.NODE_ENV
console.info(`[ENV] is ${nodeEnv}`)

export interface IStuff {
	database: IDatabaseClient
	config: IConfig
	clients: Map<string, Express.Response>
}

loadEnvFromDotenv(nodeEnv || "development")
;(async () => {
	const config = configFromEnv()

	const { database, schema } = await connectAndSetupDatabase(config.database)
	console.info(`[DATABASE] connected and initialized (v${schema.getVersion()})`)

	const stuff: IStuff = {
		config,
		database,
		clients: new Map(),
	}

	const restServer = Server(stuff)
	await restServer.start()

	const smtpServer = SMTPServer(stuff)
	await smtpServer.start()

	await onShutdown()
	await restServer.close()
	await smtpServer.close()
	await database.close()
})()
