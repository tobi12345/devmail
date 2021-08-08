import React, { useContext, useMemo } from "react"
import axios, { AxiosError } from "axios"
import { useConfig } from "./Config"
import { ReactQueryConfigProvider, ReactQueryConfig } from "react-query"
import { RootRouter } from "./RootRouter"
import { BrowserRouter } from "react-router-dom"

const AxiosInstanceContext = React.createContext(axios.create())
export const useAxiosInstance = () => useContext(AxiosInstanceContext)

const reactQueryConfig: ReactQueryConfig = {
	queries: {
		refetchOnWindowFocus: false,
	},
}

export const App = () => {
	const config = useConfig()

	const api = useMemo(() => {
		const client = axios.create({
			baseURL: config.backendUrl,
		})

		client.interceptors.request.use(function (config) {
			return config
		})

		client.interceptors.response.use(
			(response) => response,
			(error: AxiosError) => {
				if (error.response?.status === 401) {
					return
				}

				return Promise.reject(error)
			},
		)

		return client
	}, [config])

	return (
		<AxiosInstanceContext.Provider value={api}>
			<ReactQueryConfigProvider config={reactQueryConfig}>
				<BrowserRouter>
					<RootRouter />
				</BrowserRouter>
			</ReactQueryConfigProvider>
		</AxiosInstanceContext.Provider>
	)
}
