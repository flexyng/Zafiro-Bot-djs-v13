const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "bored",
    aliases: ["aburrido"],
    usage: "bored",
    description: "Expresa que estas aburrido/a.",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, interaction, commandName, client, Discord) {
        try {
            const { soyultro } = require('soyultro')
            let author = message.author.username
            const embed = new MessageEmbed()
                .setTitle(`${author} se encuentra aburrido/a.`)
                .setColor("RANDOM")
                .setImage(soyultro('bored'))
                .setFooter("Impulsado por Zafiro™")

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
