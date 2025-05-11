const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const children = require('../schemas/children')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check")
        .setDescription('Check who the Chore Cow is currently nudging'),
    async execute(interaction) {
        const data = await children.find();

        if (data.length === 0) {
            await interaction.reply({ content: ':prohibited::cow2::prohibited: The Chore Cow it not watching any children!', flags: MessageFlags.Ephemeral});
        }
        else {
            var values = [];
            await data.forEach(async d => {
                values.push(d.name);
            });
            await interaction.reply(`${values.join('\n')}`);
        }
    },
}