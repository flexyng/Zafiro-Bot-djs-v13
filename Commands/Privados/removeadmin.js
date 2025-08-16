const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const Admin = require("../../Models/Admins");
const emojis = require("../../emojis");

module.exports = {
    name: "removestaff",
    aliases: ["c-r-staff"],
    description: "Comando privado",
    permissions: "Privado",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        if(message.author.id !== "926625186789326909") {
            return;
        }
        const user = message.mentions.members.first() || client.users.cache.get(args[0]);
        if(!user) {
            return message.channel.send({ content: "Ese usuario no existe" });
        } else {
            const admins = await Admins.findOne({ userId: user.id });
            if(!admin) {
                return message.channel.send({ content: "Ese usuario no es administrador" })
            } else {
                const dAdmin= await Admins.findOneAndDelete({ userId: user.id });
                message.channel.send({ content: `${user} fue removido de mi lista de Administradores.` });
            }
        }
    }
}