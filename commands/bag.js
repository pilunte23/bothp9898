const { MessageEmbed } = require('discord.js');
let rand = require('../function/random.js');

exports.run = (client, message) => {
const zelatriceStandard = ["p1", "p0", "p0", "m1", "m1", "m1", "m2", "m2" , "m3", "m4", "ChaosSkull" , "ChaosSkull" , "ChaosCultist" , "ChaosTablet", "ChaosFail", "ChaosElderSign"]
const token = zelatriceStandard[rand.getRandomInt(16)]
const emojitoken = client.emojis.cache.find(emoji => emoji.name === token);
message.channel.send(`${emojitoken}`);
}

exports.help = {
    name: "bag"
};