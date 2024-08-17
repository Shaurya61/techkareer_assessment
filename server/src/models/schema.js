import { pgTable, text, timestamp, serial, integer } from "drizzle-orm/pg-core";

export const userSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  online_status: text('online_status').default('offline').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const messagesSchema = pgTable('messages', {
  id: serial('id').primaryKey(),
  sender_id: integer('sender_id').notNull(),
  receiver_id: integer('receiver_id').notNull(),
  content: text('content').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  read_status: text('read_status').default('unread').notNull(),
});