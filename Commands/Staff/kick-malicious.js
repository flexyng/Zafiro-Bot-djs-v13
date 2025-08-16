const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const Staff = require("../../Models/Staff");
const Blacklist = require("../../Models/Blacklist");
const emojis = require("../../emojis");

module.exports = {
    name: "kick-malicious",
    aliases: ["kickmalicious"],
    description: "Comando privado",
    permissions: "Privado",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        message.channel.send(`${emojis.negativo} | El comando se encuentra en mantenimiento.`)
    }
}