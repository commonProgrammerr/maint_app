import { tableSchema } from "@nozbe/watermelondb/Schema";

export const eventSchema = tableSchema({
  name: "events",
  columns: [
    { name: "online_id", type: "string" },
    { name: "type", type: "number" },
    { name: "local", type: "string" },
    { name: "piso", type: "string" },
    { name: "closed", type: "boolean" },
    { name: "online_closed", type: "boolean" },
    { name: "box", type: "string", isOptional: true },
  ],
});
