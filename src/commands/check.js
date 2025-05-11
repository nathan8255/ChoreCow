const { SlashCommandBuilder } = require('discord.js');
const children = require('../schemas/children')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check")
        .setDescription('Check who the cow is currently nudging'),
    async execute(interaction) {
        const data = await children.find();

        var values = [];
        await data.forEach(async d => {
            values.push(d.name);
        });

        await interaction.reply(`${values.join('\n')}`);
    },
}