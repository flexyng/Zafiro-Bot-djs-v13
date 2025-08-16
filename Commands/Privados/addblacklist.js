const { MessageEmbed, MessageActionRow, Message, MessageButton, Client } = require("discord.js");
const Blacklist = require("../../Models/Blacklist");
const emojis = require("../../emojis");

module.exports = {
    name: "bloquear",
    aliases: ["bloq"],
    description: "Comando privado",
    permissions: "Privado",
    /**
     * @param {Message} message
     * @param {Client} client
     */
    async execute(message, args, commandName, client, Discord) {
        if(message.author.id !== "1130621773348601918") //lo cambié así porque sinó tenemos una brecha en la seguridad, porqué a arka que no estaba ni definida como owner le dejó usar blacklist att clasifed: chido arregla tu codigo XDDD//
        {
            return message.reply({ content: `${emojis.negativo} | He buscado por todos los sitios, pero en ninguno veo tus permisos`, allowedMentions: { repliedUser: true }});
        } else {
            const id = args[0];
            const prueba = args[1];
            const razon = args.slice(2).join(" ");
            if(!id && !prueba && !razon) {
                return message.reply({ content: `${emojis.negativo} | \`Uso correcto: z!bloq <id> <prueba> <razon>\``, allowedMentions: { repliedUser: false } })
            } else {
                const exists = await Blacklist.findOne({
                    userId: id
                });
                if(exists) {
                    return message.channel.send({ content: "Ese usuario ya esta en blacklist" })
                }
                client.users.fetch(id).then(async u => {
                    const blacklist = new Blacklist({
                        userId: id,
                        pruebas: prueba,
                        razon: razon
                    });
                    await blacklist.save();
                    message.reply({ content: `\`${u.username}\` Fue bloqueado del bot`, allowedMentions: { repliedUser: false } });
                    const Embed = new MessageEmbed()
                    .setDescription(`\`${u.username}\` Fue bloqueado del bot\n\nID: ${u.id}\n\nRazón: \`${razon}\``)
                    .setImage(prueba)
                    .setColor("BLUE")
                    .setTimestamp()
                    .setFooter("Zafiro Security")
                    client.channels.cache.get("1033297253286293557").send({ embeds: [Embed] });
                }).catch(e => { return message.channel.send({ content: "No existe ese usuario." }) })
            }
        }
    }
}