module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) {
            return;
        }

        const command =
            interaction.client.commands.get(
                interaction.commandName
            );

        if (!command) {
            console.warn(
                `⚠️ Command not found: ${interaction.commandName}`
            );
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            if (
                interaction.replied ||
                interaction.deferred
            ) {
                await interaction.followUp({
                    content:
                        "❌ Something went wrong.",
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content:
                        "❌ Something went wrong.",
                    ephemeral: true
                });
            }
        }
    }
};
