const {
  Client,
  Message,
  MessageEmbed,
  Collection,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const Prefix = require("../../Models/Prefix");
const Blacklist = require("../../Models/Blacklist");
const Apelacion = require("../../Models/Apelacion");
const emojis = require("../../emojis");
const moment = require("moment");
let prefix;

module.exports = {
  name: "messageCreate",
  /**
   * @param {Client} client
   * @param {Message} message
   */
  async execute(message, client, Discord) {
    if (!message.guild) return;
    const ExistsPrefix = await Prefix.findOne({ guildId: message.guild.id });
    const blacklist = await Blacklist.findOne({ userId: message.author.id });
    if (!ExistsPrefix) {
      prefix = "z!";
    } else {
      prefix = ExistsPrefix.prefix;
    }
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) {
      if (message.mentions.has(client.user)) {
        if (
          message.content.includes("@everyone") ||
          message.content.includes("@here")
        ) {
          return;
        }

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

        const embedmention = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("¿Alguien me ha mencionado?")
          .addFields(
            { name: `${emojis.guion} Descripción`, value: `${emojis.llave} ¡Hola, soy Zafiro!, un bot de protección y configuración de servidores.` },
            { name: `${emojis.guion} Mis comandos`, value: `${emojis.llave} Puedes revisar **todos** mis comandos ejecutando el comando ${prefix}commands` },
            { name: `${emojis.guion} ¿Como obtengo más información?`, value: `${emojis.llave} Para obtener más información sobre mi, puedes usar el comando \`${prefix}help\` o acceder a mi [servidor de soporte.](https://discord.gg/SUM6mc7Ye3)` },
            { name: `${emojis.guion} ¿Como puedes invitarme?`, value: `${emojis.llave} Para invitarme a tu servidor, puedes pulsar [aquí](https://discord.com/api/oauth2/authorize?client_id=1144388672867811398&permissions=8&scope=bot+applications.commands) o en el botón de abajo.` }
          )
          .setImage("https://cdn.discordapp.com/attachments/1086698020550230206/1087412879130628106/standard_1.gif")

        return message.reply({ embeds: [embedmention], components: [row] });
      }
      return;
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    if (!commandName) {
      return;
    }
    const isApeled = await Apelacion.findOne({ userId: message.author.id });
    if (commandName === "apelar") {
      const apelacion = args.join(" ");
      if (!blacklist) {
        return message.channel.send({
          content: `${emojis.negativo} | No estás en la blacklist.`,
        });
      }
      if (isApeled) {
        return message.channel.send({
          content: `${emojis.negativo} | Tu ya has apelado una sanción, espera nuestra respuesta.`,
        });
      }
      if (!apelacion) {
        return message.channel.send({
          content: `${emojis.negativo} | Escribe tu apelación, tiene que ser decente y larga para poder tomarla en cuenta.`,
        });
      }
      if (apelacion.length < 20) {
        return message.channel.send({
          content: `${emojis.negativo} | Escribe tu apelación con más de 20 caracteres.`,
        });
      }
      const canal = await client.channels.cache.get("1032571101160669195");
      canal.send({
        embeds: [
          {
            title: "Nueva apelación",
            description: `${apelacion}`,
            footer: {
              text: `${message.author.id}, ${message.author.username}`,
            },
            color: "BLURPLE",
            timestamp: Date.now(),
          },
        ],
      });
      const asd = new Apelacion({
        userId: message.author.id,
      });
      await asd.save();
      return message.channel.send({
        content: `${emojis.positivo} | Apelación enviada, espera unos dias o semanas para saber tu respuesta.`,
      });
    }
    if (blacklist) {
      return message
        .reply({
          content: `${emojis.negativo} | No puedo interactuar con usuarios en la lista negra`,
          allowedMentions: { repliedUser: false },
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch(() => { });
          }, 3000);
        });
    }
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    if (!command)
      return message.reply({
        content: `${emojis.negativo} | \`Ese comando no existe\``,
        allowedMentions: { repliedUser: false },
      });
    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message
          .reply({
            content: `${emojis.cargando
              } | Tengo que enfriar mis sistemas! Espera \`${timeLeft.toFixed(
                1
              )}s\` para ejecutar el comando de nuevamente!`,
            allowedMentions: { repliedUser: false },
          })
          .then((msg) => {
            setTimeout(() => {
              msg.delete().catch((err) => { });
              message.delete().catch((err) => { });
            }, 10000);
          });
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
      command.execute(message, args, commandName, client, Discord, prefix);
    } catch (error) {
      const errorEmbed = new MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setColor("RED")
        .setDescription(
          `${emojis.negativo} | Ha ocurrido un error cuando se ejecutaba el comando, porfavor contacte con mis desarrolladores para mas información`
        )
        .setTimestamp()
        .setFooter("Zafiro");
      message
        .reply({ embeds: errorEmbed, allowedMentions: { repliedUser: false } })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((err) => { });
          }, 3000);
        });
    }
  },
};
