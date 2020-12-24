const { MessageEmbed } = require('discord.js');

vie = 0;
contreMesure = 0;
text_channel_list = [];

exports.run = (client, message, args) => {

    console.log(args);

    //si le premier argument est numerique c'est la commande de base pour enlever des pv
    if (isNaN(args[0] )){
        {
            if (arg[0] == "init"){
                                    
            }
            if (arg[0] == "heal"){
    
            }
        } 
    }
    else
    {
        member.guild.channels.cache.find(chan => 
            {console.log(chan.name)
             if (chan.name.startsWith("groupe")){chan.send("Pong !"); }
            }
        )
    }
}



exports.help = {
    name: "helpme"
};