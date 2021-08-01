import { IDatabaseClient } from "postgres-schema-builder"
import { IUserDBResult, UserTable } from "../../database/tables"
import { User } from "../../types-shared/user"
import { v4 as uuid } from "uuid"

export class UserNotFoundError extends Error {
	constructor(filterColumn: string, value: string) {
		super(`User with ${filterColumn} ${value} not found`)
	}
}

const mapUser = (dbResult: IUserDBResult): User => ({
	id: dbResult.user_id,
})

export type IUserService = ReturnType<typeof UserService>

interface IUserServiceArgs {
	database: IDatabaseClient
}

export const UserService = ({ database }: IUserServiceArgs) => {
	const createDevUser = async (email: string, password: string, id: string) => {
		await database.query(
			UserTable.insert(["user_id", "email", "password", "date_added"])([
				id,
				email,
				password,
				new Date(),
			]),
		)

		return getUserByID(id)
	}

	const createUser = async (email: string, password: string) => {
		const id = uuid()

		await database.query(
			UserTable.insert(["user_id", "email", "password", "date_added"])([
				id,
				email,
				password,
				new Date(),
			]),
		)

		return getUserByID(id)
	}

	const getUserByID = async (userID: string) => {
		const dbResults = await database.query(UserTable.select("*", ["user_id"])([userID]))

		if (dbResults.length !== 1 || dbResults[0].date_removed !== null) {
			throw new UserNotFoundError("user_id", userID)
		}

		return mapUser(dbResults[0])
	}

	const getUserByEmailPassword = async (email: string, password: string) => {
		const dbResults = await database.query(UserTable.select("*", ["email", "password"])([email, password]))

		if (dbResults.length !== 1 || dbResults[0].date_removed !== null) {
			throw new UserNotFoundError("email", email)
		}

		return mapUser(dbResults[0])
	}

	const getAllUser = async () => {
		const dbResults = await database.query(UserTable.selectAll("*"))
		return dbResults.filter((dbResult) => dbResult.date_removed === null).map(mapUser)
	}

	const deleteUser = async (userID: string) => {
		await database.query(UserTable.update(["date_removed"], ["user_id"])([new Date()], [userID]))
	}

	return {
		createDevUser,
		createUser,
		getUserByID,
		getUserByEmailPassword,
		getAllUser,
		deleteUser,
	}
}
