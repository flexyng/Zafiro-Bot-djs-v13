const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "run",
    aliases: ["correr"],
    usage: "run",
    description: "Corre por tu vida",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, interaction, commandName, client, Discord) {
        try {
            const { soyultro } = require('soyultro')
            let author = message.author.username
            const embed = new MessageEmbed()
                .setTitle(`${author} está corriendo.`)
                .setColor("RANDOM")
                .setFooter("Impulsado por Zafiro™")
                .setImage(soyultro('run'))

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
