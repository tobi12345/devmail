import { isCheckError, Keys, TypeString } from "../../types-shared/typechecker"
import { IStuff } from ".."
import { BaseRouter, CheckRequestConvert, ErrorHandlerChecked } from "../../b-shared/TypedExpress"
import { getEmailByAddress } from "../../database/queries/getEmailsByAddress"
import { getEmailAddress } from "../../database/queries/getEmailAddress"
import { createEmailAddress } from "../../database/queries/createEmailAddress"

const checkGetMailRequest = Keys({
	params: Keys({
		emailAddress: TypeString,
	}),
})

export const EMailRouter = (stuff: IStuff) => {
	const router = BaseRouter()
	const { database } = stuff

	router.get(
		"/:emailAddress",
		CheckRequestConvert(
			checkGetMailRequest,
			ErrorHandlerChecked(async (req, { params: { emailAddress } }, res) => {
				const emailAddressExists = await getEmailAddress(database, { emailAddress })

				if (!emailAddressExists) {
					await createEmailAddress(database, { emailAddress })
				}

				const headers = {
					"Content-Type": "text/event-stream",
					Connection: "keep-alive",
					"Cache-Control": "no-cache",
				}
				res.writeHead(200, headers)
				res.flushHeaders()
				stuff.clients.set(emailAddress, res)

				const emails = await getEmailByAddress(database, { emailAddress })
				for (let { email } of emails) {
					res.write(`data: ${JSON.stringify(email)}\n\n`)
				}

				req.on("close", () => {
					console.log(`${emailAddress} Connection closed`)
					stuff.clients.delete(emailAddress)
				})
			}),
		),
	)

	return router as any
}
