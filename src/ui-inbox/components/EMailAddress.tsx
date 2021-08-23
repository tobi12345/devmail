import React, { useCallback } from "react"
import styled from "styled-components"
import { CopyOutlined, RedoOutlined } from "@ant-design/icons"
import copy from "copy-to-clipboard"
import { notification, Tooltip } from "antd"
import { useConfig } from "../Config"

const EMailAddressContainer = styled.div`
	width: 70%;
	margin: auto;
	display: grid;
	grid-template-columns: 1fr auto;
	grid-column-gap: 10px;
	align-items: center;
	font-size: 17px;
	color: #000;
	font-family: monospace;
`

const EMailAddressBox = styled.div`
	border-radius: 10px;
	text-align: center;
	padding: 5px 30px;
	position: relative;
	border: 2px solid #54a0ff;
`

const StyledCopyOutlined = styled(CopyOutlined)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 10px;
`

export const EMailAddress = ({ email, onNewAddress }: { email: string; onNewAddress: () => void }) => {
	const { emailAddressUrl } = useConfig()

	const onCopy = useCallback(() => {
		notification.success({
			message: "Copied to clipboard",
		})
		copy(`${email}@${emailAddressUrl}`)
	}, [email])

	return (
		<EMailAddressContainer>
			<EMailAddressBox>
				{email}@{emailAddressUrl}
				<StyledCopyOutlined onClick={onCopy} />
			</EMailAddressBox>
			<Tooltip title="New address. Your current address and all mails will be lost">
				<RedoOutlined onClick={onNewAddress} />
			</Tooltip>
		</EMailAddressContainer>
	)
}
