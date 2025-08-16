const { Client, GuildMember, MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const Blacklist = require("../../Models/Blacklist");
const emojis = require("../../emojis");

module.exports = {
    name: "guildCreate",
    /**
     * @param {Guild} guild
     * @param {Client} client
     */
    async execute(guild, client) {

        const embed = new MessageEmbed()
            .setTitle("Error")
            .setDescription(`${emojis.negativo} | No puedo interactuar con usuarios de la lista negra`)
            .setColor("RED");

        const blacklist = await Blacklist.findOne({ userId: guild.ownerId });

        if (blacklist) {
            client.users.cache.get(guild.ownerId).send({ embeds: [embed] }).catch(e => { });
            guild.leave();
            return;
        }

        const embed1 = new MessageEmbed()
            .setTitle("Zafiro - Mensaje automatizado")
            .setDescription(`**Hola, gracias por añadirme a este bonito servidor.**\n\n> \`-\` __Consejos útiles de configuración:__\n\n- - > Para configurarme contra raids puedes usar el comando \`z!anti-raid\`\n- - > Para configurarme contra maliciosos puedes usar el comando \`z!anti-malicious\`\n- - > Para más Información utiliza \`z!comandos\`\n- - > ¿Necesitas moderadores en tu servidor? Olvidalo! ahora solo sera cuestion de **Zafiro** utiliza \`z!auto-moderador\`\n\n> - Enviado desde: \`${guild.name}\``)
            .setColor("RANDOM");

        const owner = guild.members.cache.get(guild.ownerId);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel("✉️ Invitame")
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=1144388672867811398&permissions=8&scope=bot+applications.commands"),

                new MessageButton()
                    .setStyle("LINK")
                    .setLabel(" Servidor de soporte")
                    .setURL("https://discord.gg/SUM6mc7Ye3"),
            );

        const embed2 = new MessageEmbed()
            .setTitle("Nuevo servidor:")
            .setDescription(`Me metieron a un servidor **${guild.name}** | **${guild.id}**\n tiene **${guild.memberCount}** y el owner es **${owner.user.username} (${guild.ownerId})**`)
            .setColor("RANDOM")
            .setThumbnail(guild.iconURL());

        client.users.cache.get(guild.ownerId).send({ embeds: [embed1], components: [row] }).catch(e => { });

        const webhookUrl = 'https://discord.com/api/webhooks/1220324687113093210/pspZsY07p0rc7xlRDCfNgQBRG965rSLoX_nr309aWk2lN-oSSigQnuOTvBaCOWquABSt';

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ embeds: [embed2] }),
        })
            .then(() => console.log(`Webhook sent for joining server: ${guild.name}`))
            .catch(error => console.error('Error sending webhook:', error));
    }
};
