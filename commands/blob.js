const { MessageEmbed } = require('discord.js');

totalpv = 0;
damage = 0;
contreMesure = 0;
indice = 0;


exports.run = (client, message, args) => {

    console.log(args);
   
    if (message.channel.name.startsWith("group") && !isNaN(args[0])){
        degat = args[0]
        damage = damage - parseInt(args[0])
        restant = totalpv - damage
        client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
            channel.send('Le **'+message.channel.name+'** ajoute **'+degat+'**<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965> : il lui reste **'+restant+'**/**'+totalpv+'**')
            }) 
        
    }
    if (args[0] == "init"){
        if (!isNaN(args[1])){
            totalpv = 15 * args[1]
            contreMesure = Math.ceil(args[1]/2)
            indice =  2 * args[1]
        }
        else{
            message.channel.send("Il faut mettre le nombre de participant");
        }
    }
   
}

exports.help = {
    name: "helpme"
};