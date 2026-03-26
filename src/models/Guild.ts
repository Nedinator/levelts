import { model, Schema } from "mongoose";

type GuildDocType = {
  guildID: string;
  notificationOn: boolean;
  notificationChannelID: string;
  excludedChannelIDs: string[];
};

const GuildSchema = new Schema<GuildDocType>({
  guildID: { type: String, required: true, index: true },
  notificationOn: { type: Boolean, default: false },
  notificationChannelID: { type: String, default: "" },
  excludedChannelIDs: { type: [], default: [] },
});

const GuildDocument = model<GuildDocType>("GuildDocument", GuildSchema);

export default GuildDocument;
