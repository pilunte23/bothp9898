const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setTitle("Aide")
        .setDescription("Voici les commandes pour vous aider mon ami")
        .setColor("#9B59B6")
        .addField("!carte ou !card ", "suivi d'une chaine de caractère pour chercher la valeur sur http://arkhamdb.fr.cr/")
        .addField("!rules ", "donne une liste des règles, saisir !rules suivi d'un terme pour avoir l'explication")
        .addField("!search ", "suivi d'un mot pour avoir tous les points de règles contant ce mot, saisir !rules suivi d'un terme pour avoir l'explication")
        .addField("!tabous ", "Affiche la règle d'utilisation et la liste des cartes tabous")
        .addField("!ahlcgnews ", "Affiche la derniere news Arkham Horror LCG sur fantasyflightgames.com ")
        .addField("!hajcenews ", "Affiche la derniere news Horreur à Arkham JCE sur fantasyflightgames.fr ")
        .addField("!hav3news ", "Affiche la dèrniere news Horreur à Arkham V3 sur fantasyflightgames.fr ")
        .addField("!chnews ", "Affiche la derniere news de Contrée de l'horreur sur fantasyflightgames.fr")
        .addField("!denews ", "Affiche la derniere news de Demeure de l'Epouvante sur fantasyflightgames.fr")
    message.author.send(embed);
}

exports.help = {
    name: "help"
};