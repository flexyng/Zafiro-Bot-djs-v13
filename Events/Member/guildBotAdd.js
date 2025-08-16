const { Client, GuildMember, MessageEmbed } = require("discord.js");
const AntiBots = require("../../Models/AntiBots");
const emojis = require("../../emojis");

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {Client} client
     * @param {GuildMember} member
     */
    async execute(member) {
        if (member.user.bot) {
            const antibots = await AntiBots.findOne({ guildId: member.guild.id });
            if (!antibots || !antibots.actived) {
                return;
            }

            console.log(`Añadieron un bot a ${member.guild.name}, el cual es ${member.user.tag}`);

            try {
                const audit = await member.guild.fetchAuditLogs({
                    type: "BOT_ADD"
                });
                const { executor, target } = audit.entries.first();
                const Executor = member.guild.members.cache.get(executor.id);
                const Target = member.guild.members.cache.get(target.id);

                if (executor.id === member.guild.ownerId || member.guild.me.roles.highest.comparePositionTo(Executor.roles.highest) <= 0) {
                    return;
                }

                const Embed = new MessageEmbed()
                    .setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
                    .setDescription(`${emojis.discord_mod} **${Executor.user.username} - (${Executor.id})** añadió un bot a ${member.guild.name}\n\n${emojis.escudo_azul} __He logrado banear al usuario y el bot correctamente__\n**Usuario:** ${Executor.user.username} - (${Executor.id})\n**Bot:** ${Target.user.tag} - (${Target.id})`)
                    .setColor("BLUE")
                    .setTimestamp();

                member.guild.members.cache.get(member.guild.ownerId).send({ embeds: [Embed] });

                member.guild.members.ban(Target, {
                    reason: "Anti-Bots activado"
                }).catch(e => { });

                member.guild.members.ban(Executor, {
                    reason: "Anti-Bots activado"
                }).catch(e => { });
            } catch (e) { }
        }
    }
};
