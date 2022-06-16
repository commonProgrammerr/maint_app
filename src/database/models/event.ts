import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";
import { OccurrencesType } from "../../utils/occurrences";

class Event extends Model {
  static table = "events";

  @field("online_id")
  online_id!: string;

  @field("type")
  type!: OccurrencesType;

  @field("local")
  local!: string;

  @field("piso")
  piso!: string;

  @field("box")
  box?: string;

  @field("closed")
  closed!: boolean;

  @field("online_closed")
  online_closed!: boolean;


}

export { Event };
