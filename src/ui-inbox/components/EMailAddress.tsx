import React, { useCallback } from "react"
import styled from "styled-components"
import { CopyOutlined, RedoOutlined } from "@ant-design/icons"
import copy from "copy-to-clipboard"
import { notification } from "antd"

const EMailAddressContainer = styled.div`
	width: 70%;
	margin: auto;
	display: grid;
	grid-template-columns: 1fr auto;
	grid-column-gap: 10px;
	align-items: center;
	font-size: 17px;
	color: #222f3e;
	font-family: monospace;
`

const EMailAddressBox = styled.div`
	border-radius: 10px;
	text-align: center;
	padding: 5px 30px;
	background-color: #bdc3c7;
	position: relative;
`

const StyledCopyOutlined = styled(CopyOutlined)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 10px;
`

export const EMailAddress = ({ email, onNewAddress }: { email: string; onNewAddress: () => void }) => {
	const onCopy = useCallback(() => {
		notification.success({
			message: "Copied to clipboard",
		})
		copy(email + "@devmail.io")
	}, [email])

	return (
		<EMailAddressContainer>
			<EMailAddressBox>
				{email}@devmail.io
				<StyledCopyOutlined onClick={onCopy} />
			</EMailAddressBox>
			<RedoOutlined onClick={onNewAddress} />
		</EMailAddressContainer>
	)
}
