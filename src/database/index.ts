import { Database } from "@nozbe/watermelondb";
import SQLAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import { Event } from "./models/event";

const adapter = new SQLAdapter({
  schema,
  onSetUpError: console.error
});

export const database = new Database({
  adapter,
  modelClasses: [Event],
  actionsEnable: true,
} as any);
