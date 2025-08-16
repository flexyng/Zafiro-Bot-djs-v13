const { Client, Interaction } = require("discord.js");
const Prefix = "z!";
const Ticket = require("../../Models/Ticket");
const TicketsCount = require("../../Models/Tickets");
const fs = require("fs");
const emojis = require("../../emojis");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        if (interaction.customId === "ticket") {
            await interaction.reply({ content: `${emojis.positivo} | Creando ticket, espera un momento...`, ephemeral: true });
            const tickets = await TicketsCount.find();
            const ticket = await Ticket.findOne({ userId: interaction.user.id });
            if (ticket) {
                return interaction.editReply({ content: `${emojis.positivo} | Usted ya cuenta con un ticket creado, <#${ticket.channelId}>`, ephemeral: true });
            }
            const nct = new Ticket({
                userId: interaction.user.id,
                ticketId: parseInt(tickets.length + 1),
                messages: []
            });
            await nct.save();
            const ntsc = new TicketsCount({
                tickets: parseInt(tickets.length + 1)
            });
            await ntsc.save();
            interaction.guild.channels.create(`ticket-${nct.ticketId}`, {
                permissionOverwrites: [
                ],
                parent: "1000897004769128508"
            }).then(async (channel) => {
            });
        }
        if (interaction.customId === "cerrar") {
            const findTicket = await Ticket.findOne({ userId: interaction.user.id });
            if (!findTicket) {
                return interaction.reply({ content: "No tienes ningun ticket creado...", ephemeral: true });
            }
            await interaction.reply({ content: "Ticket eliminado correctamente", ephemeral: true });
            const ch = interaction.guild.channels.cache.get(findTicket.channelId);
            setTimeout(async () => {
            }, 1000);
        }
    }
};
