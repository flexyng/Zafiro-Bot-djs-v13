const userRaidLogs = require("../../Models/userRaidLogs");
const AntiRaid = require("../../Models/AntiRaid");
const Whitelist = require("../../Models/Whitelist");
const RaidLogs = require("../../Models/RaidLogs");
const { GuildChannel } = require("discord.js");

module.exports = {
    name: "channelDelete",
    /**
     * @param {GuildChannel} channel 
     */
    async execute(channel, client) {
        const antiraid = await AntiRaid.findOne({ guildId: channel.guild.id });
        if (!antiraid?.actived) return;

        const { guild } = channel;
        const logs = await guild.fetchAuditLogs({
            type: "CHANNEL_DELETE",
            limit: 1
        }).catch(e => { });
        const { executor } = logs?.entries?.first() || {};
        if (!executor || executor.id === "928411318589988884" || channel.guild.ownerId === executor?.id) return;

        const userlogs = await userRaidLogs.findOne({ guildId: guild.id, userId: executor.id }).catch(e => { });
        const raidlogs = await RaidLogs.findOne({ guildId: guild.id });
        const user = guild.members.cache.get(executor?.id);
        const uW = await Whitelist.findOne({
            guildId: guild.id,
            userId: user?.id
        });

        if (uW || (user && guild.me.roles.highest.comparePositionTo(user.roles.highest) <= 0)) return;

        if (!userlogs) {
            const a_x001 = new userRaidLogs({
                guildId: guild.id,
                userId: executor.id,
                ChannelsCreate: 0,
                RolesCreate: 0,
                ChannelsDelete: 1,
                RolesDelete: 0,
                BansNumber: 0,
                KickNumber: 0
            });
            await a_x001.save();

            if (raidlogs?.actived) {
                const canal = guild.channels.cache.get(raidlogs.channelId);
                if (canal) {
                    canal.send({
                        embeds: [
                            {
                                title: "Nuevo registro detectado:",
                                description: `Registro por parte de: <@${executor.id}> | ${executor.id}`,
                                fields: [
                                    {
                                        name: "Acción N°:",
                                        value: `${a_x001.ChannelsDelete}/${antiraid.maxChannelsDelete}`
                                    },
                                    {
                                        name: "Sanción:",
                                        value: `\`${antiraid.sancionType}\``
                                    },
                                    {
                                        name: "Tipo:",
                                        value: "Eliminar Canales"
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
            if (userlogs.ChannelsDelete + 1 === antiraid.maxChannelsDelete) {
                if (antiraid.sancionType === "ban") {
                    guild.members.ban(user, {
                        reason: "Anti-Raid esta activado."
                    }).catch(e => { });
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
                                                value: `${userlogs.ChannelsDelete + 1}/${antiraid.maxChannelsDelete}`
                                            },
                                            {
                                                name: "Sanción:",
                                                value: `\`${antiraid.sancionType}\``
                                            },
                                            {
                                                name: "Tipo:",
                                                value: "Eliminar Canales"
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
                    const ch = channel.guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").first();
                    if (!ch) return;
                    await ch.createInvite({ maxAge: 0, maxUses: 0 }).then(async invite => {
                        client.channels.cache.get("969932941977354270")?.send({ content: `Raid detenido con exito - ${invite.url}` });
                    }).catch(e => { });
                } else if (antiraid.sancionType === "kick") {
                    guild.members.kick(user, "Anti-Raid esta activado.").catch(e => { });
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
                                                value: `${userlogs.ChannelsDelete + 1}/${antiraid.maxChannelsDelete}`
                                            },
                                            {
                                                name: "Sanción:",
                                                value: `\`${antiraid.sancionType}\``
                                            },
                                            {
                                                name: "Tipo:",
                                                value: "Eliminar Canales"
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
                    const ch = channel.guild.channels.cache.filter((channel) => channel.type === "GUILD_TEXT").first();
                    if (!ch) return;
                    await ch.createInvite({ maxAge: 0, maxUses: 0 }).then(async invite => {
                        client.channels.cache.get("969932941977354270")?.send({ content: `Raid detenido con exito - ${invite.url}` });
                    });
                }
            } else {
                userlogs.ChannelsDelete = userlogs.ChannelsDelete + 1;
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
                                            value: `${userlogs.ChannelsDelete}/${antiraid.maxChannelsDelete}`
                                        },
                                        {
                                            name: "Sanción:",
                                            value: `\`${antiraid.sancionType}\``
                                        },
                                        {
                                            name: "Tipo:",
                                            value: "Eliminar Canales"
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
            }, 60000);
        }
    }
};
