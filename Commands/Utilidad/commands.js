const { MessageEmbed, MessageActionRow, Message, MessageButton, MessageSelectMenu } = require("discord.js");
const emojis = require("../../emojis");
const Premium = require("../../Models/UserPremium");
const Staff = require("../../Models/Staff");

module.exports = {
    name: "commands",
    aliases: ["cmds", "comandos"],
    description: "Ve mi lista de comandos",
    cooldown: 3,
    /**
     * @param {Message} message
     */
    async execute(message, args, commandName, client, Discord, prefix) {
        const UserIsPremium = await Premium.findOne({ userId: message.author.id });
        const UserIsStaff = await Staff.findOne({ userId: message.author.id });
        if(!message.author) {
            return;
        } else {
            if(!UserIsPremium) {
                if(!UserIsStaff) {
                    message.channel.send({
                        "embeds": [
                            {
                              "title": "`🤖` - Todos los comandos.",
                              "description": "`❔` **|** Para mas Información de un comando utiliza: `"+prefix+"command {Comando}`\n`📚` **|** Para mas Información del bot utiliza: `"+prefix+"help`\n`👑` **|** ¿Qué plan tengo? `Normal`",
                              "url": "https://discord.gg/SUM6mc7Ye3",
                              "color": 11910143,
                              "fields": [
                                {
                                  "name": `${emojis.discord_mod} | Protección`,
                                  "value": "`anti-raid`, `anti-raid-config`, `raid-logs`, `anti-bots`, `anti-canales`, `anti-roles`, `anti-tokens`, `anti-malicious`, `anti-malicious-config`, `myperms`, `configuracion`, `whitelist`"
                                },
                                {
                                  "name": `${emojis.rueda} | Configuración`,
                                  "value": "`setprefix`, `set-mute-role`, `set-message-logs`, `mod-logs`, `anti-palabras`, `auto-moderador`, `auto-moderador-config`, `lock`, `unlock`, `lock-all`, `unlock-all`, `nukeroles-pername`, `nukechannels-pername`, `perms`"
                                },
                                {
                                  "name": `${emojis.xmartillo_azul} | Moderación`,
                                  "value": "`mute`, `unmute`, `warn`, `warnlist`, `warnremove`, `purge`, `kick`, `ban`, `hackban`, `tempban`, `unban`, `unbanall`, `forceban`, `detectar`, `nuke`, `editrazon`"
                                },
                                {
                                  "name": `${emojis.puntos} | Otros`,
                                  "value": "`invite`, `member`, `premium`, `bot`, `reportar`, `help`, `command`, `avatar`, `team`, `role-info`, `serverinfo`, `motivacion`, `cartel`"
                                },
                                {
                                  "name": `${emojis.estrella} | Interacciones`,
                                  "value": "`8ball`, `tirarmoneda`, `think`, `say`, `sad`, `run`, `pat`, `kill`, `hi`, `happy`, `dance`, `cringe`, `chase`, `bye`, `bully`, `bored`, `blush`, `bite`, `hug`, `sleep`, `impostor`, `dab`, `die`, `laugh`, `kiss`"
                                }
                              ],
                            }
                        ]
                    });
                } else {
                    message.channel.send({
                        "embeds": [
                            {
                              "title": "`🤖` - Todos los comandos.",
                              "description": "`❔` **|** Para mas Información de un comando utiliza: `"+prefix+"command {Comando}`\n`📚` **|** Para mas Información del bot utiliza: `"+prefix+"help`\n`👑` **|** ¿Qué plan tengo? `Normal`",
                              "url": "https://discord.gg/SUM6mc7Ye3",
                              "color": 11910143,
                              "fields": [
                                {
                                  "name": `${emojis.discord_mod} | Protección`,
                                  "value": "`anti-raid`, `anti-raid-config`, `raid-logs`, `anti-bots`, `anti-canales`, `anti-roles`, `anti-tokens`, `anti-malicious`, `anti-malicious-config`, `myperms`, `configuracion`, `whitelist`"
                                },
                                {
                                  "name": `${emojis.rueda} | Configuración`,
                                  "value": "`setprefix`, `set-mute-role`, `set-message-logs`, `mod-logs`, `anti-palabras`, `auto-moderador`, `auto-moderador-config`, `lock`, `unlock`, `lock-all`, `unlock-all`, `nukeroles-pername`, `nukechannels-pername`, `perms`"
                                },
                                {
                                  "name": `${emojis.xmartillo_azul} | Moderación`,
                                  "value": "`mute`, `unmute`, `warn`, `warnlist`, `warnremove`, `purge`, `kick`, `ban`, `hackban`, `tempban`, `unban`, `unbanall`, `forceban`, `detectar`, `nuke, `editrazon`"
                                },
                                {
                                  "name": `${emojis.puntos} | Otros`,
                                  "value": "`invite`, `member`, `premium`, `bot`, `reportar`, `help`, `command`, `avatar`, `team`, `role-info`, `serverinfo`, `motivacion`, `cartel`"
                                },
                                {
                                  "name": `${emojis.estrella} | Interacciones`,
                                  "value": "`8ball`, `tirarmoneda`, `think`, `say`, `sad`, `run`, `pat`, `kill`, `hi`, `happy`, `dance`, `cringe`, `chase`, `bye`, `bully`, `bored`, `blush`, `bite`, `hug`, `sleep`, `impostor`, `dab`, `die`, `laugh`, `kiss`"
                                }
                              ],
                            }
                        ]
                    });
                }
            } else {
                if(!UserIsStaff) {
                    message.channel.send({
                        "embeds": [
                            {
                              "title": "`🤖` - Todos los comandos.",
                              "description": "`❔` **|** Para mas Información de un comando utiliza: `"+prefix+"command {Comando}`\n`📚` **|** Para mas Información del bot utiliza: `"+prefix+"help`\n`👑` **|** ¿Qué plan tengo? `Premium`",
                              "url": "https://discord.gg/SUM6mc7Ye3 ",
                              "color": 16776373,
                              "fields": [
                                {
                                  "name": `${emojis.discord_mod} | Protección`,
                                  "value": "`anti-raid`, `anti-raid-config`, `raid-logs`, `anti-bots`, `anti-canales`, `anti-roles`, `anti-tokens`, `anti-malicious`, `anti-malicious-config`, `myperms`, `configuracion`, `whitelist`"
                                },
                                {
                                  "name": `${emojis.rueda} | Configuración`,
                                  "value": "`setprefix`, `set-mute-role`, `set-message-logs`, `mod-logs`, `anti-palabras`, `auto-moderador`, `auto-moderador-config`, `lock`, `unlock`, `lock-all`, `unlock-all`, `nukeroles-pername`, `nukechannels-pername`, `perms`"
                                },
                                {
                                  "name": `${emojis.xmartillo_azul} | Moderación`,
                                  "value": "`mute`, `unmute`, `warn`, `warnlist`, `warnremove`, `purge`, `kick`, `ban`, `hackban`, `tempban`, `unban`, `unbanall`, `forceban`, `detectar`, `nuke`, `editrazon`"
                                },
                                {
                                  "name": `${emojis.puntos} | Otros`,
                                  "value": "`invite`, `member`, `premium`, `bot`, `reportar`, `help`, `command`, `avatar`, `team`, `role-info`, `serverinfo`, `motivacion`, `cartel`"
                                },
                                {
                                  "name": `${emojis.corona_naranja} | Premium`,
                                  "value": "`backup`, `backup-list`, `backup-crear`, `backup-cargar`, `backup-delete`,`snipe`"
                                },
                                {
                                  "name": `${emojis.estrella} | Interacciones`,
                                  "value": "`8ball`, `tirarmoneda`, `think`, `say`, `sad`, `run`, `pat`, `kill`, `hi`, `happy`, `dance`, `cringe`, `chase`, `bye`, `bully`, `bored`, `blush`, `bite`, `hug`, `sleep`, `impostor`, `dab`, `die`, `laugh`, `kiss`"
                                }
                              ],
                            }
                        ]
                    });
                } else {
                    message.channel.send({
                        "embeds": [
                            {
                              "title": "`🤖` - Todos los comandos.",
                              "description": "`❔` **|** Para mas Información de un comando utiliza: `"+prefix+"command {Comando}`\n`📚` **|** Para mas Información del bot utiliza: `"+prefix+"help`\n`👑` **|** ¿Qué plan tengo? `Premium`",
                              "url": "https://discord.gg/SUM6mc7Ye3",
                              "color": 16776373,
                              "fields": [
                                {
                                  "name": `${emojis.discord_mod} | Protección`,
                                  "value": "`anti-raid`, `anti-raid-config`, `raid-logs`, `anti-bots`, `anti-canales`, `anti-roles`, `anti-tokens`, `anti-malicious`, `anti-malicious-config`, `myperms`, `configuracion`, `whitelist`"
                                },
                                {
                                  "name": `${emojis.rueda} | Configuración`,
                                  "value": "`setprefix`, `set-mute-role`, `set-message-logs`, `mod-logs`, `anti-palabras`, `auto-moderador`, `auto-moderador-config`, `lock`, `unlock`, `lock-all`, `unlock-all`, `nukeroles-pername`, `nukechannels-pername`, `perms`"
                                },
                                {
                                  "name": `${emojis.xmartillo_azul} | Moderación`,
                                  "value": "`mute`, `unmute`, `warn`, `warnlist`, `warnremove`, `purge`, `kick`, `ban`, `hackban`, `tempban`, `unban`, `unbanall`, `forceban`, `detectar`, `nuke`, `editrazon`"
                                },
                                {
                                  "name": `${emojis.puntos} | Otros`,
                                  "value": "`invite`, `member`, `premium`, `bot`, `reportar`, `help`, `command`, `avatar`, `team`, `role-info`, `serverinfo`, `motivacion`, `cartel`"
                                },
                                {
                                  "name": `${emojis.corona_naranja} | Premium`,
                                  "value": "`backup`, `backup-list`, `backup-crear`, `backup-cargar`, `backup-delete`,`snipe`"
                                },
                                {
                                  "name": `${emojis.estrella} | Interacciones`,
                                  "value": "`8ball`, `tirarmoneda`, `think`, `say`, `sad`, `run`, `pat`, `kill`, `hi`, `happy`, `dance`, `cringe`, `chase`, `bye`, `bully`, `bored`, `blush`, `bite`, `hug`, `sleep`, `impostor`, `dab`, `die`, `laugh`, `kiss`"
                                }
                              ],
                            }
                        ]
                    })
                }
            }
        }
    }
}