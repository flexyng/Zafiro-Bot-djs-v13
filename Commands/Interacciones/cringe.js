const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "cringe",
    aliases: ["cr"],
    usage: "cringe",
    description: "Muestra que alguien o algo te esta dando cringe.",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, interaction, commandName, client, Discord) {
        try {
            const { soyultro } = require('soyultro')
            let author = message.author.username
            const embed = new MessageEmbed()
                .setTitle(`${author} sintió cringe.`)
                .setColor("RANDOM")
                .setImage(soyultro('cringe'))
                .setFooter("Impulsado por Zafiro™")

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
