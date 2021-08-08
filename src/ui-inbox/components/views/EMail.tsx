import React from "react"
import styled from "styled-components"
import { Inbox } from "../Inbox"

const EMailContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 20px;
`

export const EMail = () => {
	return (
		<EMailContainer>
			<Inbox email="t.klesel" />
		</EMailContainer>
	)
}
