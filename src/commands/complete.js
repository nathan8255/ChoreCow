const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("complete")
        .setDescription('Stop the cow from nudging you by marking your weekly chores as complete'),
    async execute(interaction) {
        await interaction.reply(`${interaction.user.username}\'s chores set as complete :cow2:`);
    },
}