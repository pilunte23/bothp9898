
totalpv = 0;
damage = 0;
contreMesure = 0;
indice = 0;


exports.run = async (client, message, args) => {

    console.log(args);
   
    if (message.channel.name.startsWith("group") && !isNaN(args[0])){
        degat = args[0]
        damage = damage + parseInt(args[0])
        restant = totalpv - damage
        SendMessagetoGroup('Le **'+message.channel.name+'** ajoute **'+degat+'**<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965> : il lui reste **'+restant+'**/**'+totalpv+'**')         
    }
    if (args[0] == "init"){
        if (!isNaN(args[1])){
            totalpv = 15 * args[1]
            contreMesure = Math.ceil(args[1]/2)
            indice =  2 * args[1]
            damage = 0
            SendMessagetoGroup("Total PV <:jelly:733931040942587965> : **"+totalpv+"**\n Total <:TokenClue:443357925369577482> Acte 1 : **"+indice+"**\n Contre mesure : **"+contreMesure+"**")
        }
        else{
            message.channel.send("Il faut mettre le nombre de participant");
        }
    }

    if (args[0] == "cm"){
        contreMesure = contreMesure--
        SendMessagetoGroup('\:warning: Le **'+message.channel.name+'** utilise **1 Contre-Mesure** , il en reste **'+contreMesure+'**') 
    }

    if (args[0] == "i"){
        if (!isNaN(args[1])){
            indice  = indice - parseInt(args[1])
            SendMessagetoGroup('Le **'+message.channel.name+'** depose **'+parseInt(args[1])+' Indice(s)** , il en reste **'+indice+'**') 
        }else
        {
            indice = indice--
            SendMessagetoGroup('Le **'+message.channel.name+'** depose **1 Indice** , il en reste **'+indice+'**') 
        }       
    }  
}

async function SendMessagetoGroup(text) {
    await client.channels.cache.filter(async chan => await chan.name.startsWith("group").forEach(async channel => { await channel.send(text)})) 
}

exports.help = {
    name: "helpme"
};