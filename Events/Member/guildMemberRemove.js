const { Client, GuildMember, MessageEmbed } = require("discord.js");
const Muted = require("../../Models/Muted");
const MutedRole = require("../../Models/MutedRole");

module.exports = {
   name: "guildMemberRemove",
   /**
    * @param {Client} client
    * @param {GuildMember} member
    */
   async execute(member) {
      if (member.guild.id !== "965584595850526770") {
         return;
      }

      const channel = await member.guild.channels.cache.get("1221158512281780234");
      channel.send({ content: `${member.user.username} ha abandonado el servidor :wave:` });
   }
}
