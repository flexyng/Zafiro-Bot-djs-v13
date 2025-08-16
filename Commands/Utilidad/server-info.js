//Modificalo a tu Gusto

const Discord = require('discord.js');

const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton} = require('discord.js')

const day= require("dayjs")//modulo para agregar la fecha de creacion


module.exports = {

    name: "serverinfo", 

    aliases: ["serverinfo"],

    description: "Muestra la informacion del servidor",

  async execute(message, args, commandName, client, Discord) {

  

  const createsv = day(message.guild.createdAt).format("DD/MM/YY")//creacion del &{createsv}

 

  const start = new Discord.MessageEmbed()//embed Principal

  .setAuthor(`Informacion del Servidor`, client.user.avatarURL())//Author del embed

  .setColor("e60ad4")//color del embed

  .setFooter("Impulsado por Zafiro™")//footer del embed

 .setDescription(`\n > **Nombre:** \`${message.guild.name}\`\n > **ID:** \`${message.guild.id}\`\n > **Owner:** ${await message.guild.fetchOwner()}\n > **Miembros:** \`${message.guild.memberCount}\`\n > **Roles:** \`${message.guild.roles.cache.size}\`\n > **Canales:** \`${message.guild.channels.cache.size}\`\n > **Boosts:** \`${message.guild.premiumSubscriptionCount.toString()}\`\n > **Emojis:** \`${message.guild.emojis.cache.size}\`\n > **Creacion:** \`${createsv}\``)//descripcion del embed

  .setTimestamp()//La fecha en la que se envio el mensaje

 



    const row = new MessageActionRow()//Menu desplegable

    .addComponents(

        new MessageSelectMenu()

        .setPlaceholder(`Click aqui para elejir una categoria`)

        .setCustomId("Select")

        .addOptions([

            {

                value: "Home",

                label: "Menu Principal",//primera opcion

                emoji: "🏡" 

            },

            {

               value: "Emojis",

               label: "Visualizar los Emojis",//segunda opcion

               emoji: "🎭"

            },

            {

              value: "Roles",

              label: "Visualizar los Roles",//tercera opcion

              emoji: "🌀"

           }

  

        ])

  

        

    )

  

  message.channel.send({ embeds: [start], components: [row] }).then(async(m) => {



    const collector = m.createMessageComponentCollector({ filter: i => i.user.id === message.author.id});//el collector de los embeds del comando

    collector.on("collect", async(i) => {

        if(i.values[0] === "start"){

            i.update({ embeds: [start]})

        }

        if(i.values[0] === "Home"){

            i.update({ embeds: [Home]})

        }

        if(i.values[0] === "Emojis"){ 

            i.update({ embeds: [Emojis]})

        }

        if(i.values[0] === "Roles"){ 

          i.update({ embeds: [Roles]})

        }

        

    })

  

    const Home = new Discord.MessageEmbed()//embed de la primera opcion del menu desplegable

  .setAuthor(`Informacion del Servidor`, client.user.avatarURL())//Author del embed

  .setColor("e60ad4")

  .setFooter("Impulsado por Zafiro™")

  .setDescription(`\n > **Nombre:** \`${message.guild.name}\`\n > **ID:** \`${message.guild.id}\`\n > **Owner:** ${await message.guild.fetchOwner()}\n > **Miembros:** \`${message.guild.memberCount}\`\n > **Roles:** \`${message.guild.roles.cache.size}\`\n > **Canales:** \`${message.guild.channels.cache.size}\`\n > **Boosts:** \`${message.guild.premiumSubscriptionCount.toString()}\`\n > **Emojis:** \`${message.guild.emojis.cache.size}\`\n > **Creacion:** \`${createsv}\``)//descripcion del embed

  .setTimestamp()

 

    const Emojis = new Discord.MessageEmbed()//embed de la segunda opcion del menu desplegable

    .setAuthor(`Emojis del Servidor`, client.user.avatarURL())

    .setDescription(`${message.guild.emojis.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(r => r.toString()).join(" ")}`)

    .setColor("e60ad4")

    .setFooter("Impulsado por Zafiro™")

    .setTimestamp()



    const Roles = new Discord.MessageEmbed()//embed de la tercera opcion del menu desplegable

    .setAuthor(`Roles del Servidor`, client.user.avatarURL())

    .setDescription(`${message.guild.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(r => r.toString()).join(" ")}`)

    .setColor("e60ad4")

    .setFooter("Impulsado por Zafiro™")

    .setTimestamp()



    })

  }



}//Fin del Comando