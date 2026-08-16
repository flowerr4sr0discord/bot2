const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    global: true,

    data: new SlashCommandBuilder()
        .setName("base64")
        .setDescription("Encode or decode Base64 text")

        .addStringOption(option =>
            option
                .setName("action")
                .setDescription("Encode or decode")
                .setRequired(true)
                .addChoices(
                    {
                        name: "Encode",
                        value: "encode"
                    },
                    {
                        name: "Decode",
                        value: "decode"
                    }
                )
        )

        .addStringOption(option =>
            option
                .setName("text")
                .setDescription("Text to encode or decode")
                .setRequired(true)
        ),

    async execute(interaction) {
        const action =
            interaction.options.getString("action");

        const text =
            interaction.options.getString("text");

        try {
            if (action === "encode") {
                const encoded = Buffer
                    .from(text, "utf8")
                    .toString("base64");

                return interaction.reply({
                    content:
                        `\`\`\`text\n${encoded}\n\`\`\``
                });
            }

            if (action === "decode") {
                const decoded = Buffer
                    .from(text, "base64")
                    .toString("utf8");

                return interaction.reply({
                    content:
                        `\`\`\`text\n${decoded}\n\`\`\``
                });
            }

            return interaction.reply({
                content: "❌ Unknown action.",
                ephemeral: true
            });

        } catch (error) {
            console.error(error);

            return interaction.reply({
                content: "❌ Invalid Base64 input.",
                ephemeral: true
            });
        }
    }
};
