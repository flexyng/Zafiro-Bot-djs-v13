const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const emojis = require("../../emojis");
const GBC = require("../../Models/GuildBackupCreate");
const Premium = require("../../Models/UserPremium");
const backup = require("discord-backup");

module.exports = {
    name: "backup-list",
    aliases: ["servidor-list"],
    description: "Obtén todas tus backups",
    cooldown: 2,
    /**
     * @param {Message} message
     * @param {Client} Client
     */
    async execute(message, args, commandName, client, Discord, prefix) {
        const UserIsPremium = await Premium.findOne({ userId: message.author.id });
        if(!UserIsPremium) {
            return message.channel.send({ content: `${emojis.negativo} | Este comando es de uso **premium**!, unete a nuestro servidor de soporte para más información: https://discord.gg/SUM6mc7Ye3 `});
        }
        const backups = await GBC.find({ authorId: message.author.id });
        let backupList;
        if(backups.length <= 0) {
            backupList = "\`\`\`¡No tienes backups!\`\`\`"
        } else {
            backupList = backups.map((b, i) => `**${i+1}. -** \`${b.backupId}\` **|** \`${b.guildName}\``).join("\n");
        }
        const Embed = new MessageEmbed()
        .setColor("BLUE")
        .setFooter("Backup Sistem | ¡Impulsado por Zafiro™Bot!")
        .setTimestamp()
        .setTitle("Tus backups:")
        .setDescription(`${backupList}`)

        message.channel.send({ embeds: [Embed] })
    }
}