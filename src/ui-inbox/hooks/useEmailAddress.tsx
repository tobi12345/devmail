import { useState, useEffect, useCallback } from "react"
import * as uuid from "uuid"
import { useConfig } from "../Config"

export const generateEMail = () => uuid.v4().replace(/-/g, "").substr(0, 12)

const getEmailAddress = async (isExtension: boolean) => {
	if (isExtension) {
		return new Promise<string | undefined>((resolve) => {
			chrome.storage.local.get("emailaddress", (res) => resolve(res.emailaddress))
		})
	}
	return localStorage.getItem("emailaddress")
}

const storeEmailAddress = (emailaddress: string, isExtension: boolean) => {
	if (isExtension) {
		chrome.storage.local.set({ emailaddress })
		return
	}
	return localStorage.setItem("emailaddress", emailaddress)
}

export const useEmailAddress = () => {
	const [emailAddress, _setEmailAddress] = useState<string | undefined>()
	const config = useConfig()

	useEffect(() => {
		getEmailAddress(config.isExtension).then((address) => {
			if (address) _setEmailAddress(address)
			else setEmailAddress()
		})
	}, [config.isExtension])

	const setEmailAddress = useCallback(() => {
		const address = generateEMail()
		storeEmailAddress(address, config.isExtension)
		_setEmailAddress(address)
	}, [config.isExtension])

	return {
		emailAddress,
		setEmailAddress,
	}
}
