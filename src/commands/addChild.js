const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const children = require('../schemas/children');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add_child')
        .setDescription('Add a child for the Chore Cow to start watching')
        .addUserOption(option => option.setName('user').setDescription('User of the new child').setRequired(true))
        .addStringOption(option => option.setName('name').setDescription('Name of the new child').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const { options } = interaction;
        const childUser = options.getUser('user');
        const childName = options.getString('name');

        const childExists = await children.exists({_id: childUser.id});
        if (childExists !== null) {
            await interaction.reply({content: `:prohibited::cow2::prohibited: ${childName} is already being watched by the Chore Cow!`, flags: MessageFlags.Ephemeral});
        }
        else {
            await children.create({
                _id: childUser.id,
                name: childName,
                complete: false
            });
            await interaction.reply(`:white_check_mark::cow2::white_check_mark: ${childName} will now be watched by the Chore Cow`);
        }
    },
}