const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const emojis = require("../../emojis");
const Premium = require("../../Models/UserPremium");
const GBC = require("../../Models/GuildBackupCreate");
const backup = require("discord-backup");
let oncooldown = false;

module.exports = {
    name: "backup-cargar",
    aliases: ["servidor-cargar"],
    description: "Carga una backup en tu servidor",
    permissions: "Owner",
    usage: "backup-cargar <BackupId>",
    cooldown: 120,
    /**
     * @param {Message} message
     * @param {Client} Client
     */
    async execute(message, args, commandName, client, Discord, prefix) {
        const UserIsPremium = await Premium.findOne({ userId: message.author.id });
        if(!UserIsPremium) {
            return message.channel.send({ content: `${emojis.negativo} | Este comando es de uso **premium**!, unete a nuestro servidor de soporte para más Información: https://discord.gg/SUM6mc7Ye3 `});
        }
        if(message.guild.ownerId !== message.author.id) {
            return message.reply({ content: `${emojis.negativo} - Solo el __propietario__ de este servidor puede ejecutar el comando.`, allowedMentions: { repliedUser: false } });
        }
        if(!message.guild.me.permissions.has("ADMINISTRATOR")) {
            return message.channel.send({ content: `${emojis.negativo} | No tengo permisos de __administrador__ para ejecutar esto.`});
        }
        const backupId = args[0]
        if(!backupId) {
            return message.channel.send({ content: `${emojis.negativo} | ¡Tienes que proporcionar una id!`});
        }
        const backupSearch = await GBC.findOne({ backupId: backupId });
        if(!backupSearch) {
            return message.channel.send({ content: `${emojis.negativo} | ¡Tienes que proporcionar una id valida!`});
        } else {
            if(backupSearch?.authorId !== message.author.id) {
                message.channel.send({ content: `${emojis.negativo} | ¡Esa backup no te pertenece!`});
            } else {
                let msg = await message.channel.send({
                    "embeds": [
                        {
                          "title": "⚠ - Advertencia, confirmar acción.",
                          "description": "`-` ¿Estas seguro de que quieres cargar esta backup?\n\n`❔` **>** `Efectos de la backup:`\n```Eliminar canales, Eliminar roles, Eliminar emojis, Crear canales, Crear roles, Crear emojis, Crear Baneos```\n`ATENCIÓN: TODO TU PROGRESO EN EL SERVIDOR SE RESTAURARA.`",
                          "color": 16757052,
                          "footer": {
                            "text": "Reacciona con ✅ para continuar | Reacciona con ❌ para cancelar | ¡Impulsado por Zafiro™!"
                          }
                        }
                    ]
                });
                msg.react('✅');
                msg.react('❌');
                const rFilter = (r, user) => {
                    return ['✅', '❌'].includes(r.emoji.name) && user.id === message.author.id;
                }
                const collected = await msg.awaitReactions({ filter: rFilter, max: 1, time: 120000 });
                const reaction = collected.first().emoji.name;
                if(reaction === "✅") {
                    msg.edit({ content: `${emojis.cargando} | \`Estoy cargando la backup...\``, embeds: [] });
                    msg.reactions.removeAll();
                    message.guild.setName("Cargando...");
                    setTimeout(async () => {
                        const bld = await backup.load(backupId, message.guild, {
                            maxMessagesPerChannel: 5
                        }).catch(e => {});
                    }, 5000)
                } else {
                    msg.reactions.removeAll();
                }
            }
        }
    }
}