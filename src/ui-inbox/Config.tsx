import React, { useContext } from "react"
import { configFromEnv } from "../ui-shared/configFromEnv"

export interface IConfig {
	backendUrl: string
	socketBackendUrl: string
	emailAddressUrl: string
	isExtension: boolean
}

enum EnvVars {
	REACT_APP_BACKEND_BASE_URL = "REACT_APP_BACKEND_BASE_URL",
	REACT_APP_USE_SSL = "REACT_APP_USE_SSL",
	REACT_APP_EMAIL_ADDRESS_URL = "REACT_APP_EMAIL_ADDRESS_URL",
}

export const config = configFromEnv<IConfig>({
	make: (getValue) => {
		const backendUrl = getValue(EnvVars.REACT_APP_BACKEND_BASE_URL)
		const emailAddressUrl = getValue(EnvVars.REACT_APP_EMAIL_ADDRESS_URL)
		const useSSL = getValue(EnvVars.REACT_APP_USE_SSL) === "true"

		return {
			backendUrl: `http${useSSL ? "s" : ""}://${backendUrl}`,
			socketBackendUrl: `ws${useSSL ? "s" : ""}://${backendUrl}`,
			emailAddressUrl,
			isExtension: chrome.storage !== undefined,
		}
	},
})

export const ConfigContext = React.createContext<IConfig>(config)

export const useConfig = () => useContext(ConfigContext)
