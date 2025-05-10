const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check")
        .setDescription('Check who the cow is currently nudging'),
    async execute(interaction) {
        await interaction.reply("nothing yet");
    },
}