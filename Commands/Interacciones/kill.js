const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "kill",
    aliases: ["matar"],
    usage: "kill <@Usuario>",
    description: "Mata a alguien",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, interaction, commandName, client, Discord) {
        try {
            let user
            if (args[0]) {
                user =
                    message.mentions.members.first() ||
                    (await message.guild.members.fetch(args[0]).catch(e => {
                        return
                    }))
            } else {
                if (message.mentions.repliedUser) {
                    user = await message.guild.members
                        .fetch(message.mentions.repliedUser.id)
                        .catch(e => {
                            return
                        })
                } else {
                    return message.channel.send({ content: `${emojis.negativo} | Ha ocurrido un error` })
                }
            }
            if (!user) {
                const { soyultro } = require('soyultro')
                let author = message.author.username
                return message.channel.send({ content: `${emojis.negativo} | Debes de mencionar a un usuario` })
            }
            if (user.id == message.author.id) {
                return message.channel.send({ content: `${emojis.negativo} | Debes de mencionar a un usuario` })
            }
            const { soyultro } = require('soyultro')
            let author = message.author.username
            const embed = new MessageEmbed()
                .setTitle(
                    `${author} mató a ${user.user.username}`
                )
                .setColor("RANDOM")
                .setFooter("Impulsado por Zafiro™")
                .setImage(soyultro('kill'))

            message.channel.send({ embeds: [embed] })
        } catch (e) {
            console.error(e)
            message.channel.send({ content: `${emojis.negativo} | Ha ocurrido un error.` })
            try {
                message.author
                    .catch(e)
            } catch (e) { }
        }
    }
}
