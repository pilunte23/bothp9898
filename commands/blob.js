totalpv = 0;
damage = 0;
contreMesure = 0;
indice = 0;
initialIndice = 0;

<<<<<<< HEAD
exports.run = (client, message, args) => {
=======
exports.run = (client,message, args) => {
>>>>>>> abbfdcc01f3be39ea73995bb2c1210439ed2f2f3

    console.log(args);
   
    if (message.channel.name.startsWith("group") && !isNaN(args[0])){
        degat = args[0]
        damage = damage + parseInt(args[0])
        restant = totalpv - damage
        SendMessagetoGroup(client,'Le **'+message.channel.name+'** ajoute **'+degat+'**<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965> : il lui reste **'+restant+'**/**'+totalpv+'**')         
    }
    if (args[0] == "init"){
        if (!isNaN(args[1])){
            totalpv = 15 * args[1]
            contreMesure = Math.ceil(args[1]/2)
            indice =  2 * args[1]
            initialIndice = indice
            damage = 0
            message.channel.send("Total PV <:jelly:733931040942587965> : **"+totalpv+"**\n Total <:TokenClue:443357925369577482> Acte 1 : **"+indice+"**\n Contre mesure : **"+contreMesure+"**")
        }
        else{
            message.channel.send(client,"Il faut mettre le nombre de participant");
        }
    }
   
    if (args[0] == "cm"){
        contreMesure = contreMesure--
        client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
            channel.send('\:warning: Le **'+message.channel.name+'** utilise **1 Contre-Mesure** , il en reste **'+contreMesure+'**')
            })
    }

    if (args[0] == "i"){
        if (!isNaN(args[1])){
            indice  = indice - parseInt(args[1])
            client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
                channel.send('Le **'+message.channel.name+'** depose **'+parseInt(args[1])+' Indice(s)** , il en reste **'+indice+'**')
                })
        }else
        {
            indice = indice--
            client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
                channel.send('Le **'+message.channel.name+'** depose **1 Indice** , il en reste **'+indice+'**')
                })
        }       
    }
    if (args[0] == "reset"){
        if (!isNaN(args[1])){
            indice  = initialIndice
            client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
                channel.send('Reinitialisation du nombre d indice Acte 1 à **'+indice+'**')
                })
        }  
    }    

}

exports.help = {
    name: "blob"
};