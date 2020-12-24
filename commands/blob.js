const { MessageEmbed } = require('discord.js');

totalpv = 0;
damage = 0;
contreMesure = 0;
indice = 0;


exports.run = (client, message, args) => {

    console.log(args);

    //channel.send('Le ${channel.name} ajoute ${degat}<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965> : il lui reste ${restant}/${pv}')
    degat = args[0]
    console.log(client.channels.cache)
    client.channels.cache.filter(chan => chan.name.startsWith("group") && chan.category === "text").forEach(channel => {
        console.log(chan.name)
        channel.send('<msg>')
        })    
    
}

exports.help = {
    name: "helpme"
};