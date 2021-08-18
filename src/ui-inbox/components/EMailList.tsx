import { Collapse, Empty } from "antd"
import { ParsedMail } from "mailparser"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useEMailInbox } from "../hooks/data/useEMailInbox"
import DOMPurify from "dompurify"

const formatDate = new Intl.DateTimeFormat("default", {
	year: "numeric",
	month: "numeric",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	second: "numeric",
	hour12: false,
})

const EMailListContainer = styled.div`
	height: 100%;
	width: 100%;
	overflow-y: auto;
`

export const EMailList = ({ email }: { email: string }) => {
	const emails = useEMailInbox(email)

	if (emails.length === 0) {
		return (
			<EMailListContainer>
				<Empty description="no emails so fare :)" />
			</EMailListContainer>
		)
	}

	return (
		<EMailListContainer>
			{emails.map((email, idx) => (
				<EMailListItem email={email} key={idx} />
			))}
		</EMailListContainer>
	)
}

const EMailListItemContainer = styled.div`
	display: grid;
	grid-template-columns: auto 1fr auto;
	grid-column-gap: 15px;
	background: #f4f7f7;
	padding: 8px;
	border-bottom: 1px solid #e2e8ea;
	color: #26212a;
	font-size: 15px;
	cursor: pointer;

	&:first-of-type {
		border-top: 1px solid #e2e8ea;
	}
`
const EMailListItemDate = styled.div`
	color: #a08899;
`

const EMailListItem = ({ email }: { email: ParsedMail }) => {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)

	return (
		<>
			<EMailListItemContainer onClick={() => setIsPreviewOpen(!isPreviewOpen)}>
				<div>{email.from?.text}</div>
				<div>{email.subject}</div>
				<EMailListItemDate>{formatDate.format(new Date(email.date ?? 0))}</EMailListItemDate>
			</EMailListItemContainer>
			{isPreviewOpen && <EMailPreview email={email} />}
		</>
	)
}

const EMailPreviewContainer = styled.div`
	width: 80%;
	height: 400px;
	overflow: auto;
	margin: 20px auto;
	border: 1px solid #e2e8ea;
`
const EMailPreview = ({ email }: { email: ParsedMail }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (!containerRef.current) {
			return
		}

		containerRef.current.innerHTML = DOMPurify.sanitize(email.html)
	}, [email.textAsHtml])

	return <EMailPreviewContainer ref={containerRef}>{email.textAsHtml}</EMailPreviewContainer>
}
