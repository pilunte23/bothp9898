const { Collection } = require('discord.js');
const Discord = require('discord.js');
const constants = require('./constants.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require("fs");

//const jsdom = require("jsdom");
//const { JSDOM } = require('jsdom');
//const roles = ["Gardien", "Truand", "Chercheur", "Mystique", "Survivant"];
//const reactions = ["443359750353190912", "443359489811546112", "443359627195973634", "443359703771250688", "443359575131947008"];
//collections des commandes valides
client.commands = new Collection();
client.user.setAvatar('usr/src/bot/image/avatar.jpg')
//chargement des evenements
fs.readdir("./events/", (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith(".js")) return undefined;
        const event = require(`./events/${file}`);
        const eventName = file.split(".")[0];
        console.log(`Evenement ${eventName} chargé.`);
        client.on(eventName, event.bind(null, client));
    });
});

//chargement des commandes
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith(".js")) return undefined;
        const props = require(`./commands/${file}`);
        const cmdName = file.split(".")[0];
        console.log(`Commande ${cmdName} chargée.`);
        client.commands.set(cmdName, props);
    });
});

client.login(constants.TOKEN).catch(console.error);
client.on("error", console.error);
client.on("warn", console.warn);