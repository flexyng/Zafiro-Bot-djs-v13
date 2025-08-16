const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const Blacklist = require("../../Models/Blacklist");
const emojis = require("../../emojis");
const moment = require("moment"); 
const ms = require("ms");
const package = require("../../package.json");

module.exports = {
    name: "team",
    aliases: ["tm"],
    description: "Ve mi equipo",
    cooldown: 3,
    /**
     * @param {Message} message
     */
    async execute(message, args, commandName, client, Discord) {
        
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail("https://cdn.discordapp.com/attachments/1085808487235338270/1086587845742968912/standard.gif")
        .setTitle("<:emoji_17:1190024333658173450> Zafiro Team")
        .addFields(
            { name: '<:emoji_10:1189909429081096283> | **Directiva:**', value: '> `Clasifed` & `Dymidless`'},
            { name: '\u200B', value: '\u200B' },
            { name: '<:emoji_21:1190228233011085372> | **Desarrolladores:**', value: ' `clasifed` & `Dymidless`', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: '<:emoji_2:1189906925136130058> | **Personal:**', value: '> `...` & `lfcx`', inline: true },
        )
        .setImage("https://cdn.discordapp.com/attachments/1086698020550230206/1087412879130628106/standard_1.gif")
	    .setFooter({ text: '¡Información de mi Staff! | Impulsado por Zafiro™', iconURL: 'https://media.discordapp.net/attachments/1020208092505452574/1031157043190562846/SPOILER_1665211054-icon.png?width=663&height=663' });
        message.channel.send({embeds: [embed]})
    }
}
