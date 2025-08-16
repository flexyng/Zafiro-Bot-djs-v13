const {
  MessageEmbed,
  MessageActionRow,
  Message,
  MessageButton,
} = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
  name: "invite",
  aliases: ["invitacion"],
  description: "Invitame a tu servidor",
  cooldown: 5,
  /**
   * @param {Message} message
   */
  async execute(message, args, commandName, client, Discord) {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setEmoji("✉")
        .setLabel("Invitame")
        .setURL(
          "https://discord.com/api/oauth2/authorize?client_id=1144388672867811398&permissions=8&scope=bot+applications.commands"
        ),

      new MessageButton()
        .setStyle("LINK")
        .setEmoji("📂")
        .setLabel("Servidor de soporte")
        .setURL("https://discord.gg/9xGp3FkBp3")
    );

    message.reply({
      content: null,
      embeds: [
        {
          title: "¿Me vas a añadir a un servidor?",
          description:
            "`[*]` Ten en cuenta los siguientes consejos:\n\n`✅` Mantén mi permiso de __administrador__ activado.\n`✅` Mantén mi permiso de __banear y expulsar miembros__ activado.\n`✅` Mantén mi rol en lo mas alto del servidor.\n`✅` Mantén activados mis sistemás de seguridad.\n\nPara invitarme a tu servidor puedes pulsar en [este link](https://discord.com/api/oauth2/authorize?client_id=1085067449780686858&permissions=8&scope=bot) o en el siguiente botón:",
          color: 4331519,
          footer: "¡Invitame! | Impulsado por Zafiro™ Bot",
        },
      ],
      components: [row],
      allowedMentions: { repliedUser: false },
    });
  },
};
