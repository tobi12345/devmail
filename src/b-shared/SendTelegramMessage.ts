import axios from "axios"

export const SendTelegramMessage = (botToken: string, chatID: string, projectName: string) => async (text: string) => {
	const instance = axios.create({
		baseURL: `https://api.telegram.org/bot${botToken}/sendMessage`,
	})

	await instance.post("", {
		chat_id: chatID,
		text: `Project: ${projectName}\n\n${text}`,
	})
}
