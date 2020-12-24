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
}



exports.help = {
    name: "helpme"
};