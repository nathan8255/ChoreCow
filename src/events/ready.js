const { Events, ActivityType } = require('discord.js');
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {

        client.user.setActivity({
            name: "Grazing 🌿",
            type: ActivityType.Custom
        });

        console.log('The cow has awoken');

        if (!MONGO_URL) return;

        await mongoose.connect(MONGO_URL || '');

        if (mongoose.connect) {
            console.log('Database connected');
        }
        else {
            console.log('Can\'t connect to database')
        }
    },
};