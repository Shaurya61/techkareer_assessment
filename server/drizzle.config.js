import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv'

config({
  path: "./.env"
})
// console.log(process.env.DATABASE_URL);
export default defineConfig({
  schema: './src/models/schema.js', // Corrected path to the schema
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
