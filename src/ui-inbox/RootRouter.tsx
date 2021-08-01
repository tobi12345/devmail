import React from "react"
import { Redirect, Route, Switch } from "react-router"
import { Start } from "./components/views/Start"

export const RootRouter = () => {
	return (
		<Switch>
			<Route path={"/"} exact render={() => <Start />} />
			<Route render={() => <Redirect to={`/`} />} />
		</Switch>
	)
}
