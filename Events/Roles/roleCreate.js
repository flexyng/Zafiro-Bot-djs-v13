const { MessageEmbed, Role, Client } = require("discord.js");
const AntiRoles = require("../../Models/AntiRoles");
const Whitelist = require("../../Models/Whitelist");

module.exports = {
    name: "roleCreate",
    /**
     * @param {Client} client
     * @param {Role} role
     */
    async execute(role) {
        const { guild } = role;
        const antiroles = await AntiRoles.findOne({ guildId: guild.id });
        if (!antiroles || !antiroles.actived) {
            return;
        }

        try {
            const auditlogs = await guild.fetchAuditLogs({
                type: "ROLE_CREATE"
            }).catch(e => { });
            const { executor } = auditlogs.entries.first();
            if (executor.bot && executor.flags.has("VERIFIED_BOT")) {
                return;
            }

            const Target = guild.members.cache.get(executor.id);
            const uW = await Whitelist.findOne({
                guildId: guild.id,
                userId: Target?.id
            });

            if (!uW && Target && guild.me?.roles?.highest?.comparePositionTo(Target?.roles?.highest) > 0 && role.guild.ownerId !== Target?.id) {
                role.delete().catch(e => { });
            }
        } catch (e) {
            console.log(e);
        }
    }
}
