import { IStuff } from "."
import { SMTPServer as _SMTPServer } from "smtp-server"
import { simpleParser } from "mailparser"

export const SMTPServer = (stuff: IStuff) => {
	const { config, clients } = stuff

	const server = new _SMTPServer({
		onData(stream, session, callback) {
			simpleParser(stream, {}, (err, parsed) => {
				if (err) {
					console.error("Error while paring mail", err)
					return
				}

				if (!parsed.to) {
					console.warn("parsed.to is undefined")
					return
				}

				if (Array.isArray(parsed.to)) {
					console.warn("parsed.to is array")
					return
				}

				const id = parsed.to.text.split("@")[0]
				const client = clients.get(id)
				if (client) {
					client.write(`data: ${JSON.stringify(parsed)}\n\n`)
				}
			})

			stream.on("end", callback)
		},
		onConnect(session, callback) {
			callback(null)
		},
		onAuth(auth, session, callback) {
			callback(null, { user: "123" })
		},
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
