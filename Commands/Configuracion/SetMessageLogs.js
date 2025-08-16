const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const MessageLogs = require("../../Models/MessageLogs");
const emojis = require("../../emojis");

module.exports = {
    name: "set-message-logs",
    aliases: ["setmessagelogs"],
    description: "Coloca el canal en donde se enviaran los logs de los mensajes editados/eliminados",
    permissions: "MANAGE_GUILD",
    usage: "set-message-logs #Canal",
    cooldown: 10,
    /**
     * @param {Message} message
     */
    async execute(message, args, commandName, client, Discord) {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            return message.reply({ content: `${emojis.negativo} | \`No tienes permisos para ejecutar esta acción\` `, allowedMentions: { repliedUser: false } });
        }
        if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
            return message.reply({ content: `No puedo interactuar con este servidor sin los siguientes permisos: \`ADMINISTRADOR\``, allowedMentions: { repliedUser: false } });
        }
        const Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        const AlreadyExists = await MessageLogs.findOne({ guildId: message.guild.id });
        if (!AlreadyExists) {
            if (!Channel) {
                const ResponseError = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`\`\`\`markdown\n# No mencionaste ni proporcionaste ningun canal para establecer los logs\n\`\`\``)
                    .setColor("BLUE")
                return message.reply({ embeds: [ResponseError], allowedMentions: { repliedUser: false } });
            } else {
                Channel.createWebhook('Zafiro Logs', {
                    avatar: "https://cdn.discordapp.com/attachments/1189906502803259444/1189950035555790999/logo_oficial.png?ex=65a00654&is=658d9154&hm=36acba722fb72141eefe9aa97de105711047448ba1511db7674ea3997fc6fdb2&"
                }).then((webhook) => {
                    const LogChannel = new MessageLogs({
                        guildId: message.guild.id,
                        channelId: message.guild.id,
                        webhookId: webhook.id,
                        webhookToken: webhook.token
                    }).save();
                    const Response = new MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                        .setDescription(`\`\`\`markdown\n# Los logs fueron colocados con exito en el canal ${Channel.name}\n\`\`\``)
                        .setColor("BLUE")
                    message.reply({ embeds: [Response], allowedMentions: { repliedUser: false } });
                });
            }
        } else {
            Channel.createWebhook('ZafiroLogs', {
                avatar: "https://cdn.discordapp.com/attachments/1189906502803259444/1189950035555790999/logo_oficial.png?ex=65a00654&is=658d9154&hm=36acba722fb72141eefe9aa97de105711047448ba1511db7674ea3997fc6fdb2&"
            }).then(async (webhook) => {
                AlreadyExists.webhookId = webhook.id
                AlreadyExists.webhookToken = webhook.token
                AlreadyExists.channelId = Channel.id
                await AlreadyExists.save()
                const Response = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`\`\`\`markdown\n# Los logs fueron colocados con exito en el canal ${Channel.name}\n\`\`\``)
                    .setColor("BLUE")
                message.reply({ embeds: [Response], allowedMentions: { repliedUser: false } });
            });
        }
    }
}