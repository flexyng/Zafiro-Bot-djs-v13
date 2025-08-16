const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");
const fetch = require('node-fetch')
module.exports = {
    name: "avatar",
    aliases: ["av"],
    description: "Muestra la foto de perfil de alguien.",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, commandName, client, Discord) {


        let mentioned = message.mentions.members.first() || message.member;
        const embed = new Discord.MessageEmbed()
        embed.setColor("0xDC00FF")
        embed.setTitle(`Avatar de **` + `${mentioned.user.username}` + "**")
        embed.setImage(mentioned.user.displayAvatarURL({ size: 1024, dynamic: true }))
        embed.setFooter("Pedido por: " + message.member.displayName, message.author.displayAvatarURL());
        return message.channel.send({ embeds: [embed] })
    }

}
