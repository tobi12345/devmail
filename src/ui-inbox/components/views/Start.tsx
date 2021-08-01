import React from "react"
import { useHistory } from "react-router"
import styled from "styled-components"

const StartContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export const Start = () => {
	const history = useHistory()

	return <StartContainer>Hello Dev Mail</StartContainer>
}
