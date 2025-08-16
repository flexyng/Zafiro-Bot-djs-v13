const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const Admins = require("../../Models/Admins");
const emojis = require("../../emojis");

module.exports = {
    name: "admin",
    aliases: ["z-admin"],
    description: "Comando privado",
    permissions: "Privado",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        if(message.author.id !== "1020009874412798033") {
            return;
        }
        const user = message.mentions.members.first() || client.users.cache.get(args[0]);
        if(!user) {
            return message.channel.send({ content: `${emojis.negativo} | Ese usuario no existe` });
        } else {
            const admin = await Admins.findOne({ userId: user.id });
            if(admin) {
                return message.channel.send({ content: `${emojis.negativo} | Ese usuario ya es admin *(en Zafiro)*` })
            } else {
                const cAdmin = new Admins({
                    userId: user.id
                });
                await cAdmin.save();
                message.channel.send({ content: `${emojis.positivo} | ${user} ahora es administrador en **$AK** *(NO TE DÁ PERMISO DE ADMINISTRACCIÓN! solo te permite ejecutar comandos pensados para los Staffs del servidor)*.` });
            }
        }
    }
}