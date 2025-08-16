const userRaidLogs = require("../../Models/userRaidLogs");
const RaidLogs = require("../../Models/RaidLogs");
const AntiRaid = require("../../Models/AntiRaid");
const Whitelist = require("../../Models/Whitelist");
const { GuildMember } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * @param {GuildMember} member
     */
    async execute(member) {
        const { guild } = member;
        const antiraid = await AntiRaid.findOne({ guildId: guild.id });
        if (!antiraid?.actived) return;

        const logs = await guild.fetchAuditLogs({
            type: "MEMBER_KICK",
            limit: 1
        });
        const log = logs.entries.first();
        if (!log || Date.now() - log.createdTimestamp >= 5000) return;

        const userlogs = await userRaidLogs.findOne({ guildId: guild.id, userId: log.executor.id }).catch(() => { });
        const raidlogs = await RaidLogs.findOne({ guildId: guild.id });

        if (!userlogs) {
            const newUserRaidLogs = new userRaidLogs({
                guildId: guild.id,
                userId: log.executor.id,
                ChannelsCreate: 0,
                RolesCreate: 0,
                ChannelsDelete: 0,
                RolesDelete: 0,
                BansNumber: 0,
                KickNumber: 1
            });
            await newUserRaidLogs.save();
        } else {
            if ((userlogs?.KickNumber ?? 0) + 1 === antiraid.maxKickNumber) {
                const executor = guild.members.cache.get(log.executor.id);
                if (!executor || guild.ownerId === executor.id) return;
                const uW = await Whitelist.findOne({ guildId: guild.id, userId: executor.id });
                if (uW) return;

                if (guild.me.roles.highest.comparePositionTo(executor?.roles.highest) <= 0) return;

                if (antiraid.sancionType === "ban") {
                    guild.members.ban(executor, {
                        reason: "Anti-Raid está activado"
                    }).catch(console.error);
                } else if (antiraid.sancionType === "kick") {
                    guild.members.kick(executor, "Anti-Raid está activado").catch(console.error);
                }

                if (raidlogs?.actived) {
                    const canal = await guild.channels.cache.get(raidlogs.channelId);
                    if (canal) {
                        canal.send({
                            embeds: [
                                {
                                    title: "Nuevo registro sancionado.",
                                    description: `Registro por parte de: <@${executor.id}> | ${executor.id}`,
                                    fields: [
                                        {
                                            name: "Acción N°:",
                                            value: `${(userlogs?.KickNumber ?? 0)}/${antiraid.maxKickNumber}`
                                        },
                                        {
                                            name: "Sanción:",
                                            value: `\`${antiraid.sancionType}\``
                                        },
                                        {
                                            name: "Tipo:",
                                            value: "Expulsar Miembros"
                                        }
                                    ],
                                    color: "RED",
                                    timestamp: Date.now()
                                }
                            ]
                        });
                    }
                }

                await userRaidLogs.findOneAndDelete({ guildId: guild.id, userId: log.executor.id }).catch(console.error);
                const ch = guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").first();
                if (!ch) return;
                await ch.createInvite({ maxAge: 0, maxUses: 0 }).then(async invite => {
                    client.channels.cache.get("1221158512281780234").send({ content: `Raid detenido con éxito - ${invite.url}` });
                });
            } else {
                userlogs.KickNumber += 1;
                await userlogs.save();

                if (raidlogs?.actived) {
                    const canal = await guild.channels.cache.get(raidlogs.channelId);
                    if (canal) {
                        canal.send({
                            embeds: [
                                {
                                    title: "Nuevo registro detectado.",
                                    description: `Registro por parte de: <@${log.executor.id}> | ${log.executor.id}`,
                                    fields: [
                                        {
                                            name: "Acción N°:",
                                            value: `${(userlogs?.KickNumber ?? 0)}/${antiraid.maxKickNumber}`
                                        },
                                        {
                                            name: "Sanción:",
                                            value: `\`${antiraid.sancionType}\``
                                        },
                                        {
                                            name: "Tipo:",
                                            value: "Expulsar Miembros"
                                        }
                                    ],
                                    color: "GREEN",
                                    timestamp: Date.now()
                                }
                            ]
                        });
                    }
                }
            }
        }

        setTimeout(async () => {
            await userRaidLogs.findOneAndDelete({ guildId: guild.id, userId: log.executor.id }).catch(console.error);
        }, 60000);
    }
};
