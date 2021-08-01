import React, { useContext } from "react"
import axios, { AxiosInstance } from "axios"

export type IServices = ReturnType<typeof Services>

export const Services = (api: AxiosInstance) => {
	return {}
}

export const ServicesContext = React.createContext<IServices>(Services(axios.create()))

export const useServices = () => useContext(ServicesContext)
