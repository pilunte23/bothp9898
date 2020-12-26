const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setTitle("Aide")
        .setDescription("Voici les commandes pour vous aider mon ami")
        .setColor("#9B59B6")
        .addField("!carte ou les raccourcis !c ou !! ", "suivi du nom complet ou partiel de la carte joueur(sans accent) en français ou en anglais \n Exemple : \n!! fletri ou !! fletrissement \n!! decoy pour un exemple en anglais")
        .addField("Vous pouvez également specifier le nombre d'xp ", "Par exemple fletrissement avec 3 xp \n!! fletrissement 3\nSi vous voulez la liste des cartes avec et sans xp il faut mettre 0 en option, exemple\n !! fletrissement 0")
        .addField("Pour les cartes non joueurs , vous pouvez les trouver avec leur numeros", "Les 2 premiers chiffres correspondent à la campagne (01 pour zelatrice, 02 Dunwich, 03 Carcosa etc...) \n Suivi des 3 chiffres pour le numero de la carte en bas à droite\n Exemple : la carte 42 de dunwich => !! 02042")     
        .addField("Enfin si vous souhaitez avoir le dos de la carte , il faut ajouter un b pour la back-end de la carte ", "Exemple : la carte 42 de dunwich en verso => !! 02042b")            
        .addField("!search ou le raccourci !s ", "suivi d'un mot pour avoir tous les points de règles contant ce mot, saisir ensuite !rules suivi d'un point de règle pour avoir l'explication")
        .addField("!rules ou le raccourci !r", "donne la liste des points de règles, saisir !rules suivi d'un point de règle pour avoir l'explication (Sensible à la casse, il faut saisir la valeur exacte)")
        .addField("!phase ou le raccourci !p", "Affiche les différentes phases")
        .addField("!timing ou le raccourci !t", "Affiche le timing des compétences")
        .addField("!bag", "Pioche un jeton dans le Chaos Bag")       
        .addField("!tabous ou le raccourci !tb", "Affiche la règle d'utilisation et la liste des cartes tabous")


    message.reply(embed);
}

exports.help = {
    name: "help"
};