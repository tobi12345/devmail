import express from "express"
import * as http from "http"
import morgan from "morgan"
import * as bodyParser from "body-parser"
import cors from "cors"
import { IStuff } from "../index"
import { PublicRouter } from "./PublicRouter"
import { EMailRouter } from "./EMailRouter"

export const Server = (stuff: IStuff) => {
	const { config } = stuff
	const app = express()
	app.use(cors())
	app.use(morgan("dev"))
	app.use(bodyParser.json())
	app.disable("x-powered-by")

	app.use("/public", PublicRouter(stuff))
	app.use("/emails", EMailRouter(stuff))

	const server = http.createServer(app)

	const start = () => {
		return new Promise<void>((resolve) => {
			server.listen(config.rest.port, () => {
				console.log(`server is running on port ${config.rest.port}`)
				resolve()
			})
		})
	}

	const close = async () => {
		return new Promise<void>((resolve, reject) => {
			server.close((error) => {
				if (error) {
					return reject(error)
				}
				resolve()
			})
		})
	}

	return {
		start,
		close,
		app,
	}
}
