const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "dab",
    aliases: ["dab"],
    usage: "dab",
    description: "Muestra que estás haciendo un dab.",
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
                const { soyultro } = require('soyultro')
                let author = message.author.username
                const embed = new MessageEmbed()
                    .setTitle(`${author} hizo un dab.`)
                    .setColor("RANDOM")
                    .setFooter("Impulsado por Zafiro™")
                    .setImage(soyultro('dab'))
                if (args.length > 1) {
                    args.shift()
                    const reason = args.join(' ')
                    embed.addField('\u200b', reason)
                }
                return message.channel.send({ embeds: [embed] })
            }
            if (!user) {
                const { soyultro } = require('soyultro')
                let author = message.author.username
                const embed = new MessageEmbed()
                    .setTitle(
                        `${author} hicieron un dab ${args.join(' ')}`
                    )
                    .setColor("RANDOM")
                    .setFooter("Impulsado por Zafiro™")
                    .setImage(soyultro('dab'))
                return message.channel.send({ embeds: [embed] })
            }
            if (user.id == message.author.id) {
                const { soyultro } = require('soyultro')
                let author = message.author.username
                const embed = new MessageEmbed()
                    .setTitle(`${author} hizo un dab`)
                    .setColor("RANDOM")
                    .setFooter("Impulsado por Zafiro™")
                    .setImage(soyultro('dab'))
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
                    `${author} y ${user.user.username} hicieron un dab`
                )
                .setColor("RANDOM")
                .setFooter("Impulsado por Zafiro™")
                .setImage(soyultro('dab'))

            return message.channel.send({ embeds: [embed] })
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