const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setTitle("Aide")
        .setDescription("Voici les commandes pour vous aider mon ami")
        .setColor("#9B59B6")
        .addField("!rules ", "donne une liste de règles expliquées , saisir !rules plus un terme pour avoir l'explication")
        .addField("!carte ou !card ", "suivi d'une chaine de caractère pour chercher la valeur sur http://arkhamdb.fr.cr/")
        .addField("!ahnews ", "Affiche la derniere news Arkham Horror LCG sur fantasyflightgames.com ")
        .addField("!hanews ", "Affiche la derniere news Horreur à Arkham JCE sur fantasyflightgames.fr ")
        .addField("!hav3news ", "Affiche la dèrniere news Horreur à Arkham V3 sur fantasyflightgames.fr ")
        .addField("!chnews ", "Affiche la derniere news de Contrée de l'horreur sur fantasyflightgames.fr")
        .addField("!denews ", "Affiche la derniere news de Demeure de l'Epouvante sur fantasyflightgames.fr")
    message.author.send(embed);
}

exports.help = {
    name: "help"
};