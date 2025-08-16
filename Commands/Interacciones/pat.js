const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "pat",
    aliases: ["acariciar"],
    usage: "pat <@Usuario>",
    description: "Acaricia al usuario mencionado",
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
                const embed = new MessageEmbed()
                    .setTitle(
                        `${author} acarició a ${args.join(' ')}`
                    )
                    .setColor("RANDOM")
                    .setFooter("Impulsado por Zafiro™")
                    .setImage(soyultro('pat'))
                return message.channel.send({ embeds: [embed] })
            }
            if (user.id == message.author.id) {
                return message.channel.send({ content: `${emojis.negativo} | No puedes acariciarte a tí mismo.` })
            }
            const { soyultro } = require('soyultro')
            let author = message.author.username
            const embed = new MessageEmbed()
                .setTitle(
                    `${author} acarició a ${user.user.username}`
                )
                .setColor("RANDOM")
                .setFooter("Impulsado por Zafiro™")
                .setImage(soyultro('pat'))

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
