import { Spin } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { useEmailAddress } from "../../hooks/useEmailAddress"
import { EMailAddress } from "../EMailAddress"
import { EMailList } from "../EMailList"

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
