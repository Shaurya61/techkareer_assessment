import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { config } from 'dotenv'

config()
const connectionString = process.env.DATABASE_URL

// Disable prefetch as it is not supported for "Transaction" pool mode
// console.log(connectionString)
export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);
