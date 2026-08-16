require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    REST,
    Routes
} = require("discord.js");

const commands = [];

const commandsPath =
    path.join(__dirname, "commands");

const commandFiles =
    fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command =
        require(path.join(commandsPath, file));

    if (command.global === false) {
        commands.push(command.data.toJSON());
    }
}

if (!process.env.GUILD_ID) {
    console.error(
        "❌ GUILD_ID is missing from .env!"
    );
    process.exit(1);
}

const rest = new REST({
    version: "10"
}).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(
            `🔄 Registering ${commands.length} guild command(s)...`
        );

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: commands
            }
        );

        console.log(
            "✅ Guild commands registered!"
        );

    } catch (error) {
        console.error(error);
    }
})();
