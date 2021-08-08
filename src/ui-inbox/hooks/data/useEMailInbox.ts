import { ParsedMail } from "mailparser"
import { useEffect, useState } from "react"
import { useAxiosInstance } from "../../App"

export const useEMailInbox = (email: string) => {
	const axios = useAxiosInstance()

	const [mails, setMails] = useState<ParsedMail[]>([])

	useEffect(() => {
		const events = new EventSource(`${axios.defaults.baseURL}/emails/${email}`)
		events.onmessage = (event) => {
			setMails((mails) => [...mails, JSON.parse(event.data)])
		}
		return () => {
			events.close()
		}
	}, [])

	return mails
}
