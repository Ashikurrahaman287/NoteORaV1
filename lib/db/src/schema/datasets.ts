import { pgTable, serial, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const datasetsTable = pgTable("datasets", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  userId: text("user_id").notNull(),
  name: text("name").notNull(),
  sourceType: text("source_type").notNull().default("manual"),
  columns: jsonb("columns").notNull().default([]),
  rowCount: integer("row_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const datasetRowsTable = pgTable("dataset_rows", {
  id: serial("id").primaryKey(),
  datasetId: integer("dataset_id").notNull(),
  rowData: jsonb("row_data").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDatasetSchema = createInsertSchema(datasetsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertDataset = z.infer<typeof insertDatasetSchema>;
export type Dataset = typeof datasetsTable.$inferSelect;
export type DatasetRow = typeof datasetRowsTable.$inferSelect;
