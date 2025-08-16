const { Client } = require("discord.js");

module.exports = {
    name: "ready",
    /**
     * @param {Client} client
     *  
     */
    async execute(client) {
        client.user.setActivity('ZafiroBot', {
            type: "PLAYING"
        })
        console.log("Zafiro se encuentra on by dymidless and clasifed 💚")
    }
}
