const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setTitle("Aide")
        .setDescription("Voici les commandes pour vous aider mon ami")
        .setColor("#9B59B6")
        .addField("!carte ou !card ou le raccourci !c ou !! ", "suivi d'une chaine de caractère pour chercher la valeur sur http://arkhamdb.fr.cr/")
        .addField("!rules ou le raccourci !r", "donne la liste des points de règles, saisir !rules suivi d'un point de règle pour avoir l'explication (Sensible à la casse)")
        .addField("!search ou le raccourci !s ", "suivi d'un mot pour avoir tous les points de règles contant ce mot, saisir ensuite !rules suivi d'un point de règle pour avoir l'explication")
        .addField("!phase ou le raccourci !p", "Affiche les différentes phases")
        .addField("!timing ou le raccourci !t", "Affiche le timing des compétences")
        .addField("!bag", "Pioche un jeton dans le Chaos Bag")       
        .addField("!tabous ou le raccourci !tb", "Affiche la règle d'utilisation et la liste des cartes tabous")
        .addField("!ahlcgnews ", "Affiche la dernière news Arkham Horror LCG sur fantasyflightgames.com ")
        .addField("!hajcenews ", "Affiche la dernière news Horreur à Arkham JCE sur fantasyflightgames.fr ")
        .addField("!hav3news ", "Affiche la dernière news Horreur à Arkham V3 sur fantasyflightgames.fr ")
        .addField("!chnews ", "Affiche la dernière news de Contrée de l'horreur sur fantasyflightgames.fr")
        .addField("!denews ", "Affiche la dernière news de Demeure de l'Epouvante sur fantasyflightgames.fr")   
    message.author.send(embed);
}

exports.help = {
    name: "helpme"
};