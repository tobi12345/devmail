import { IDatabaseBaseClient } from "postgres-schema-builder"
import { configFromEnv, IConfig } from "./config"
import { connectAndSetupDatabase } from "../database/database"
import { Server } from "./rest/Server"
import { IServices, Services } from "../database/services/Services"
import { loadEnvFromDotenv } from "../b-shared/utils/loadEnvFromDotenv"
import { onShutdown } from "../b-shared/onShutdown"
import * as Express from "express"
import { SMTPServer } from "./SMTPServer"

require("source-map-support").install()

const nodeEnv = process.env.NODE_ENV
console.info(`[ENV] is ${nodeEnv}`)

export interface IStuff {
	database: IDatabaseBaseClient
	services: IServices
	config: IConfig
	clients: Map<string, Express.Response>
}

loadEnvFromDotenv(nodeEnv || "development")
;(async () => {
	const config = configFromEnv()

	const { database, schema } = await connectAndSetupDatabase(config.database)
	console.info(`[DATABASE] connected and initialized (v${schema.getVersion()})`)
	const services = Services({ database })

	if (config.database.clear) {
		console.log(`[DATABASE] init default user`)
		await services.users.createDevUser(
			"t.klesel@gmx.de",
			"bb1170880d4e94c833dadb17061b0e0cf32fc1db127efb83058a0b4e2e06ccb15749bd35325a138bb539bcaa381ba680785a25ed7325af48dc8c54e32ff91a89",
			"b441589f-fa29-49bb-ab2f-b4427f88403a",
		)
	}

	const stuff: IStuff = {
		config,
		database,
		services,
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
