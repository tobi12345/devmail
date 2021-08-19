import { useState, useEffect, useCallback } from "react"

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
			if (address) {
				_setEmailAddress(address)
			}
		})
	}, [])

	const setEmailAddress = useCallback((address: string) => {
		storeEmailAddress(address)
		_setEmailAddress(address)
	}, [])

	return {
		emailAddress,
		setEmailAddress,
	}
}
