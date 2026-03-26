import { model, Schema } from "mongoose";
import { MemberDocType } from "../types/LevelServiceTypes";

const MemberSchema = new Schema<MemberDocType>({
  guildID: { type: String, required: true, index: true },
  memberID: { type: String, required: true, index: true },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
});

const MemberDocument = model<MemberDocType>("MemberDocument", MemberSchema);

export default MemberDocument;
