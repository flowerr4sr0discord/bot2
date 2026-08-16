require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    Client,
    Collection,
    GatewayIntentBits
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (!command.data || !command.execute) {
        console.warn(`⚠️ Invalid command file: ${file}`);
        continue;
    }

    client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "events");

const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(
            event.name,
            (...args) => event.execute(...args)
        );
    } else {
        client.on(
            event.name,
            (...args) => event.execute(...args)
        );
    }
}

if (!process.env.DISCORD_TOKEN) {
    console.error("❌ DISCORD_TOKEN is missing!");
    process.exit(1);
}

if (!process.env.CLIENT_ID) {
    console.error("❌ CLIENT_ID is missing!");
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
