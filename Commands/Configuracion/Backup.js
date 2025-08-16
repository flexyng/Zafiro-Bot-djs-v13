module.exports = {
    name: "backup",
    aliases: ["servidor"],
    description: "Información de las backups",
    permissions: "Owner",
    cooldown: 1,
    /**
     * @param {Message} message
     * @param {Client} Client
     */
    async execute(message, args, commandName, client, Discord, prefix) {
        message.channel.send({
            content: `\`{}\` = Argumentos
\`<>\` = Requerido
Las opciones disponibles son: 

**-** \`${prefix} backup-crear\`
**-** \`${prefix} backup-list\`
**-** \`${prefix} backup-cargar <{backupId}>\`
**-** \`${prefix} backup-info <{backupId}>\`
**-** \`${prefix} backup-delete <{backupId}>\`
`


        })
    }
}