const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "bully",
    aliases: ["bullying"],
    usage: "bully <@Usuario>",
    description: "Haz bullying al usuario mencionado.",
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
                        `${author} hizo bullying a  ${args.join(
                            ' '
                        )}`
                    )
                    .setColor("RANDOM")
                    .setImage(soyultro('bully'))
                return message.channel.send({ embeds: [embed] })
            }
            if (user.id == message.author.id) {
                return message.channel.send({ content: `${emojis.negativo} | No puedes hacerte bullying a tí mismo.` })
            }
            const { soyultro } = require('soyultro')
            let author = message.author.username
            const embed = new MessageEmbed()
                .setTitle(
                    `${author} hizo bullying a ${user.user.username}`
                )
                .setColor("RANDOM")
                .setImage(soyultro('bully'))
                .setFooter("¡No lo hagas en la vida real! | Impulsado por Zafiro™")
            if (args.length > 1) {
                args.shift()
                const reason = args.join(' ')
                embed.addField('\u200b', reason)
            }
            message.channel.send({ embeds: [embed] })
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
