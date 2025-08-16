const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const emojis = require("../../emojis");
const moment = require("moment");
const Perms = require("../../Models/ModPerms");

module.exports = {
    name: "ban",
    aliases: ["banear", "b"],
    description: "Banea a un usuario de tu servidor",
    usage: "ban @Usuario <Razón>",
    permissions: "BAN_MEMBERS",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, commandName, client, Discord, prefix) {
        const author = message.author.username
        const userRoles = message.member.roles.cache;
        const findRolePerm = await Perms.find({ guildId: message.guild.id });
        let RolePerm;
        findRolePerm.some(d => {
            const role = userRoles.find(r => r.id === d.roleId);
            if (role) {
                RolePerm = role?.id
            }
        });
        const findPerms = await Perms.findOne({ guildId: message.guild.id, roleId: RolePerm });
        if (findPerms?.allowed.includes(commandName) && !findPerms?.denied.includes(commandName)) {
            if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
                return message.channel.send({ content: `${emojis.negativo} | No puedo interactuar con este servidor sin los siguientes permisos: \`BAN_MEMBERS\``, allowedMentions: { repliedUser: false } });
            }
            const Target = message.mentions.members.first() || message.guild.members.cache.find(member => member.displayName === args[0]) || message.guild.members.cache.find(member => member.user.username === args[0]);
            const targetName = Target.displayName || Target.user.username;

            const Razon = args.slice(1).join(" ");
            if (!Target?.user) {
                return message.channel.send({ content: `${emojis.negativo} | Debes de especificar al usuario que quieras banear.` });
            }
            if (Target.user.id === message.author.id) {
                return message.channel.send({ content: `${emojis.negativo} | No puedes banearte a ti mismo.` })
            }
            if (Target.user.id === client.user.id) {
                return message.channel.send({ content: `${emojis.negativo} | No puedes banearme a mi mismo` });
            }
            if (!Razon) {
                return message.channel.send({ content: `${emojis.negativo} | Debes colocar una razón del baneo.` })
            }
            if (Razon.length > 256) {
                return message.channel.send({ content: `${emojis.negativo} | La razón debe ser menor a 256 caracteres.` });
            }
            if (message.member.roles.highest.comparePositionTo(Target.roles.highest) <= 0) {
                return message.channel.send({ content: `${emojis.negativo} | Este usuario tiene más o los mismos roles que tú.` });
            }
            if (message.guild.me.roles.highest.comparePositionTo(Target.roles.highest) <= 0) {
                return message.channel.send({ content: `${emojis.negativo} | Este usuario tiene más o los mismos roles que yo`, allowedMentions: { repliedUser: false } });
            }
            message.guild.members.ban(Target, {
                reason: `${Razon} - ${author}`
            }).catch(e => { });
            const Response = new MessageEmbed()
                .setTimestamp()
                .setColor("BLUE")
                .setDescription(`__\`${Target.user.tag}\` | ${Target.user.id} baneado__\n\nModerador: \`${author}\` | ${message.author.id}\nRazón: \`${Razon} | Día: ${moment().format("Do/MMMM/YYYY").replace("º", "")}\``)
            /* PARA EL USUARIO */
            const Response2 = new MessageEmbed()
                .setTimestamp()
                .setColor("BLUE")
                .setDescription(`__\`${Target.user.tag}\` | ${Target.user.id} fuiste baneado__\n\nModerador: \`${author}\` | ${message.author.id}\nRazón: \`${Razon} | Día: ${moment().format("Do/MMMM/YYYY").replace("º", "")}\``)
            message.channel.send({ embeds: [Response], allowedMentions: { repliedUser: false } });
            Target.send({ embeds: [Response2] }).catch(e => { });
        } else if (message.member.permissions.has("BAN_MEMBERS")) {
            if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
                return message.channel.send({ content: `${emojis.negativo} | No puedo interactuar con este servidor sin los siguientes permisos: \`BAN_MEMBERS\``, allowedMentions: { repliedUser: false } });
            }
            const Target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName === args[0]) || message.guild.members.cache.find(member => member.user.username === args[0]);
            const targetName = Target.displayName || Target.user.username;

            const Razon = args.slice(1).join(" ");
            if (!Target?.user) {
                return message.channel.send({ content: `${emojis.negativo} | Debes de mencionar a un usuario.` });
            }
            if (Target.user.id === message.author.id) {
                return message.channel.send({ content: `${emojis.negativo} | No puedes banearte a ti mismo.` })
            }
            if (Target.user.id === client.user.id) {
                return message.channel.send({ content: `${emojis.negativo} | No puedes banearte a ti mismo.` });
            }
            if (!Razon) {
                return message.channel.send({ content: `${emojis.negativo} | Debes colocar una razón del baneo.` })
            }
            if (Razon.length > 256) {
                return message.channel.send({ content: `${emojis.negativo} | La razón debe ser menor a 256 caracteres.` });
            }
            if (message.member.roles.highest.comparePositionTo(Target.roles.highest) <= 0) {
                return message.channel.send({ content: `${emojis.negativo} | Este usuario tiene más o los mismos roles que tú.` });
            }
            if (message.guild.me.roles.highest.comparePositionTo(Target.roles.highest) <= 0) {
                return message.channel.send({ content: `${emojis.negativo} | Este usuario tiene más o los mismos roles que yo`, allowedMentions: { repliedUser: false } });
            }
            message.guild.members.ban(Target, {
                reason: `${Razon} - ${author}`
            }).catch(e => { });
            const Response = new MessageEmbed()
                .setTimestamp()
                .setColor("BLUE")
                .setDescription(`**${targetName} - (${Target.user.id})** ha sido baneado\n\n**Moderador:** ${author} - (${message.author.id})\n**Razón:** ${Razon}\n**Día:** ${moment().format("Do/MMMM/YYYY").replace("º", "")}`)
                .setFooter('Impulsado por Zafiro™')
            /* PARA EL USUARIO */
            const Response2 = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }) || client.user.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor("BLUE")
                .setDescription(`Has sido baneado del servidor **${message.guild.name}**\n\n**Moderador:** ${author} - (${message.author.id})\n**Razón:** ${Razon}\n**Día:** ${moment().format("Do/MMMM/YYYY").replace("º", "")}`)
                .setFooter("Impulsado por Zafiro™")
            message.channel.send({ embeds: [Response], allowedMentions: { repliedUser: false } });
            Target.send({ embeds: [Response2] }).catch(e => { });
        } else {
            return message.reply({ content: `${emojis.negativo} | \`No tienes permisos para ejecutar esta acción\` `, allowedMentions: { repliedUser: false } });
        }
    }
}