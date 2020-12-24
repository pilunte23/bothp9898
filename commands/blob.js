const { MessageEmbed } = require('discord.js');

totalpv = 0;
damage = 0;
contreMesure = 0;
indice = 0;


exports.run = (client, message, args) => {

    console.log(args);

    //si le premier argument est numerique c'est la commande de base pour enlever des pv
    if (isNaN(args[0] )){
        {
            if (args[0] == "init"){
                                    
            }
            if (args[0] == "heal"){
    
            }
        } 
    }
    else
    {  
        degat = args[0]
        client.channels.cache.filter(chan => chan.name.startsWith("group") && chan.category === "text").forEach(channel => {
            restant = pv - damage
            channel.send('Le ${chan.name} ajoute ${degat}<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965> : il lui reste ${restant}/${pv}')
            })     
    }
}



exports.help = {
    name: "helpme"
};