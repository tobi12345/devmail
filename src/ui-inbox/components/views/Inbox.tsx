import { Spin } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { EMailAddress } from "../EMailAddress"
import { EMailList } from "../EMailList"

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

const useEmailAddress = () => {
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

const EMailContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 20px;
`

export const Inbox = () => {
	const { emailAddress, setEmailAddress } = useEmailAddress()

	if (!emailAddress) {
		return <Spin />
	}

	return (
		<EMailContainer>
			<EMailAddress email={emailAddress} onNewAddress={setEmailAddress} />
			<div style={{ height: 20 }} />
			<EMailList email={emailAddress} />
		</EMailContainer>
	)
}
