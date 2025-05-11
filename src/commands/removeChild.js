const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require('discord.js');
const children = require('../schemas/children')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove_child')
        .setDescription('Remove a child from the Chore Cows watch')
        .addUserOption(option => option.setName('user').setDescription('User of the child').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const { options } = interaction;
        const childUser = options.getUser('user');

        const childExists = await children.exists({_id: childUser.id});
        console.log(childExists);
        if (childExists === null) {
            await interaction.reply({content: `:prohibited::cow2::prohibited: ${childUser.username} is not being watched by the Chore Cow!`, flags: MessageFlags.Ephemeral});
        }
        else {
            const childToDelete = await children.findById(childUser.id).exec();
            const childName = childToDelete.name;
            await children.deleteOne({ _id: childUser.id });
            await interaction.reply(`:white_check_mark::cow2::white_check_mark: ${childName} will no longer be watched by the Chore Cow`);
        }
    },
}