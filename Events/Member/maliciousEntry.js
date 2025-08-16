const Blacklist = require("../../Models/Blacklist");
const Malicious = require("../../Models/Malicious");
const { Client, GuildMember, MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        const { guild } = member;
        const { user } = member;
        const userblk = await Blacklist.findOne({ userId: user?.id });
        const malicious = await Malicious.findOne({ guildId: guild.id });
        if (userblk) {
            if (!malicious) {
                return;
            }
            if (!malicious?.actived) {
                return;
            }
            if (malicious?.punishment === "Marcar") {
                member.edit({
                    nick: userblk.razon
                }).catch(e => { });
                const embed = new MessageEmbed()
                    .setTitle("`📢⛔` - Detección de maliciosos")
                    .setDescription(`\`{📢}\` **|** He detectado a \`${user.tag}\` como un usuario malicioso, la razón de la blacklist que encontré es: \`${userblk.razon}\`.\n\`{✅}\` **|** Logré \`Marcar\` al sujeto con éxito!\n\n\`-\` Enviado desde: \`${guild.name}\``)
                    .setURL(" https://discord.gg/SUM6mc7Ye3")
                    .setColor(9215)
                    .setFooter("Chido Security")
                    .setTimestamp();
                const owner = client.users.cache.get(guild.ownerId);
                if (owner) {
                    owner.send({ embeds: [embed] }).catch(e => { });
                }
                malicious.lastMaliciousDetected = user.tag;
                await malicious.save();
            } else if (malicious?.punishment === "Expulsar") {
                if (member.kickable) {
                    member.kick('Anti-Maliciosos activado.');
                    const embed = new MessageEmbed()
                        .setTitle("`📢⛔` - Detección de maliciosos")
                        .setDescription(`\`{📢}\` **|** He detectado a \`${user.tag}\` como un usuario malicioso, la razón de la blacklist que encontré es: \`${userblk.razon}\`.\n\`{✅}\` **|** Logré \`Expulsar\` al sujeto con éxito!\n\n\`-\` Enviado desde: \`${guild.name}\``)
                        .setURL(" https://discord.gg/SUM6mc7Ye3")
                        .setColor(9215)
                        .setFooter("Zafiro Bot")
                        .setTimestamp();
                    const owner = client.users.cache.get(guild.ownerId);
                    if (owner) {
                        owner.send({ embeds: [embed] }).catch(e => { });
                    }
                    malicious.lastMaliciousDetected = user.tag;
                    await malicious.save();
                } else {
                    return;
                }
            } else if (malicious?.punishment === "Banear") {
                if (member.bannable) {
                    member.ban({
                        reason: 'Anti-Maliciosos activado.'
                    });
                    const embed = new MessageEmbed()
                        .setTitle("`📢⛔` - Detección de maliciosos")
                        .setDescription(`\`{📢}\` **|** He detectado a \`${user.tag}\` como un usuario malicioso, la razón de la blacklist que encontré es: \`${userblk.razon}\`.\n\`{✅}\` **|** Logré \`Banear\` al sujeto con éxito!\n\n\`-\` Enviado desde: \`${guild.name}\``)
                        .setURL("https://discord.gg/SUM6mc7Ye3")
                        .setColor(9215)
                        .setFooter("Zafiro Bot")
                        .setTimestamp();
                    const owner = client.users.cache.get(guild.ownerId);
                    if (owner) {
                        owner.send({ embeds: [embed] }).catch(e => { });
                    }
                    malicious.lastMaliciousDetected = user.tag;
                    await malicious.save();
                } else {
                    return;
                }
            } else {
                return;
            }
        }
    }
};
