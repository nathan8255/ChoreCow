import { config } from 'dotenv';
config();
import { Client, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = '642854722402779146';

const client = new Client({ intents: [] });
const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => console.log('The lizard has awoken'));

async function main() {
  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: [],
    });
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();