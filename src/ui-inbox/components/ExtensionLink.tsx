import { ArrowRightOutlined } from "@ant-design/icons"
import { Button, Typography } from "antd"
import React from "react"
import styled from "styled-components"

const ExtensionLinkContainer = styled.div`
	background-color: #f7f7f7;
	border-radius: 15px;
	padding: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Text = styled.div`
	color: rgba(0, 0, 0, 0.85);
	font-weight: 600;
	font-size: 20px;
`

export const ExtensionLink = () => {
	return (
		<ExtensionLinkContainer>
			<Text>This tool is even better as a chrome extension</Text>
			<Button
				target="_blank"
				type="link"
				href="https://chrome.google.com/webstore/detail/devmail/lfofaikcabfackkkligoncbekiamlidd/related?hl=en-GB&authuser=0"
			>
				chrome web store <ArrowRightOutlined />
			</Button>
		</ExtensionLinkContainer>
	)
}
