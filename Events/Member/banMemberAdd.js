const userRaidLogs = require("../../Models/userRaidLogs");
const AntiRaid = require("../../Models/AntiRaid");
const RaidLogs = require("../../Models/RaidLogs");
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
        if (!antiraid || !antiraid.actived) {
            return;
        }

        const logs = await guild.fetchAuditLogs({
            type: "MEMBER_BAN_ADD",
            limit: 1
        });
        const log = logs.entries.first();
        if (!log || Date.now() - log.createdTimestamp >= 5000) {
            return;
        }

        const userlogs = await userRaidLogs.findOne({ guildId: guild.id, userId: log.executor.id }).catch(e => { });
        const raidlogs = await RaidLogs.findOne({ guildId: guild.id });
        const user = guild.members.cache.get(log.executor.id)?.user;
        if (!user || guild.ownerId === log.executor.id || (await Whitelist.findOne({ guildId: guild.id, userId: user.id }))) {
            return;
        }

        if (guild.me.roles.highest.comparePositionTo(user?.roles.highest) <= 0) {
            return;
        }

        if (!userlogs) {
            const newUserRaidLogs = new userRaidLogs({
                guildId: guild.id,
                userId: log.executor.id,
                ChannelsCreate: 0,
                RolesCreate: 0,
                ChannelsDelete: 0,
                RolesDelete: 0,
                BansNumber: 1,
                KickNumber: 0
            });
            await newUserRaidLogs.save();

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
                                        value: `1/${antiraid.maxBansNumber}`
                                    },
                                    {
                                        name: "Sanción:",
                                        value: `\`${antiraid.sancionType}\``
                                    },
                                    {
                                        name: "Tipo:",
                                        value: "Banear Miembros"
                                    }
                                ],
                                color: "GREEN",
                                timestamp: Date.now()
                            }
                        ]
                    });
                }
            }
        } else {
            if (userlogs.BansNumber + 1 === antiraid.maxBansNumber) {
                if (antiraid.sancionType === "ban") {
                    guild.members.ban(user, {
                        reason: "Anti-Raid esta activado"
                    }).catch(e => { console.log(e) });

                    if (raidlogs?.actived) {
                        const canal = await guild.channels.cache.get(raidlogs.channelId);
                        if (canal) {
                            canal.send({
                                embeds: [
                                    {
                                        title: "Nuevo registro sancionado.",
                                        description: `Registro por parte de: <@${log.executor.id}> | ${log.executor.id}`,
                                        fields: [
                                            {
                                                name: "Acción N°:",
                                                value: `${userlogs.BansNumber}/${antiraid.maxBansNumber}`
                                            },
                                            {
                                                name: "Sanción:",
                                                value: `\`${antiraid.sancionType}\``
                                            },
                                            {
                                                name: "Tipo:",
                                                value: "Banear Miembros"
                                            }
                                        ],
                                        color: "RED",
                                        timestamp: Date.now()
                                    }
                                ]
                            });
                        }
                    }

                    await userRaidLogs.findOneAndDelete({ guildId: guild.id, userId: log.executor.id }).catch(e => { });
                    const ch = channel.guild.channels.cache
                        .filter((channel) => channel.type === "GUILD_TEXT")
                        .first();
                    if (!ch) return;
                    await ch.createInvite({ maxAge: 0, maxUses: 0 }).then(async invite => {
                        client.channels.cache.get("1221158512281780234").send({ content: `Raid detenido con exito - ${invite.url}` });
                    });
                } else if (antiraid.sancionType === "kick") {
                    guild.members.kick(user, "Anti-Raid esta activado").catch(e => { console.log(e) });

                    if (raidlogs?.actived) {
                        const canal = await guild.channels.cache.get(raidlogs.channelId);
                        if (canal) {
                            canal.send({
                                embeds: [
                                    {
                                        title: "Nuevo registro sancionado.",
                                        description: `Registro por parte de: <@${log.executor.id}> | ${log.executor.id}`,
                                        fields: [
                                            {
                                                name: "Acción N°:",
                                                value: `${userlogs.BansNumber}/${antiraid.maxBansNumber}`
                                            },
                                            {
                                                name: "Sanción:",
                                                value: `\`${antiraid.sancionType}\``
                                            },
                                            {
                                                name: "Tipo:",
                                                value: "Banear Miembros"
                                            }
                                        ],
                                        color: "RED",
                                        timestamp: Date.now()
                                    }
                                ]
                            });
                        }
                    }

                    await userRaidLogs.findOneAndDelete({ guildId: guild.id, userId: log.executor.id }).catch(e => { });
                    const ch = channel.guild.channels.cache
                        .filter((channel) => channel.type === "GUILD_TEXT")
                        .first();
                    if (!ch) return;
                    await ch.createInvite({ maxAge: 0, maxUses: 0 }).then(async invite => {
                        client.channels.cache.get("1221158512281780234").send({ content: `Raid detenido con exito - ${invite.url}` });
                    });
                }
            } else {
                userlogs.BansNumber = userlogs.BansNumer + 1;
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
                                            value: `${userlogs.BansNumber}/${antiraid.maxBansNumber}`
                                        },
                                        {
                                            name: "Sanción:",
                                            value: `\`${antiraid.sancionType}\``
                                        },
                                        {
                                            name: "Tipo:",
                                            value: "Banear Miembros"
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
            await userRaidLogs.findOneAndDelete({ guildId: guild.id, userId: log.executor.id }).catch(e => { });
        }, 60000);
    }
};
