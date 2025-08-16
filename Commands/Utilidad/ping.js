const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");
const fetch = require('node-fetch')
module.exports = {
    name: "ping", 
    aliases: ["p"],
    description: "Muestra el ping del bot",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, commandName, client, Discord) {
        const sent = await message.reply('Ping...');
        const ping = sent.createdTimestamp - message.createdTimestamp;
        sent.edit(`Pong! La latencia es ${ping}ms.`);
    }
}
