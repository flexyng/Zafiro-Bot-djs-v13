const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "tirarmoneda",
    aliases: ["moneda"],
    usage: "tirarmoneda",
    description: "Tira una moneda al aire, y espera al resultado",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, interaction, commandName, client, Discord) {

        let respuestas = ["Moneda", "Cruz"]
        let random = respuestas[Math.floor(Math.random() * respuestas.length)];

        const embed = new MessageEmbed()
        .setDescription(`🪙 | Has tirado una moneda, y has sacado *${random}*`)
        .setColor("BLUE")
        .setFooter("¡Tirar moneda! | Impulsado por Zafiro™")
        message.channel.send({embeds: [embed]})
    }
}
