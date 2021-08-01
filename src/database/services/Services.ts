import { IDatabaseClient } from "postgres-schema-builder"
import { UserService } from "./UserService"

export type IServices = ReturnType<typeof Services>

interface IServicesArgs {
	database: IDatabaseClient
}

export const Services = ({ database }: IServicesArgs) => {
	const users = UserService({ database })

	return {
		users,
	}
}
