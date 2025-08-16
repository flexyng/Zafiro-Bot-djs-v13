const Discord = require("discord.js")
const axios = require('axios')

module.exports = {

    name: "banner",

    aliases: ["cartel"],

    description: "Muestra el banner de alguien.",

    async execute(message, args, commandName, client, Discord) {

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        try {
            const data = await
                axios.get(`https://discord.com/api/users/${user.id}`, {
                    headers: {
                        Authorization: `Bot ${client.token}`
                    }
                }).then(d => d.data);
            if (data.banner) {
                let url = data.banner.startsWith("a_") ? '.gif?size=4096' : '.png?size=4096';
                url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
                let avatar = user.displayAvatarURL({ dynamic: true })
                const embed = new Discord.MessageEmbed()
                    .setColor(`RANDOM`)
                    .setTitle(`Banner de ${user.tag}`)
                    .setImage(url)
                    .setThumbnail(avatar)
                message.channel.send({ embeds: [embed] })
            } else {
                message.reply({ content: `Este usuario no tiene banner!` })
            };
        } catch (err) {
            console.log(err)
        }
    }
}