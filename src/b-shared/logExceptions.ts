export const logExceptions = () => {
	process.on("unhandledRejection", (error) => {
		console.error(error)
	})

	process.once("uncaughtException", (err) => {
		console.error(err)
	})
}
