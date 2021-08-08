import { Collapse, Empty } from "antd"
import React from "react"
import styled from "styled-components"
import { useEMailInbox } from "../hooks/data/useEMailInbox"

const formatDate = new Intl.DateTimeFormat("default", {
	year: "numeric",
	month: "numeric",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	second: "numeric",
	hour12: false,
})

const InboxContainer = styled.div`
	height: 100%;
	width: 100%;
`

const StyledCollapse = styled(Collapse)`
	overflow-y: scroll;
	height: 100%;
`

export const Inbox = ({ email }: { email: string }) => {
	const emails = useEMailInbox(email)

	if (emails.length === 0) {
		return (
			<InboxContainer>
				<Empty description="no emails so fare :)" />
			</InboxContainer>
		)
	}

	return (
		<InboxContainer>
			<StyledCollapse>
				{emails.map((email, idx) => (
					<Collapse.Panel
						header={`${email.subject ?? "No Subject"} - ${formatDate.format(new Date(email.date ?? 0))}`}
						key={idx}
					>
						<p>{email.text}</p>
					</Collapse.Panel>
				))}
			</StyledCollapse>
		</InboxContainer>
	)
}
