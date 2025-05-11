const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const children = require('../schemas/children')

const CHANNEL_ID = process.env.CHANNEL_ID;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("complete")
        .setDescription('Stop the Chore Cow from nudging you by marking your weekly chores as complete'),
    async execute(interaction) {
        const child = await children.findOne({_id: interaction.user.id});

        if (child !== null) {
            if (child.complete) {
                await interaction.reply({ content: ':prohibited::cow2::prohibited: The Chore Cow is not currently waiting' + 
                    ' for you to complete your chores', flags: MessageFlags.Ephemeral});
            }
            else {
                await child.updateOne({complete: true});
                await interaction.reply({ content: 'The Chore Cow takes note of' + 
                    ' your completion and will stop nudging you for the week :people_hugging::cow2:', flags: MessageFlags.Ephemeral});

                const data = await children.find(); 
                var totalCompleted = 0;   
                await data.forEach(async d => {
                    if (d.complete) {
                        totalCompleted++;
                    }
                });
                if (data.length === totalCompleted) {
                    const now = new Date();
                    interaction.client.channels.cache.get(CHANNEL_ID).send(':tada::cow2::tada: All chores completed on ' + now.toDateString() + '!');
                }
            }
        }
        else {
            await interaction.reply({ content: ':prohibited::cow2::prohibited: Your are not being watched by the Chore Cow', 
                flags: MessageFlags.Ephemeral});
        }
    },
}