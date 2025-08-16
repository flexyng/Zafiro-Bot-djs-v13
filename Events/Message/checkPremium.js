const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const Premium = require("../../Models/UserPremium");
const ms = require("ms");

module.exports = {
    name: "messageCreate",
    /**
     * @param {Message} message
     */
    async execute(message, client) {
        const user = await Premium.findOne({ userId: message.author.id });
        if (!user) {
            return;
        }

        if ((Date.now() + user.ctimestamp) < 2592000000) {
            await Premium.findOneAndDelete({ userId: message.author.id });
            return message.channel.send({ content: `${message.author}, Tu premium mensual ha expirado.` });
        }

        if ((Date.now() + user.ctimestamp) < 31557600000) {
            await Premium.findOneAndDelete({ userId: message.author.id });
            return message.channel.send({ content: `${message.author}, Tu premium anual ha expirado.` });
        }
    }
}
