import { ParsedMail } from "mailparser"
import { ColumnType, JSONType, NativeFunction, TableSchema } from "postgres-schema-builder"

export namespace TablesV1 {
	const baseSchema = TableSchema({
		date_added: {
			type: ColumnType.TimestampTZ,
			nullable: false,
			defaultValue: { func: NativeFunction.Now },
		},
		date_removed: { type: ColumnType.TimestampTZ, nullable: true },
	})

	export const email_addresses = TableSchema({
		email_address_id: {
			type: ColumnType.Integer,
			primaryKey: true,
			createIndex: true,
			nullable: false,
			autoIncrement: true,
		},
		email_address: {
			type: ColumnType.Text,
			createIndex: true,
			nullable: false,
		},
		...baseSchema,
	})

	export const emails = TableSchema({
		email_id: {
			type: ColumnType.Integer,
			primaryKey: true,
			createIndex: true,
			nullable: false,
			autoIncrement: true,
		},
		email_address: {
			type: ColumnType.Text,
			createIndex: true,
			nullable: false,
		},
		email: { type: JSONType<ParsedMail>(), nullable: false },
		...baseSchema,
	})

	export const statistics = TableSchema({
		statistic_id: {
			type: ColumnType.Integer,
			primaryKey: true,
			createIndex: true,
			nullable: false,
			autoIncrement: true,
		},
		topic: {
			type: ColumnType.Text,
			createIndex: true,
			nullable: false,
		},
		value: {
			type: ColumnType.Integer,
			nullable: false,
			createIndex: true,
		},
		...baseSchema,
	})
}
