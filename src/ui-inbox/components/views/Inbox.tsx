import { Spin } from "antd"
import React from "react"
import styled from "styled-components"
import { useConfig } from "../../Config"
import { useEmailAddress } from "../../hooks/useEmailAddress"
import { EMailAddress } from "../EMailAddress"
import { EMailList } from "../EMailList"
import { ExtensionLink } from "../ExtensionLink"

const EMailContainer = styled.div`
	height: 100%;
	width: 100%;
	padding: 20px;
	display: grid;
	grid-template-rows: auto 1fr auto;
`

const UsageHint = styled.div`
	color: gray;
	text-align: center;
	font-size: 11px;
`

export const Inbox = () => {
	const { emailAddress, setEmailAddress } = useEmailAddress()
	const config = useConfig()

	if (!emailAddress) {
		return <Spin />
	}

	return (
		<EMailContainer>
			<div>
				{!config.isExtension && (
					<>
						<ExtensionLink />
						<div style={{ height: 15 }} />
					</>
				)}
				<EMailAddress email={emailAddress} onNewAddress={setEmailAddress} />
				<div style={{ height: 15 }} />
			</div>
			<EMailList email={emailAddress} />
			<div>
				<UsageHint>
					A simple tool that allows to generate mail addresses and revive emails with just one click.
				</UsageHint>
				<UsageHint>Intended for developer testing their web apps</UsageHint>
			</div>
		</EMailContainer>
	)
}
