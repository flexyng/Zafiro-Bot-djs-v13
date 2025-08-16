const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "8ball",
    aliases: ["8b"],
    description: "Preguntame algo y te responderé sinceramente",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, interaction, commandName, client, Discord) {
        const pregunta = args.join(" ")
        if(!pregunta) return message.channel.send("<:negativo:957553169771147264> | `Debes de escribir una pregunta`")

        let respuestas = ["Si", "No", "Probablemente no", "Probablemente si", "No creo", "Creo que si", "No se que decir", "Claro!", "hmmm, creo que si"]
        let random = respuestas[Math.floor(Math.random() * respuestas.length)];

        const embed = new MessageEmbed()
        .setTitle("🎱 A la pregunta...")
        .setDescription(`**Pregunta:** ${pregunta}\n\n**Respuesta:** ${random}`)
        .setThumbnail("https://images-ext-1.discordapp.net/external/xwkohohnLbmBuoEoMr5uG5JRb4NE12rzCvDlnIjiZJw/https/cdn.dribbble.com/users/264259/screenshots/1860410/attachments/313225/8-ball.gif?width=759&height=606")
        .setColor("BLUE")
        .setFooter("¡8ball! | Impulsado por Zafiro™ Bot")
        
        message.channel.send({embeds: [embed]})
    }
}
