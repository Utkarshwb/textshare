import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const pastes  = pgTable('pastes',{
    codename : text("codename").primaryKey(),
    content: text('content').notNull(),
    createdAt : timestamp('created_at').defaultNow(),
    expiresAt : timestamp('expires_at'),
});