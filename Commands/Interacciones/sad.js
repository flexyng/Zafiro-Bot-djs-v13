const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "cry",
    aliases: ["sad"],
    usage: "cry",
    description: "Muestra que estás llorando",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, interaction, commandName, client, Discord) {
        try {
            const { soyultro } = require('soyultro')
            let author = message.author.username
            const embed = new MessageEmbed()
                .setTitle(`${author} esta llorando :(`)
                .setColor("RANDOM")
                .setFooter("¡Comando cry! | Impulsado por Zafiro™")
                .setImage(soyultro('cry'))

            message.channel.send({ embeds: [embed] })
        } catch (e) {
            console.error(e)
            message.channel.send({ content: `${emojis.negativo} | Ha ocurrido un error inesperado.` })
            try {
                message.author
                    .catch(e)
            } catch (e) { }
        }
    }
}
