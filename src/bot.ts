import { Client } from "discord.js";
import { deployCommands } from "./deploy-commands";
import { config } from "./config";
import { commands } from "./commands";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;

  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  } else {
    interaction.reply("There was an error finding the command to execute.");
  }
});

client.login(config.DISCORD_TOKEN);
