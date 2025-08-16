const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "laugh",
    aliases: ["reir"],
    usage: "laugh <@Usuario>",
    description: "Se rie del usuario mencionado",
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
                    const { soyultro } = require('soyultro')
                    let author = message.author.username
                    const embed = new MessageEmbed()
                        .setTitle(`${author} se rio.`)
                        .setColor("RANDOM")
                        .setFooter("Impulsado por Zafiro™")
                        .setImage(soyultro('laugh'))
                    if (args.length > 1) {
                        args.shift()
                        const reason = args.join(' ')
                        embed.addField('\u200b', reason)
                    }
                    return message.channel.send({ embeds: [embed] })
                }
            }
            if (!user) {
                const { soyultro } = require('soyultro')
                let author = message.author.username
                const embed = new MessageEmbed()
                    .setTitle(
                        `${author} se rio de ${args.join(
                            ' '
                        )}`
                    )
                    .setColor("RANDOM")
                    .setFooter("Impulsado por Zafiro™")
                    .setImage(soyultro('laugh'))
                return message.channel.send({ embeds: [embed] })
            }
            if (user.id == message.author.id) {
                const { soyultro } = require('soyultro')
                let author = message.author.username
                const embed = new MessageEmbed()
                    .setTitle(`${author} se rió.`)
                    .setColor("RANDOM")
                    .setFooter("Impulsado por Zafiro™")
                    .setImage(soyultro('laugh'))
                if (args.length > 1) {
                    args.shift()
                    const reason = args.join(' ')
                    embed.addField('\u200b', reason)
                }
                return message.channel.send({ embeds: [embed] })
            }
            const { soyultro } = require('soyultro')
            let author = message.author.username
            const embed = new MessageEmbed()
                .setTitle(
                    `${author} se esta riendo de ${user.user.username}`
                )
                .setColor("RANDOM")
                .setFooter("Impulsado por Zafiro™")
                .setImage(soyultro('laugh'))

            return message.channel.send({ embeds: [embed] })
        } catch (e) {
            console.error(e)
            message.channel.send({ content: `${emojis.negativo} | Ha ocurrido un error` })
            try {
                message.author
                    .catch(e)
            } catch (e) { }
        }
    }
}