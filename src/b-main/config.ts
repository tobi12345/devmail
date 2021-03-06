import { IBaseConfig } from "../b-shared/BaseConfig"
import { IDatabaseConfig } from "../database/database"

export interface IConfig extends IBaseConfig {
	database: IDatabaseConfig
	rest: {
		port: number
		key: string
	}
	jwt: {
		secret: string
	}
	smtp: {
		port: number
	}
	passwordSecret: string
	telegram: {
		botToken: string
		chatID: string
		enabled: boolean
	}
}

const requiredEnvVars: string[] = []

export const configFromEnv = (): IConfig => {
	for (const requiredEnvVar of requiredEnvVars) {
		if (process.env[requiredEnvVar] === undefined) {
			throw new Error(`Required environment variable ${requiredEnvVar} is missing`)
		}
	}

	return {
		database: {
			host: process.env["POSTGRES_HOST"] || "",
			port: getInteger(process.env["POSTGRES_PORT"]) || 5432,
			database: process.env["POSTGRES_DATABASE"] || "",
			password: process.env["POSTGRES_PASSWORD"],
			user: process.env["POSTGRES_USER"] || "postgres",
			clear: process.env["POSTGRES_CLEAR"] === "true",
		},
		passwordSecret: process.env["PASSWORD_SECRET"] || "72865779884567890093833338832837151253192",
		rest: {
			port: parseInt(process.env["REST_PORT"] || "4001"),
			key: process.env["REST_KEY"] || "4a76dbd4-688e-4921-90b8-2c2041d4b77c",
		},
		jwt: {
			secret: process.env["JWT_SECRET"] || "",
		},
		smtp: {
			port: parseInt(process.env["SMTP_PORT"] || "4000"),
		},
		telegram: {
			botToken: process.env["TELEGRAM_BOT_TOKEN"] || "",
			chatID: process.env["TELEGRAM_CHAT_ID"] || "",
			enabled: process.env["TELEGRAM_ENABLED"] === "true",
		},
	}
}

const getInteger = (value: any) => (!isNaN(value) ? parseInt(value) : undefined)
