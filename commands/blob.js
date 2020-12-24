const { MessageEmbed } = require('discord.js');

vie = 0;
contreMesure = 0;
text_channel_list = [];

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
            channel.send('<:jelly:733931040942587965> take ${degat}<:TokenDamage:443355098773585920>')
            })     
    }
}



exports.help = {
    name: "helpme"
};