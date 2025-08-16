const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
    name: "impostor",
    aliases: ["imp"],
    usage: "impostor <@Usuario>",
    description: "Comprobemos si es el impostor...",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, interaction, commandName, client, Discord) {
        try {
            let mencionado
            if (args[0]) {
                mencionado =
                    message.mentions.members.first() ||
                    (await message.guild.members
                        .fetch(args[0].replace('<@', '').replace('>', ''))
                        .catch(e => {
                            return
                        }))
            }
            if (!mencionado && args[0]) {
                return message.channel.send({ content: `${emojis.negativo} | La ID o mención no corresponde a un usuario.` })
            }
            let random = [
                "No era el impostor",
                "Era el impostor"
            ] 

            if (!mencionado)

                return message.channel
                    .send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
            　　　.　　　 　　.　　　　　。　　 。　. 　
    
            .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
            　　ﾟ　　 ${message.author.username} ${
                    random[Math.floor(Math.random() * random.length)]
                } 　 。　.
    
            　　'　　　  　 　　。     ,         ﾟ             ,   ﾟ      .       ,        .             ,
    
            　　ﾟ　　　.　　　. ,　　　　.　 .`)



            message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
            　　　.　　　 　　.　　　　　。　　 。　. 　
    
            .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•.                                     .
    
            　　ﾟ　　 ${mencionado.user.username} ${
                random[Math.floor(Math.random() * random.length)]
            } 　 。　.
    
            　　'　　　  　 　　。                                          .
            。  
            　　ﾟ　　　.　　　. ,　　　　.　 .`)
        } catch (e) {
            console.error(e)
            message.channel.send({content: `${emojis.negativo} | Ha ocurrido un error`})
            try {
                message.author
                    .catch(e)
            } catch (e) {}
        }
    }
}
