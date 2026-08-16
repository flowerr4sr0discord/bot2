module.exports = {
    name: "messageCreate",

    async execute(message) {
        if (message.author.bot) {
            return;
        }

        if (!message.channel.isDMBased()) {
            return;
        }

        console.log(
            `📩 DM from ${message.author.tag}: ${message.content}`
        );

        try {
            await message.reply(
                `You said: ${message.content}`
            );
        } catch (error) {
            console.error(
                "❌ Failed to reply to DM:",
                error
            );
        }
    }
};
