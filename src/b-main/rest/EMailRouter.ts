import { Router } from "express"
import { isCheckError, Keys, TypeString } from "../../types-shared/typechecker"
import { IStuff } from ".."

export const EMailRouter = (stuff: IStuff) => {
	const router = Router()

	const checkGetMailRequest = Keys({
		params: Keys({
			email: TypeString,
		}),
	})

	router.get("/:email", async (req, res) => {
		const checkerResult = checkGetMailRequest(req)

		if (isCheckError(checkerResult)) {
			return void res.status(403).json({ errors: checkerResult[0] })
		}

		const { email } = checkerResult[1].params

		const headers = {
			"Content-Type": "text/event-stream",
			Connection: "keep-alive",
			"Cache-Control": "no-cache",
		}
		res.writeHead(200, headers)
		res.flushHeaders()
		stuff.clients.set(email, res)
		req.on("close", () => {
			console.log(`${email} Connection closed`)
			stuff.clients.delete(email)
		})
	})

	return router
}
