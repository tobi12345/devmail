export const logExceptions = (sendLog?: (text: string) => void) => {
	process.on("unhandledRejection", (error: Error) => {
		console.error(error)
		if (sendLog) {
			sendLog(error.toString())
		}
	})

	process.on("uncaughtException", (error: Error) => {
		console.error(error)
		if (sendLog) {
			sendLog(error.toString())
		}
	})
}
