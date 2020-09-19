const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setTitle("Aide")
        .setDescription("Voici les commandes pour vous aider mon ami")
        .setColor("#9B59B6")
        .addField("!carte ou !card ou le raccourci !c ", "suivi d'une chaine de caractère pour chercher la valeur sur http://arkhamdb.fr.cr/")
        .addField("!rules ou le raccourci !r", "donne la liste des points de règles, saisir !rules suivi d'un point de règle pour avoir l'explication (Sensible à la casse)")
        .addField("!search ou le raccourci !s ", "suivi d'un mot pour avoir tous les points de règles contant ce mot, saisir ensuite !rules suivi d'un point de règle pour avoir l'explication")
        .addField("!tabous ou le raccourci !t", "Affiche la règle d'utilisation et la liste des cartes tabous")
    message.reply(embed);
}

exports.help = {
    name: "help"
};