const { MessageEmbed } = require("discord.js");
const MutedRole = require("../../Models/MutedRole");
const emojis = require("../../emojis");

module.exports = {
    name: "set-mute-role",
    aliases: ["setmuterole"],
    description: "Coloca el rol que se utilizará para mutear a las personas en tu servidor",
    permissions: "MANAGE_ROLES",
    usage: "set-mute-role @Rol",
    cooldown: 10,
    /**
     * @param {Message} message
     */
    async execute(message, args, commandName, client, Discord) {
        if (!message.member.permissions.has("MANAGE_ROLES")) {
            return message.reply({ content: `${emojis.negativo} | \`No tienes permisos para ejecutar esta acción\` `, allowedMentions: { repliedUser: false } });
        }

        if (!message.guild.me.permissions.has("ADMINISTRATOR")) {
            return message.reply({ content: `No puedo interactuar con este servidor sin los siguientes permisos: \`ADMINISTRADOR\``, allowedMentions: { repliedUser: false } });
        }

        const TargetRole = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        const RoleExists = await MutedRole.findOne({ guildId: message.guild.id });

        if (!TargetRole || !TargetRole.id) {
            const ErrorResponse = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${emojis.negativo} | \`Menciona un rol válido para establecerlo como predeterminado para silenciar miembros.\``)
                .setTimestamp()
                .setColor("BLUE");

            return message.reply({ embeds: [ErrorResponse], allowedMentions: { repliedUser: false } });
        }

        if (!RoleExists) {
            const CreateMutedRole = new MutedRole({
                roleId: TargetRole.id,
                guildId: message.guild.id
            });

            await CreateMutedRole.save();

            const Response = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${emojis.positivo} | Entendido, usaré el rol ${TargetRole} para silenciar miembros`)
                .setTimestamp()
                .setColor("GREEN");

            message.reply({ embeds: [Response], allowedMentions: { repliedUser: false } });

            message.guild.channels.cache.forEach(async (c) => {
                try {
                    if (c.type === "GUILD_TEXT" || c.type === "GUILD_VOICE") {
                        await c.permissionOverwrites.create(TargetRole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            CREATE_PUBLIC_THREADS: false,
                            CREATE_PRIVATE_THREADS: false,
                            SEND_MESSAGES_IN_THREADS: false,
                        });
                    }
                } catch (error) {
                    console.error(`Error al configurar permisos para ${c.name}: ${error.message}`);
                }
            });
        } else {
            RoleExists.roleId = TargetRole.id;
            await RoleExists.save();

            const Response = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`> ${emojis.positivo} | Entendido, usaré el rol ${TargetRole} para silenciar miembros`)
                .setTimestamp()
                .setColor("AQUA");

            message.reply({ embeds: [Response], allowedMentions: { repliedUser: false } });

            message.guild.channels.cache.forEach(async (c) => {
                try {
                    if (c.type === "GUILD_TEXT" || c.type === "GUILD_VOICE") {
                        await c.permissionOverwrites.create(TargetRole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            CREATE_PUBLIC_THREADS: false,
                            CREATE_PRIVATE_THREADS: false,
                            SEND_MESSAGES_IN_THREADS: false,
                        });
                    }
                } catch (error) {
                    console.error(`Error al configurar permisos para ${c.name}: ${error.message}`);
                }
            });
        }
    }
};
