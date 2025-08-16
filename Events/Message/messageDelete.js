const {
    Client,
    Message,
    MessageEmbed,
    Collection,
    WebhookClient,
} = require("discord.js");
const MessageLogs = require("../../Models/MessageLogs");
const emojis = require("../../emojis");
const moment = require("moment");

module.exports = {
    name: "messageDelete",
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {
        const guildHasLogs = await MessageLogs.findOne({
            guildId: message.guild.id,
        });
        if (guildHasLogs) {
            const { webhookToken, webhookId } = guildHasLogs;
            const webhookClient = new WebhookClient({
                token: webhookToken,
                id: webhookId,
            });
            if (!webhookClient) {
                return;
            }

            if (!message.author) return;
            if (message.author.bot) return;

            const Response = new MessageEmbed()
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL({ dynamic: true }),
                )
                .setDescription(
                    `Mensaje eliminado en <#${message.channel?.id}>\n\n**Contenido:** \n${message.content ? message.content : "Ninguno"
                    }\n\n**Fecha:** \n\`${moment()}\`\n\n**ID:**\n\`\`\`markdown\n# Usuario = ${message.author?.id
                    }\n# Mensaje = ${message?.id}\n\`\`\``,
                )
                .setFooter(
                    "Impulsado por Zafiro™",
                    client.user.avatarURL({ dynamic: true }),
                )
                .setTimestamp()
                .setColor("RANDOM");
            webhookClient
                .send({
                    embeds: [Response],
                    avatarURL: client.user.avatarURL({ dynamic: true }),
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
};
