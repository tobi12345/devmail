import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { EMailAddress } from "../EMailAddress"
import { EMailList } from "../EMailList"

const EMailContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 20px;
`

export const Inbox = () => {
	const [email, setEMail] = useState("t.klesel")

	return (
		<EMailContainer>
			<EMailAddress email={email} onNewAddress={setEMail} />
			<div style={{ height: 20 }} />
			<EMailList email={email} />
		</EMailContainer>
	)
}
