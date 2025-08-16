const { MessageEmbed, MessageActionRow, Message, MessageButton } = require("discord.js");
const Blacklist = require("../../Models/Blacklist");
const packageJson = require("../../package.json");

module.exports = {
    name: "bot",
    aliases: ["stats"],
    description: "Información y estadisticas del bot.",
    cooldown: 5,
    /**
     * @param {Message} message
     */
    async execute(message, args, commandName, client, Discord) {
        const count = await Blacklist.find();

        // Obtener información de memoria
        const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
        const totalMemory = process.memoryUsage().heapTotal / 1024 / 1024;

        const embed = new MessageEmbed()
        .setColor("#db1582")
        .setAuthor({ name: 'Estadísticas e información de Zafiro', iconURL: 'https://media.discordapp.net/attachments/1020208092505452574/1031157043190562846/SPOILER_1665211054-icon.png?width=663&height=663'})
        .setDescription("Hola!, soy **Zafiro**, un bot de seguridad.\nMi misión es proteger tu servidor, aunque también tengo comandos de entretenimiento y  variados.")
        .addFields(
          { name: 'Información general:', value: `🪐 Tag: **Zafiro#2216**\n🆔 ID: **1046149485744635915**\n:birthday: Cumpleaños: **8/10/2022**\n:new: Versión: **${packageJson.version}**`},
          { name: 'Estadísticas:', value: `:crossed_swords: Servidores: **${client.guilds.cache.size}**\n:cat: Usuarios sin contar bots: **${client.users.cache.size}**\n:star: Usuarios totales: **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}**\n:checkered_flag: Usuarios en la blacklist: **${count.length}**\n:signal_strength: Online: <t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
          { name: 'Proccesos:', value: `:bar_chart: Memoria en uso: **${usedMemory.toFixed(2)} MB**\n:inbox_tray: Memoria total: **${totalMemory.toFixed(2)} MB**` }
        )
        .setImage("https://cdn.discordapp.com/attachments/1086698020550230206/1087412879130628106/standard_1.gif")


        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("LINK")
            .setLabel("✉️ Invitame")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=1144388672867811398&permissions=8&scope=bot+applications.commands"),
        
            new MessageButton()
            .setStyle("LINK")
            .setLabel("📂 Servidor de soporte")
            .setURL("https://discord.gg/SUM6mc7Ye3"),
        )
         
       message.reply({ "content": null, embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
        
    }
}
