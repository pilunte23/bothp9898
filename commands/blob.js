const { MessageEmbed } = require('discord.js');

totalpv = 0;
damage = 0;
contreMesure = 0;
indice = 0;
initialIndice = 0;

exports.run = (client, message, args) => {

    console.log(args);
   
    if (message.channel.name.startsWith("group") && !isNaN(args[0])){
        degat = args[0]
        damage = damage + parseInt(args[0])
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
            initialIndice = indice
            damage = 0
            message.channel.send("Total PV <:jelly:733931040942587965> : **"+totalpv+"**\n Total <:TokenClue:443357925369577482> Acte 1 : **"+indice+"**\n Contre mesure : **"+contreMesure+"**")
        }
        else{
            message.channel.send(client,"Il faut mettre le nombre de participant");
        }
    }
   
    if (args[0] == "cm"){
        if (args[1] == "+"){
            contreMesure = contreMesure + 1
            client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
                channel.send('\:warning: Le **'+message.channel.name+'** utilise **1 Contre-Mesure** , il en reste **'+contreMesure+'**')
            })
        }
        if (args[1] == "-" || args[1] == ""){
            contreMesure = contreMesure - 1
            client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
                channel.send('\:warning: Le **'+message.channel.name+'** utilise **1 Contre-Mesure** , il en reste **'+contreMesure+'**')
            })
        }
        

    }

    if (args[0] == "i" || args[0] == "indice"){
        if (!isNaN(args[1])){
            indice  = indice - parseInt(args[1])
            client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
                channel.send('Le **'+message.channel.name+'** depose **'+parseInt(args[1])+'<:TokenClue:443357925369577482>** , il en reste **'+indice+'**')
            })
        }else
        {
            indice = indice - 1
            client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
                channel.send('Le **'+message.channel.name+'** depose **1 <:TokenClue:443357925369577482>** , il en reste **'+indice+'**')
            })
        }       
    }

    if (args[0] == "reset"){
        indice  = initialIndice
        client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {          
            channel.send('Reinitialisation Acte 1 à **'+indice+'<:TokenClue:443357925369577482>**')
            })
    }

    if (args[0] == "help" || args[0] == "aide" ){
        let embed = new MessageEmbed()
            .setTitle("Aide Dévoreur de Toute Chose")
            .setThumbnail('http://localhost/image/jelly.png')
            .setColor("#67C355")
            .addField("Toute les commandes pour l'evenement commencent par !blob.", " Le !b peut être utilisé en raccourci")
            .addField("!blob suivi d'un chiffre ", "Inflige le nombre de degat au Dévoreur")
            .addField("!blob i", "Retire un indice sur l'acte 1")
            .addField("!blob i suivi d'une chiffre", "Retire le nombre indiqué d'indice sur l'acte 1")
            .addField("!blob cm", "Utilise une contre mesure")
            .addField("!blob cm +", "(Cas rare) Ajout une contre mesure.")
            .addField("!blob eat", "Permet de savoir quel aspect de la réalité est dévoré (a faire peut etre)")
        message.reply(embed);
    }
    if (args[0] == "welcome"){
        let embed = new MessageEmbed()
            .setTitle("Vous voila face au **Dévoreur de Toute Chose**")
            .setColor("#67C355")
            .setImage('http://localhost/image/green.png')
            .addField("Toute les commandes pour l'evenement commencent par !blob.", "Le !b peut être utilisé en raccourci")
            .addField("!blob help ou !blob aide", "Pour obtenir la liste des commandes à tout moment")
        message.reply(embed);
    }
    if (args[0] == "admin"){
        let embed = new MessageEmbed()
            .setTitle("Administration Dévoreur de Toute Chose")
            .setThumbnail('http://localhost/image/jelly.png')
            .setColor("#67C355")
            .addField("!blob init suivi d'un chiffre ", "Initialistions des compteurs selon le nombre de participants")
            .addField("!blob reset", "Reinitialise les indices de l'acte 1")
            .addField("!blob story", "Selectionne aléatoirement et Annonce l'histoire selectionné à chaque groupe (a faire)")
            .addField("!blob fixPV suivi d'un chiffre", "Refixe le nombre de PV suite missplay ou crashbot (a faire)")
            .addField("!blob fixI suivi d'un chiffre", "Refixe le nombre d'indice suite missplay ou crashbot (a faire)")
            .addField("!blob fixCM suivi d'un chiffre", "Refixe le nombre de contre mesure suite missplay ou crashbot (a faire)")
        message.author.send(embed);
    }

}

exports.help = {
    name: "blob"
};