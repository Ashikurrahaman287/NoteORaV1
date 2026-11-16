import { pgTable, serial, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reportsTable = pgTable("reports", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  summary: text("summary"),
  chartIds: jsonb("chart_ids").notNull().default([]),
  dateRangeStart: text("date_range_start"),
  dateRangeEnd: text("date_range_end"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertReportSchema = createInsertSchema(reportsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reportsTable.$inferSelect;
