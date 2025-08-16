const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "verify",
    aliases: ["verificarme"],
    description: "Verificate en el servidor de $AK",
    cooldown: 3,
    /**
     * @param {Message} message
     */
    async execute(message, args, commandName, client, Discord) {
        if(message.guild.id !== "965584595850526770") {
            return;
        } else if(message.channel.id !== "1001565378847186974") {
            return;
        } else {
            message.delete()
            const Role = message.guild.roles.cache.get("980461350008524810")
            message.member.roles.add(Role)
            message.channel.send({ content: `${emojis.positivo} | \`Te has verificado correctamente\`` }).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 2500);
            });
        }
    }
}