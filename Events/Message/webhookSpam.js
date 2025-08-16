const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const AntiRaid = require("../../Models/AntiRaid");
const Whitelist = require("../../Models/Whitelist");
let webhookSpams = [];

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        if (!message.guild) {
            console.log('Este mensaje no se originó en un servidor.');
            return;
        }

        if (message.author.id === "928411318589988884") {
            return;
        }

        const antiraid = await AntiRaid.findOne({ guildId: message.guild.id });
        if (!antiraid || !antiraid.actived || !message.webhookId) {
            return;
        }

        const webhook = webhookSpams.filter(w => w.id === message.webhookId);
        const fetchedWebhook = await client.fetchWebhook(message.webhookId).catch(e => { });

        if (webhook.length + 1 !== antiraid.maxWebhookMessages) {
            webhookSpams.push({
                id: message.webhookId
            });
            return;
        }

        const adl = await message.guild.fetchAuditLogs({
            type: "WEBHOOK_CREATE",
            limit: 1
        });
        if (!adl) return;

        const { executor, target } = adl.entries.first();
        if (message.guild.ownerId === executor?.id || target.id !== fetchedWebhook.id) {
            return;
        }

        const Target = message.guild.members.cache.get(executor?.id);
        const uW = await Whitelist.findOne({
            guildId: message.guild.id,
            userId: Target?.id
        });
        if (uW || (Target && message.guild.me.roles.highest.comparePositionTo(Target?.roles.highest) <= 0) || Target.id === "926625186789326909") {
            return;
        }

        if (antiraid.sancionType.toLowerCase() === "ban") {
            message.guild.members.ban(Target.id, {
                reason: "Anti-Raid esta activado"
            });
            console.log(fetchedWebhook);
            fetchedWebhook.delete("Anti-Raid esta activado");
            message.channel.send({ content: `\`${fetchedWebhook.name}\` eliminado por spam de mensajes, fue creado por: \`${Target.user.username}\` y lo he baneado correctamente.` });
        }

        if (antiraid.sancionType.toLowerCase() === "kick") {
            message.guild.members.kick(Target.id, "Anti-Raid esta activado");
            console.log(fetchedWebhook);
            fetchedWebhook.delete("Anti-Raid esta activado");
            message.channel.send({ content: `\`${fetchedWebhook.name}\` eliminado por spam de mensajes, fue creado por: \`${Target.user.username}\` y lo he expulsado correctamente.` });
        }

        setTimeout(() => {
            webhookSpams = [];
        }, 7000);
    }
}
