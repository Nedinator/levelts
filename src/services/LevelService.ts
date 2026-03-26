import MemberDocument from "../models/Member";
import { MemberDocType } from "../types/LevelServiceTypes";

export const LevelService = {
  async addXP(guildID: string, memberID: string, gainedXP: number) {
    try {
      const updatedMember = await MemberDocument.findOneAndUpdate(
        { guildID, memberID },
        { $inc: { experience: gainedXP } },
        { new: true },
      );

      if (!updatedMember || updatedMember == null)
        return console.error("No document found!");

      this.checkLevelUpAndHandle(guildID, memberID, updatedMember.experience);
      return updatedMember.experience;
    } catch (err) {
      console.error(err);
    }
  },
  async checkLevelUpAndHandle(
    guildID: string,
    memberID: string,
    experience: number,
  ) {},
  async getLevelData(
    guildID: string,
    memberID: string,
  ): Promise<MemberDocType | Error> {
    try {
      const memberDoc = await MemberDocument.findOne({ guildID, memberID });

      if (!memberDoc || memberDoc === null) {
        return new Error("No member doc found!");
      }

      return memberDoc;
    } catch (err) {
      console.error(err);
      return new Error("Internal error.");
    }
  },
};
