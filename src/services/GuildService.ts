import GuildDocument from "../models/Guild";
import { GuildDocType } from "../types/GuildServiceTypes";

export const GuildService = {
  async updateNotificationOn(
    guildID: string,
    notificationOn: boolean,
  ): Promise<void | Error> {
    try {
      const updatedGuild = await GuildDocument.findOneAndUpdate(
        { guildID },
        { notificationOn: notificationOn },
        { new: true },
      );

      if (!updatedGuild || updatedGuild == null)
        return new Error("Guild not found.");
    } catch (err) {
      console.error(err);
      return new Error("Internal error");
    }
  },
  async updateNotificationChannelID(
    guildID: string,
    channelID: string,
  ): Promise<string | Error> {
    try {
      const updatedGuild = await GuildDocument.findOneAndUpdate(
        { guildID },
        { notificationChannelID: channelID },
        { new: true, upsert: true },
      );

      return updatedGuild.notificationChannelID;
    } catch (err) {
      console.error(err);
      return new Error("Internal error.");
    }
  },
  // TODO: I should condense down add channel id and remove channel id, but that's an issue for another day
  async addChannelID(
    guildID: string,
    channelID: string,
  ): Promise<string[] | Error> {
    try {
      const updatedGuild = await GuildDocument.findOneAndUpdate(
        { guildID },
        { $addToSet: { excludedChannelIDs: channelID } },
        { new: true, upsert: true },
      );

      return updatedGuild.excludedChannelIDs;
    } catch (err) {
      console.error(err);
      return new Error("Internal error.");
    }
  },
  async removeChannelID(
    guildID: string,
    channelID: string,
  ): Promise<string[] | Error> {
    try {
      const updatedGuild = await GuildDocument.findOneAndUpdate(
        { guildID },
        { $pull: { excludedChannelIDs: channelID } },
        { new: true, upsert: true },
      );

      return updatedGuild.excludedChannelIDs;
    } catch (err) {
      console.error(err);
      return new Error("Internal error");
    }
  },
  async getGuildDoc(guildID: string): Promise<GuildDocType | Error> {
    try {
      const guildDocument = await GuildDocument.findOne({ guildID });

      if (!guildDocument || guildDocument === null)
        return new Error("Guild not found.");

      return guildDocument;
    } catch (err) {
      console.error(err);
      return new Error("Internal error.");
    }
  },
};
