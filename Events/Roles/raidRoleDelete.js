const userRaidLogs = require("../../Models/userRaidLogs");
const AntiRaid = require("../../Models/AntiRaid");
const RaidLogs = require("../../Models/RaidLogs");
const { Role, Client } = require("discord.js");
const Whitelist = require("../../Models/Whitelist");

module.exports = {
    name: "roleDelete",
    /**
     * 
     * @param {Role} role 
     * @param {Client} client 
     */
    async execute(role, client) {
        const { guild } = role;
        const antiraid = await AntiRaid.findOne({ guildId: guild.id });
        if (!antiraid) {
            return;
        }

        const logs = await guild.fetchAuditLogs({
            type: "ROLE_DELETE",
            limit: 1
        }).catch(e => { });

        if (!logs) return;

        const log = logs.entries.first();
        const { executor } = log || {};

        if (!log || guild.ownerId === executor?.id) {
            return;
        }

        const uW = await Whitelist.findOne({
            guildId: guild.id,
            userId: executor?.id
        });

        if (uW || !executor) {
            return;
        }

        const user = guild.members.cache.get(executor.id);
        const userlogs = await userRaidLogs.findOne({ guildId: guild.id, userId: executor.id });
        const raidlogs = await RaidLogs.findOne({ guildId: guild.id });

        if (!userlogs) {
            const x_001 = new userRaidLogs({
                guildId: guild.id,
                userId: executor.id,
                ChannelsCreate: 0,
                RolesCreate: 0,
                ChannelsDelete: 0,
                RolesDelete: 1,
                BansNumber: 0,
                KickNumber: 0
            });
            await x_001.save();

            if (raidlogs?.actived) {
                const canal = guild.channels.cache.get(raidlogs.channelId);

                if (canal) {
                    canal.send({
                        embeds: [
                            {
                                title: "Nuevo registro detectado.",
                                description: `Registro por parte de: <@${executor.id}> | ${executor.id}`,
                                fields: [
                                    {
                                        name: "Acción N°:",
                                        value: `${x_001.RolesDelete}/${antiraid.maxRolesDelete}`
                                    },
                                    {
                                        name: "Sanción:",
                                        value: `\`${antiraid.sancionType}\``
                                    },
                                    {
                                        name: "Tipo:",
                                        value: "Eliminar Roles"
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
            if (userlogs.RolesDelete + 1 === antiraid.maxRolesDelete) {
                if (antiraid.sancionType === "ban") {
                    guild.members.ban(user, {
                        reason: "Anti-Raid esta activado"
                    }).catch(e => console.log(e));

                    if (raidlogs?.actived) {
                        const canal = guild.channels.cache.get(raidlogs.channelId);

                        if (canal) {
                            canal.send({
                                embeds: [
                                    {
                                        title: "Nuevo registro sancionado.",
                                        description: `Registro por parte de: <@${executor.id}> | ${executor.id}`,
                                        fields: [
                                            {
                                                name: "Acción N°:",
                                                value: `${userlogs.RolesDelete + 1}/${antiraid.maxRolesDelete}`
                                            },
                                            {
                                                name: "Sanción:",
                                                value: `\`${antiraid.sancionType}\``
                                            },
                                            {
                                                name: "Tipo:",
                                                value: "Eliminar Roles"
                                            }
                                        ],
                                        color: "RED",
                                        timestamp: Date.now()
                                    }
                                ]
                            });
                        }
                    }
                    await userRaidLogs.findOneAndDelete({ guildId: guild.id, userId: executor.id }).catch(e => { });
                } else if (antiraid.sancionType === "kick") {
                    guild.members.kick(user, "Anti-Raid esta activado").catch(e => console.log(e));

                    if (raidlogs?.actived) {
                        const canal = guild.channels.cache.get(raidlogs.channelId);

                        if (canal) {
                            canal.send({
                                embeds: [
                                    {
                                        title: "Nuevo registro sancionado.",
                                        description: `Registro por parte de: <@${executor.id}> | ${executor.id}`,
                                        fields: [
                                            {
                                                name: "Acción N°:",
                                                value: `${userlogs.RolesDelete + 1}/${antiraid.maxRolesDelete}`
                                            },
                                            {
                                                name: "Sanción:",
                                                value: `\`${antiraid.sancionType}\``
                                            },
                                            {
                                                name: "Tipo:",
                                                value: "Eliminar Roles"
                                            }
                                        ],
                                        color: "RED",
                                        timestamp: Date.now()
                                    }
                                ]
                            });
                        }
                    }
                    await userRaidLogs.findOneAndDelete({ guildId: guild.id, userId: executor.id }).catch(e => { });
                }
            } else {
                userlogs.RolesDelete = userlogs.RolesDelete + 1;
                await userlogs.save();

                if (raidlogs?.actived) {
                    const canal = guild.channels.cache.get(raidlogs.channelId);

                    if (canal) {
                        canal.send({
                            embeds: [
                                {
                                    title: "Nuevo registro detectado.",
                                    description: `Registro por parte de: <@${executor.id}> | ${executor.id}`,
                                    fields: [
                                        {
                                            name: "Acción N°:",
                                            value: `${userlogs.RolesDelete}/${antiraid.maxRolesDelete}`
                                        },
                                        {
                                            name: "Sanción:",
                                            value: `\`${antiraid.sancionType}\``
                                        },
                                        {
                                            name: "Tipo:",
                                            value: "Eliminar Roles"
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
            setTimeout(async () => {
                await userRaidLogs.findOneAndDelete({ guildId: guild.id, userId: executor.id }).catch(e => { });
            }, 60000)
        }
    }
}
