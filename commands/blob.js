const { MessageEmbed } = require('discord.js');

vie = 0;
contreMesure = 0;
text_channel_list = [];

exports.run = (client, message, args) => {

    console.log(args);

    //si le premier argument est numerique c'est la commande de base pour enlever des pv
    if (isNaN(args[0] )){
        message.guild.channels.cache.forEach(chan => 
            {if (chan.startsWith("groupe")){chan.send("Pong !"); }
            }
        )
    }
    else
    {
        if (arg[0] == "init"){
                                
        }
        if (arg[0] == "heal"){

        }
    }
 


exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setTitle("Dévoreur de de toute chose")
        .setDescription("Initialisation de l'experience")
        .setColor("#9B59B6")
        .addField("Nombre de point de vie ", "suivi d'une chaine de caractère pour chercher la valeur sur http://arkhamdb.fr.cr/")
        .addField("!rules ou le raccourci !r", "donne la liste des points de règles, saisir !rules suivi d'un point de règle pour avoir l'explication (Sensible à la casse)")
        .addField("!search ou le raccourci !s ", "suivi d'un mot pour avoir tous les points de règles contant ce mot, saisir ensuite !rules suivi d'un point de règle pour avoir l'explication")
        .addField("!phase ou le raccourci !p", "Affiche les différentes phases")
        .addField("!timing ou le raccourci !t", "Affiche le timing des compétences")
    message.author.send(embed);
}

exports.help = {
    name: "helpme"
};