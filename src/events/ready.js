const { Events, ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const children = require('../schemas/children');

const MONGO_URL = process.env.MONGO_URL;

async function messageChildren(client, message) {
    const now = new Date();
    console.log('Triggering chore reminder messages @ ' + now.toISOString());
    try {
        const childrenSchema = await children.find();

        if (childrenSchema.length === 0) {
            console.log('No reminders sent because there are no children');
        }
        else {
            var count = 0;
            for (const child of childrenSchema) {
                if (!child.complete && child._id) {
                    try {
                        const childUser = await client.users.fetch(child._id.toString());
                        await childUser.send(message);
                        count++;
                    } catch (err) {
                        console.error(`Failed to notify user ${child.name}:`, err);
                    }
                }
            }
            console.log(count + ' reminders sent')
        }
    } catch (err) {
        console.error('Failed to fetch children from DB:', err);
    }
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        client.user.setActivity({
            name: 'Grazing 🌿',
            type: ActivityType.Custom
        });
        console.log('The cow has awoken');

        if (!MONGO_URL) return;

        try {
            await mongoose.connect(MONGO_URL);
            console.log('Database connected');
        } catch (err) {
            console.error('Database connection failed:', err);
        }

        //Check the time every minute and send reminders at the determined times
        let lastRun = null;
        setInterval(async () => {
            const now = new Date();

            if (lastRun?.getDate() !== now.getDate() && lastRun?.getHours() !== now.getHours() && lastRun?.getMinutes() !== now.getMinutes) {
                //Thursday @ 3am
                if (now.getDay() === 4 && now.getHours() === 15 && now.getMinutes() === 0) {
                    lastRun = new Date(now);
                    await children.find().updateMany({complete: false}); //Set every completion status to false
                    messageChildren(client, ':wave::cow2: Chore period has begun! Check the chore chart if you haven\'t already');
                }
                //Friday @ 3pm
                else if (now.getDay() === 5 && now.getHours() === 15 && now.getMinutes() === 0) {
                    lastRun = new Date(now);
                    messageChildren(client, ':cow2: Your chores have not been completed yet');
                }
                //Saturday @ 8pm
                else if (now.getDay() === 6 && now.getHours() === 8 && now.getMinutes() === 0) {
                    lastRun = new Date(now);
                    messageChildren(client, ':cow2: Your chores have not been completed yet');
                }
                //Sunday @ 8am
                else if (now.getDay() === 0 && now.getHours() === 8 && now.getMinutes() === 0) {
                    lastRun = new Date(now);
                    messageChildren(client, ':bell::cow2: Today is the last day to complete your chores');
                }
                //Sunday @ 6pm
                else if (now.getDay() === 0 && now.getHours() === 6 && now.getMinutes() === 0) {
                    lastRun = new Date(now);
                    messageChildren(client, ':rotating_light::cow2::rotating_light: You only have 6 hours left to complete your chores!');
                }
                //Sunday @ 11pm
                else if (now.getDay() === 0 && now.getHours() === 11 && now.getMinutes() === 0) {
                    lastRun = new Date(now);
                    messageChildren(client, ':crossed_swords::cow2::crossed_swords: Final hour to complete your chores!!!');
                }
            }
        }, 60_000);
    },
};