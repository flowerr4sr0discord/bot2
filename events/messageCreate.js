module.exports = {
    name: "messageCreate",

    async execute(message) {
        if (message.author.bot) return;

        // Only respond to DMs
        if (message.channel.isDMBased()) {
            console.log(
                `📩 DM from ${message.author.tag}: ${message.content}`
            );

            await message.reply(
                `You said: ${message.content}`
            );
        }
    }
};
