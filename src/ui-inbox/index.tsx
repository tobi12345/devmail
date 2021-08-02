import * as React from "react"
import * as ReactDOM from "react-dom"
import { createGlobalStyle } from "styled-components"
import { App } from "./App"
import "antd/dist/antd.css"

const GlobalStyles = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		width: 300px;
		height: 400px;
	}
	#root {
		width: 300px;
		height: 400px;
	}
`

ReactDOM.render(
	<>
		<GlobalStyles />
		<App />
	</>,
	document.getElementById("root"),
)
