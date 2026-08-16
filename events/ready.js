module.exports = {
    name: "ready",
    once: true,

    execute(client) {
        console.log("================================");
        console.log(`🤖 Logged in as ${client.user.tag}`);
        console.log(`🆔 Bot ID: ${client.user.id}`);
        console.log(`🌐 Servers: ${client.guilds.cache.size}`);
        console.log("================================");
    }
};
