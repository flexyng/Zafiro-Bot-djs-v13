const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "say",
    aliases: ["sy"],
    usage: "say <texto>",
    description: "Repetire lo que me digas",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, interaction, commandName, client, Discord) {
        const mensaje = args.join(" ")
        if(!mensaje) return message.channel.send("<:negativo:957553169771147264> | `Debes escribir algo.`")

        setTimeout(function(){
            message.delete()
            message.channel.send(`${mensaje}`)
        }, 1000)
    }
}
