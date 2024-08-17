import { pgTable, text, timestamp, serial, integer, boolean } from "drizzle-orm/pg-core";

// Define the userSchema
export const userSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  password_hash: text('password_hash').notNull(),
  name: text('name'),
  online_status: text('online_status').default('offline').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Define the conversationSchema
export const conversationSchema = pgTable('conversations', {
  id: serial('id').primaryKey(),
  sender_id: integer('sender_id').references(() => userSchema.id).notNull(),
  receiver_id: integer('receiver_id').references(() => userSchema.id).notNull(),
  read_status: text('read_status').default('unread').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Define the messageSchema
export const messageSchema = pgTable('messages', {
  id: serial('id').primaryKey(),
  conversation_id: integer('conversation_id').references(() => conversationSchema.id).notNull(),
  content: text('content').notNull(),
  seen: boolean('seen').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
