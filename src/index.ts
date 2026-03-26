import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { CommandHandler } from "djs-commands";
import connectDB from "./utils/mongo";

dotenv.config();

connectDB();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const handler = new CommandHandler({
  client,
  token: process.env.TOKEN!,
  folder: __dirname + "/commands",
  updateCommands: true,
});

client.once("clientReady", async () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const cmd = handler.getCommand(interaction.commandName);
  if (!cmd) return;

  try {
    await cmd.run(interaction);
  } catch (error) {
    console.error("Error running command:", error);
  }
});
client.login(process.env.TOKEN);
