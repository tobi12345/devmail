import { useState, useEffect, useCallback } from "react"
import * as uuid from "uuid"

export const generateEMail = () => uuid.v4().replace(/-/g, "").substr(0, 12)

const getEmailAddress = async () => {
	if (chrome.storage) {
		return new Promise<string | undefined>((resolve) => {
			chrome.storage.local.get("emailaddress", (res) => resolve(res.emailaddress))
		})
	}
	return localStorage.getItem("emailaddress")
}

const storeEmailAddress = (emailaddress: string) => {
	if (chrome.storage) {
		chrome.storage.local.set({ emailaddress })
		return
	}
	return localStorage.setItem("emailaddress", emailaddress)
}

export const useEmailAddress = () => {
	const [emailAddress, _setEmailAddress] = useState<string | undefined>()

	useEffect(() => {
		getEmailAddress().then((address) => {
			if (address) _setEmailAddress(address)
			else setEmailAddress()
		})
	}, [])

	const setEmailAddress = useCallback(() => {
		const address = generateEMail()
		storeEmailAddress(address)
		_setEmailAddress(address)
	}, [])

	return {
		emailAddress,
		setEmailAddress,
	}
}
