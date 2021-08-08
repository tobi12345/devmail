import React from "react"
import { Redirect, Route, Switch } from "react-router"
import { EMail } from "./components/views/EMail"
import { Start } from "./components/views/Start"

export const RootRouter = () => {
	return (
		<Switch>
			<Route path={"/"} exact render={() => <Start />} />
			<Route path={"/inbox"} exact render={() => <EMail />} />
			<Route render={() => <Redirect to={`/`} />} />
		</Switch>
	)
}
