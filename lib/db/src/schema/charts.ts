import { pgTable, serial, text, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const chartsTable = pgTable("charts", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  datasetId: integer("dataset_id"),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  chartType: text("chart_type").notNull().default("bar"),
  xAxis: text("x_axis"),
  yAxis: text("y_axis"),
  config: jsonb("config"),
  pinnedToDashboard: boolean("pinned_to_dashboard").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertChartSchema = createInsertSchema(chartsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertChart = z.infer<typeof insertChartSchema>;
export type Chart = typeof chartsTable.$inferSelect;
