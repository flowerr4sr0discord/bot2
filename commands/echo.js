const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Send text to a channel")
        .addStringOption(option =>
            option
                .setName("text")
                .setDescription("The text to send")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName("channel")
                .setDescription("The channel to send the message to")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.SendMessages.toString()
        ),

    async execute(interaction) {
        const text = interaction.options.getString("text");
        const channel = interaction.options.getChannel("channel");

        if (!channel.isTextBased()) {
            return interaction.reply({
                content: "❌ That isn't a text-based channel.",
                ephemeral: true
            });
        }

        if (!channel.isSendable()) {
            return interaction.reply({
                content: "❌ I can't send messages in that channel.",
                ephemeral: true
            });
        }

        try {
            await channel.send(text);

            await interaction.reply({
                content: `✅ Sent the message to ${channel}.`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);

            await interaction.reply({
                content: "❌ I couldn't send the message there.",
                ephemeral: true
            });
        }
    }
};
