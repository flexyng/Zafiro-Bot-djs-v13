const { Client, Message, MessageEmbed, Collection, WebhookClient } = require("discord.js");
const MessageLogs = require("../../Models/MessageLogs");
const emojis = require("../../emojis");
const moment = require("moment");

module.exports = {
    name: "messageUpdate",
    /**
     * @param {Client} client
     * @param {Message} oldMessage,
     * @param {Message} newMessage
     */
    async execute(oldMessage, newMessage, client, Discord) {
        const guildHasLogs = await MessageLogs.findOne({ guildId: oldMessage.guild.id });
        if (!guildHasLogs) return;

        const { webhookToken, webhookId } = guildHasLogs;
        const webhookClient = new WebhookClient({ token: webhookToken, id: webhookId });
        if (!webhookClient) return;

        const original = oldMessage.content.slice(0, 1950) + (oldMessage.content.length > 1950 ? "..." : "");
        const edited = newMessage.content.slice(0, 1950) + (newMessage.content.length > 1950 ? "..." : "");

        const embed = new MessageEmbed()
            .setTitle("Mensaje Editado")
            .setDescription(`${oldMessage.author} edito un mensaje en ${oldMessage.channel}`)
            .addField("Antes", original, true)
            .addField("Después", edited, true)
            .addField("¿Es un bot?", `${oldMessage.author.bot ? "Si, es un bot." : "No, no es un bot."}`)
            .setFooter({ text: "Impulsado por Zafiro™", iconURL: client.user.avatarURL({ dynamic: true }) })
            .setColor("ORANGE");

        webhookClient.send({ embeds: [embed], avatarURL: client.user.avatarURL({ dynamic: true }) }).catch(e => { });
    },
};
