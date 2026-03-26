import { BaseCommand } from "djs-commands";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default class LevelCommand implements BaseCommand {
  name = "level";
  description = "Get your profile level data for the guild you're currently in";

  slashCommand = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);

  async run(interaction: ChatInputCommandInteraction): Promise<void> {
    //
  }
}
