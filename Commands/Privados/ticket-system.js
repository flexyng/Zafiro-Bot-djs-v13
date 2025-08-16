const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "setsystem",
    aliases: ["set-system"],
    description: "Comando privado",
    permissions: "Privado",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        if(message.author.id !== "1020009874412798033") {
            return;
        } else {
            const channel = await client.channels.cache.get("1032150927689384038")
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("ticket")
                .setLabel("Abrir Ticket")
                .setStyle("PRIMARY"),
                new MessageButton()
                .setCustomId("cerrar")
                .setLabel("Cerrar Ticket")
                .setStyle("DANGER")
            )
            const Embed = new MessageEmbed()
            .setDescription("¿Tienes dudas o necesitas ayuda?, puedes contactar con el soporte haciendo click en el boton de abajo!")
            .setColor("#1528F8")
            channel.send({ embeds: [Embed], components: [row] });
        }
    }
}