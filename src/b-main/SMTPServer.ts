import { IStuff } from "."
import { SMTPServer as _SMTPServer } from "smtp-server"
import { simpleParser } from "mailparser"
import { getEmailAddress } from "../database/queries/getEmailAddress"
import { createEmail } from "../database/queries/createEmail"

export const SMTPServer = (stuff: IStuff) => {
	const { config, clients, database } = stuff

	const server = new _SMTPServer({
		onData(stream, session, callback) {
			simpleParser(stream, {}, async (err, email) => {
				if (err) {
					console.error("Error while paring mail", err)
					return
				}

				if (!email.to) {
					console.warn("parsed.to is undefined")
					return
				}

				if (Array.isArray(email.to)) {
					console.warn("parsed.to is array")
					return
				}
				const emailAddress = email.to.text.split("@")[0]

				const emailAddressExists = await getEmailAddress(database, { emailAddress })
				if (!emailAddressExists) {
					return
				}

				await createEmail(database, { emailAddress, email })

				const client = clients.get(emailAddress)
				if (client) {
					client.write(`data: ${JSON.stringify(email)}\n\n`)
				}
			})

			stream.on("end", callback)
		},
		onConnect(session, callback) {
			console.log("onConnect")
			callback(null)
		},
		onAuth(auth, session, callback) {
			console.log("onAuth")
			callback(null, { user: "123" })
		},
		authOptional: true,
	})

	const start = () => {
		return new Promise<void>((resolve) => {
			server.listen(config.smtp.port, () => {
				console.log(`SMTP is running on port ${config.smtp.port}`)
				resolve()
			})
		})
	}

	const close = async () => {
		return new Promise<void>((resolve, reject) => {
			server.close(() => {
				resolve()
			})
		})
	}

	return {
		start,
		close,
	}
}
