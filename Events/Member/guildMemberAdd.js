const { Client, GuildMember, MessageEmbed } = require("discord.js");
const Muted = require("../../Models/Muted");
const MutedRole = require("../../Models/MutedRole");

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Client} client
     * @param {GuildMember} member
     */
    async execute(member) {
        if (member.guild.id !== "866670008201773067") {
            return;
        }

        const channel = await member.guild.channels.cache.get("965584595934396450");
        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
            .setDescription(`Bienvenido ${member} a $AK, ten una linda estancia y espero que tus servidores queden protegidos todo el tiempo :)\n > Puedes pasarte por los canales <#965584596353839177> y <#988105340883173467> para estar bien informado\n\n \`Att: Chido Security\``)
            .setColor("AQUA")
            .setTimestamp();

        channel.send({ content: `${member}`, embeds: [embed] });
    }
};
