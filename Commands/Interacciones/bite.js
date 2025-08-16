const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "bite",
    aliases: ["morder"],
    usage: "bite <@Usuario>",
    description: "Muerde al usuario mencionado",
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
                    return message.channel
                        .send({ content: `${emojis.negativo} | Debes de mencionar a un usuario` })
                        .catch(e => { })
                }
            }
            if (!user) {
                const { soyultro } = require('soyultro')
                let author = message.author.username
                const embed = new MessageEmbed()
                    .setTitle(
                        `${author} mordió a ${args.join(' ')}`
                    )
                    .setColor("RANDOM")
                    .setImage(soyultro('bite'))
                    .setFooter("Impulsado por Zafiro™")
                return message.channel.send({ embeds: [embed] }).catch(e => { })
            }
            if (user.id == message.author.id) return message.channel.send(`${emojis.negativo} | Ha ocuttido un error`)
            const { soyultro } = require('soyultro')
            let author = message.author.username
            const embed = new MessageEmbed()
                .setTitle(
                    `${author} mordió a ${user.user.username}`
                )
                .setColor("RANDOM")
                .setImage(soyultro('bite'))
                .setFooter("Impulsado por Zafiro™")

            message.channel.send({ embeds: [embed] }).catch(e => { })
        } catch (e) {
            console.error(e)
            try {
                message.author
                    .catch(e)
            } catch (e) { }
        }
    }
}