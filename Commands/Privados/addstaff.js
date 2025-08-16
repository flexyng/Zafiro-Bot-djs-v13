const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const Staff = require("../../Models/Staff");
const emojis = require("../../emojis");

module.exports = {
    name: "staff",
    aliases: ["c-staff"],
    description: "Comando privado",
    permissions: "Privado",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        if(message.author.id !== "1130621773348601918") {
            return;
        }
        const user = message.mentions.members.first() || client.users.cache.get(args[0]);
        if(!user) {
            return message.channel.send({ content: `${emojis.negativo} | Ese usuario no existe` });
        } else {
            const staff = await Staff.findOne({ userId: user.id });
            if(staff) {
                return message.channel.send({ content: `${emojis.positivo} | Ese usuario ya es staff` })
            } else {
                const cStaff = new Staff({
                    userId: user.id
                });
                await cStaff.save();
                message.channel.send({ content: `${emojis.positivo} | ${user} ahora es staff en mi base de datos.` });
            }
        }
    }
}
