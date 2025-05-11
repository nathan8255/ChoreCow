const { SlashCommandBuilder } = require('discord.js');
const children = require('../schemas/children')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("complete")
        .setDescription('Stop the Chore Cow from nudging you by marking your weekly chores as complete'),
    async execute(interaction) {
        await children.create({
            _id: interaction.user.username,
            complete: true
        });
    },
}