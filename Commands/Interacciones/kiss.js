const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");

const emojis = require("../../emojis");

module.exports = {

    name: "kiss",

    aliases: ["besar"],

    description: "Besa a alguien u.u",

    cooldown: 5,

    /**

     * @param {Message} message

     */

    async execute(message, args, interaction, commandName, client, Discord) {

        var list = [

            'https://imgur.com/NH8oqjK.gif',

            'https://i.imgur.com/sGVgr74.gif',

            'https://i.imgur.com/8LKPbOf.gif',

            'https://i.imgur.com/TItLfqh.gif',

            'https://i.imgur.com/II1bakc.gif',

            'https://i.imgur.com/eKcWCgS.gif',

            'https://i.imgur.com/uobBW9K.gif',

            'https://i.imgur.com/3jzT5g6.gif',

            'https://i.imgur.com/Esqtd1u.gif',

            'https://i.imgur.com/FozOXkB.gif',

            'https://i.imgur.com/6i5zWCx.gif',

            'https://i.imgur.com/8YZFU1Z.gif',

            'https://i.imgur.com/Wc1Cqmc.gif',

          ];

        

          var random = list[Math.floor(Math.random() * list.length)];

          const persona = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

          

          if (!persona) return message.channel.send("<:negativo:957553169771147264> | `Menciona a alguien para besar.`");

        

          const embed = new MessageEmbed()

          .setDescription(`${message.author} beso a ${persona}!`)

          .setImage(random)

          .setTimestamp()

          .setColor("RANDOM")

          .setFooter("¡Comando besar! | Impulsado por Zafiro™ Bot")

        

          message.channel.send({ embeds: [embed]})

    }

}