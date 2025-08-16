const {
  MessageEmbed,
  MessageActionRow,
  Message,
  MessageButton,
  MessageSelectMenu,
} = require("discord.js");
const emojis = require("../../emojis");

module.exports = {
  name: "help",
  aliases: ["ayuda"],
  description: "Comando de ayuda para empezar",
  cooldown: 3,
  /**
   * @param {Message} message
   */
  async execute(message, args, commandName, client, Discord, prefix) {
    let author = message.author.username
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setPlaceholder("Hola! ¿en qué te puedo ayudar?")
        .setMaxValues(1)
        .setCustomId("ap_slch")
        .addOptions([
          {
            label: "Servidor de soporte",
            description: "Mi servidor de Soporte",
            emoji: "<:llave:987423580742639776> ",
            value: "ap_sdsp",
          },
          {
            label: "Queja",
            description: "Envía una queja de el bot al staff",
            emoji: "<:serverdevicon:987078413506457650>",
            value: "ap_qja",
          },
          {
            label: "Reportar Bug",
            description: "Envía un reporte de bug al staff",
            emoji: "<:serverguardicon:987078189706805298>",
            value: "ap_rptrbg",
          },
          {
            label: "¿Qué es Zafiro?",
            description: "Información útil acerca de Zafiro",
            emoji: "<a:estrella3:995648957734735903>",
            value: "ap_qeap",
          },
          {
            label: "¿Cómo configuro a Zafiro?",
            description: "Información útil de como configurarme",
            emoji: "<:config:995647763733811231>",
            value: "ap_ccap",
          },
        ])
    );
    const m = await message.channel.send({
      content: null,
      embeds: [
        {
          title: "Comando de ayuda.",
          description:
            "<:emoji_1:1189906888675037255> - `Servidor de soporte` **(Mi soporte)**\n——————————————————————\n<:emoji_9:1189908757631742032> - `Queja` **(Envía una queja al staff)**\n——————————————————————\n <:emoji_9:1189908757631742032> - `Reportar Bug` **(Envía un reporte de bug al staff)**\n——————————————————————\n<:emoji_14:1189994989804077137> - `¿Qué es Zafiro?` **(Información útil de Zafiro)**\n——————————————————————\n<:emoji_4:1189906977225191454>  - `¿Cómo configuro Zafiro?` **(Información útil de mi configuración)**\n——————————————————————",
          color: 50943,
          fields: [
            {
              name: "<:ticket:987078456640700496> | Enlaces útiles:",
              value:
                "[Click aquí para invitarme](https://discord.com/api/oauth2/authorize?client_id=1144388672867811398&permissions=8&scope=bot+applications.commands)",
              inline: true,
            },
            {
              name: "<:emoji_16:1190024131274621018> | Soporte",
              value:
                "[Click aquí para ir a mi servidor](https://discord.gg/SUM6mc7Ye3)",
              inline: true,
            },
            {
              name: "<:emoji_7:1189908084047495238> | Comandos útiles:",
              value: `\`${prefix}commands\` - \`${prefix}invite\``,
            },
          ],
          author: {
            name: `${message.author.username}`,
            icon_url: `${message.author.displayAvatarURL({ dynamic: true })}`,
          },
          footer: {
            text: "Selecciona una con el submenu",
            icon_url: client.user.avatarURL({ dynamic: true }),
          },
          image: {
            url: "https://cdn.discordapp.com/attachments/997160715418877982/999029278207393903/unknown.png",
          },
        },
      ],
      components: [row],
    });
    const ifilter = (m) => m.user.id === message.author.id;
    const select = m.createMessageComponentCollector({ filter: ifilter });

    const row1 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("📂 Servidor de soporte")
        .setURL("https://discord.gg/SUM6mc7Ye3"),
    )

    select.on("collect", async (i) => {
      if (i.values[0] === "ap_sdsp") {
        // Servidor de soporte
        await i.reply({
          content: null,
          components: [row1],
          embeds: [
            {
              title: "Servidor de soporte",
              description:
                "**¿Qué ofrecemos?**\n`-` **|** Soporte 24/7.\n`-` **|** Sistema de reportes de usuarios peligrosos.\n`-` **|**  Staff conectado.\n——————————————————————\n**Gracias por usar a __Zafiro__.**",
              color: 50943,
              thumbnail: {
                url: `https://media.discordapp.net/attachments/1189951019887644795/1190033028458758194/logo_oficial.png?ex=65a0539f&is=658dde9f&hm=31a9aa03835fd12efa0b2c7eb3e8e42654065be8d3272154f4d09d6e9934c912&=&format=webp&quality=lossless&width=662&height=662`,
              },
            },
          ],
          ephemeral: true,
        });
      } else if (i.values[0] === "ap_qja") {
        // Queja
        await i.reply({
          content: null,
          embeds: [
            {
              title: "Proporcionar una queja",
              description:
                "**-** <:emoji_14:1189947119671443456> **|** `Escribe despues de este mensaje que queja tienes.`\n\n**`-` Este modulo es serio, por favor no juege con las quejas o sera sancionado.**\n**`-` También puede proporcionar una queja en nuestro servidor de soporte.**",
              url: "https://discord.gg/SUM6mc7Ye3",
              color: 50943,
              thumbnail: {
                url: client.user.avatarURL({ dynamic: true }),
              },
            },
          ],
          ephemeral: true,
        });
        const clq = await message.channel
          .awaitMessages({
            filter: (m) => m.author.id === message.author.id,
            max: 1,
            time: 120000,
            errors: ["time"],
          })
          .catch(async (e) => {
            return await i.editReply({
              content: `${emojis.negativo} | Se agotó el tiempo de espera para enviar el bug.`,
              embeds: [],
            });
          });
        const quejaMessage = clq.first();
        const queja = quejaMessage.content;
        try {
          await quejaMessage.delete();
        } catch (error) {
          console.error('No se pudo eliminar el mensaje:', error);
        }
        if (queja.length < 15) {
          await i.editReply({
            content: `${emojis.negativo} | No puedo enviar esta queja, el contenido debe ser mayor a 15 caracteres.`,
            embeds: [],
          });
        } else {
          const channelId = "1189944400793575505";
          const cl = await client.channels.fetch(channelId).catch(console.error);
          
          cl.send({
            content: `Nueva queja por parte del usuario: \`${author} | ID: ${message.author.id}\`\nQueja: \`\`\`${queja}\`\`\``,
          });
              
          await i.editReply({
            content: `${emojis.positivo} | Queja enviada al equipo de soporte correctamente.`,
            embeds: [],
            ephemeral: true,
          });
        }
      } else if (i.values[0] === "ap_rptrbg") {
        // Reportar Bug
        await i.reply({
          content: null,
          embeds: [
            {
              title: "<:emoji_14:1189947119671443456> | Reportar Bug de Zafiro",
              description:
                "`-` **|** Escribe después de este mensaje el __bug encontrado.__\n\n`[?]` **|** Por favor que tu mensaje sea mayor a 15 caracteres.\n`[?]` **|** No puedes enviar imagenes\n`[?]` **|** Proporciona también el comando en el que lo encontraste.\n`[!]` **|** Este modulo es serio, por favor no uses este comando de juego o seras sancionado.",
              url: "https://discord.gg/SUM6mc7Ye3",
              color: 50943,
              thumbnail: {
                url: client.user.avatarURL({ dynamic: true }),
              },
            },
          ],
          ephemeral: true,
        });
        const bc = await message.channel
          .awaitMessages({
            filter: (m) => m.author.id === message.author.id,
            max: 1,
            time: 120000,
            errors: ["time"],
          })
          .catch(async (e) => {
            return await i.editReply({
              content: `${emojis.negativo} | Se agotó el tiempo de espera para enviar el bug.`,
              embeds: [],
            });
          });
          
          const bugReportMessage = bc.first();
          const bug = bugReportMessage.content;
          try {
            await bugReportMessage.delete();
          } catch (error) {
            console.error('No se pudo eliminar el mensaje:', error);
          }
          
        if (bug.length < 15) {
          await i.editReply({
            content: `${emojis.negativo} | No puedo enviar este reporte, porfavor asegurate de que el contenido sea mayor a 15 caracteres.`,
            embeds: [],
          });
        } else {
          const cl = await client.channels.cache.get("1190035325330915441");
          cl.send({
            content: `Nuevo bug, reportado por: \`${author} | ID: ${message.author.id}\`\nBUG: \`\`\`${bug}\`\`\``,
          });
          await i.editReply({
            content: `${emojis.positivo} | Reporte enviado correctamente al staff!`,
            embeds: [],
          });
        }
      } else if (i.values[0] === "ap_qeap") {
        await i.reply({
          content: null,
          embeds: [
            {
              title: "<:emoji_2:1189906925136130058> | ¿Qué es Zafiro?",
              description:
                "`(1)` **|** Zafiro es un bot dedicado a la protección y administración de servidores, es un bot potente y uno de los mejores bots para `anti-raid`.\n\n**|** **¿Cómo veo las estadísticas de mi servidor?**\n`(2)` **|** Para ver las estadísticas de tu servidor y usa el comando `status`, te indicara los módulos que tienes activados y unos consejos para configurar mejor tu servidor.\n\n**| ¿Qué tiene de diferente de otros bots?**\n`(3)` **|** Su fácil y simple configuración para tu servidor, así como una protección excelente.",
              color: 50943,
              thumbnail: {
                url: client.user.avatarURL({ dynamic: true }),
              },
            },
          ],
          ephemeral: true,
        });
      } else if (i.values[0] === "ap_ccap") {
        await i.reply({
          content: null,
          embeds: [
            {
              title: "Ayuda para configurarme:",
              description:
                "`(1)` **|** El rol de __Zafiro__ debe estar en lo más alto de los roles para poder ejecutar bien el `anti-raid` y parar todos los raids, de lo contrario no podra parar la mayoria de raids.\n\n`(2)` **|** Para `automoderar` tu servidor siempre puedes activar el `auto-moderador` y configurarlo con `auto-moderador-config`, te protegera de flood, spam (links discord) y muchas cosas más.\n\n`(3)` **|** Para prevenir ataques de `tokens/multicuentas` activa el `anti-tokens`, esto te protegera de `tokens/multicuentas/selfbots`.\n\n`(4)` **|** Para prevenir que los usuarios añadan bots a tu servidor activa `anti-bots`, esto te protegera de los bots que __no estan verificados__.",
              color: 50943,
              author: {
                name: "Zafiro",
                icon_url: client.user.avatarURL({ dynamic: true }),
              },
            },
          ],
          ephemeral: true,
        });
      }
    });
  },
};
