import { model, Schema } from "mongoose";
import { GuildDocType } from "../types/GuildServiceTypes";

const GuildSchema = new Schema<GuildDocType>({
  guildID: { type: String, required: true, index: true },
  notificationOn: { type: Boolean, default: false },
  notificationChannelID: { type: String, default: "" },
  excludedChannelIDs: {
    type: [],
    default: [],
    //Added to ensure this doesn't get recklessly long. May be extended in the future
    validate: {
      validator: function (v: string[]) {
        return v.length <= 100;
      },
      message: "Too many excluded channels (the limit is 100)",
    },
  },
});

const GuildDocument = model<GuildDocType>("GuildDocument", GuildSchema);

export default GuildDocument;
