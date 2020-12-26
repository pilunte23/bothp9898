const { MessageEmbed,MessageAttachment } = require('discord.js');
const imgJelly = new MessageAttachment('image/jelly.png');
const imgGreen = new MessageAttachment('image/green.png');
const adminEventChannel = "groupe-admin-event";
totalpv = 0;
damage = 0;
contreMesure = 0;
indice = 0;
initialIndice = 0;
timer = 0;
count = 0;

exports.run = (client, message, args) => {

    console.log(args);
    //Command for players
    if (message.channel.name.startsWith("group") && !isNaN(args[0])){
        degat = args[0]
        damage = damage + parseInt(args[0])
        restant = totalpv - damage
        if (restant > 0){
            SendMessage(client,'Le **'+message.channel.name+'** ajoute **'+degat+'**<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965> : il lui reste **'+restant+'**/**'+totalpv+'**')       
        }else
        {
            SendMessage(client,'**Félicitation** les \:spy: ont vaincu \:skull_crossbones:<:jelly:733931040942587965>\:skull_crossbones:')       
        }    
    }
 
    if (args[0] == "cm"){
        if (args[1] == "+"){
            contreMesure = contreMesure + 1
            SendMessage(client,'\:ok_hand: Bonne nouvelle, Le **'+message.channel.name+'** ajoute **1 Contre-Mesure** , il en reste **'+contreMesure+'**')
        }
        if (args[1] == "-" || args[1] == null){
            if (contreMesure > 0){
                contreMesure = contreMesure - 1
                SendMessage(client,'\:warning: Le **'+message.channel.name+'** utilise **1 Contre-Mesure** , il en reste **'+contreMesure+'**')
            }else
            {
                message.channel.send("Désolé les \:spy:, vous n'avez plus de **Contre-Mesure** ; il en reste 0");
            }
        }
    }

    if (args[0] == "i" || args[0] == "indice"){
        if (!isNaN(args[1])){
            indice  = indice - parseInt(args[1])
            if (indice > 0){
                SendMessage(client,'Le **'+message.channel.name+'** depose **'+parseInt(args[1])+'<:TokenClue:443357925369577482>**, il en reste **'+indice+'**<:TokenClue:443357925369577482> à trouver')       
            }else
            {
                SendMessage(client,'@Event,**Félicitation** les \:spy: ont découvert la totalité des <:TokenClue:443357925369577482>, dès le prochain round passer à l acte 2')
            }
           
        }else
        {
            indice = indice - 1
            if (indice > 0){
                SendMessage(client,'Le **'+message.channel.name+'** depose **1 <:TokenClue:443357925369577482>** , il en reste **'+indice+'**<:TokenClue:443357925369577482> à trouver')
            }else
            {
                SendMessage(client,'@Event, **Félicitation** les \:spy: ont découvert la totalité des <:TokenClue:443357925369577482>, dès le prochain round passer à l acte 2')
            }
                  
        }       
    }

    if (args[0] == "help" || args[0] == "aide" ){
        let embed = new MessageEmbed()
            .setTitle("Aide Dévoreur de Toute Chose")
            .attachFiles(imgJelly)
            .setThumbnail('attachment://jelly.png')
            .setColor("#67C355")
            .addField("Toutes les commandes pour l'evenement commencent par !blob.", " Le !b peut être utilisé en raccourci")
            .addField("!blob suivi d'un chiffre ", "Inflige le nombre de degat au Dévoreur")
            .addField("!blob i", "Retire un indice sur l'acte 1")
            .addField("!blob i suivi d'une chiffre", "Retire le nombre indiqué d'indice sur l'acte 1")
            .addField("!blob cm", "Utilise une contre mesure")
            .addField("!blob cm +", "(Cas rare) Ajout une contre mesure.")
            .addField("!blob eat", "Permet de savoir quel aspect de la réalité est dévoré (a faire peut etre)")
            message.channel.send(embed);
    }
    //Command for admin
    if (args[0] == "welcome" && message.channel.name == adminEventChannel){
        let embed = new MessageEmbed()
            .setTitle("**Dévoreur de Toute Chose**")
            .setColor("#67C355")
            .attachFiles(imgGreen)
            .setImage('attachment://green.png')
            .addField("Toutes les commandes pour l'evenement commencent par !blob.", "Le !b peut être utilisé en raccourci")
            .addField("!blob help ou !blob aide", "Pour obtenir la liste des commandes à tout moment")
            SendMessage(client,embed)
    }
    
    if (args[0] == "admin" && message.channel.name == adminEventChannel){
        let embed = new MessageEmbed()
            .setTitle("Administration Dévoreur de Toute Chose")
            .attachFiles(imgJelly)
            .setThumbnail('attachment://jelly.png')
            .setColor("#67C355")
            .addField("!blob init suivi d'un chiffre ", "Initialisation des compteurs selon le nombre de participants")
            .addField("!blob timer ", "Lance le timer si pas de chiffre indiqué alors 180 minutes (a faire)")
            .addField("!blob reset", "Reinitialise les indices de l'acte 1")
            .addField("!blob story", "Selectionne aléatoirement et Annonce l'histoire selectionné à chaque groupe (a faire)")
            .addField("!blob stats", "Diffuse les statistiques par groupe (a faire)")
            .addField("Commande de Maintenance", "**Les commandes dont on espere ne pas avoir besoin**")
            .addField("!blob repair", "Envoi un message indiquant qu'on remet d'aplomb les valeurs")
            .addField("!blob go", "Message indiquant la reprise de l'event")
            .addField("!blob fixD suivi d'un chiffre", "Refixe le nombre de dégat suite missplay ou crashbot")
            .addField("!blob fixI suivi d'un chiffre", "Refixe le nombre d'indice suite missplay ou crashbot")
            .addField("!blob fixCM suivi d'un chiffre", "Refixe le nombre de contre mesure suite missplay ou crashbot")
            .addField("!blob fixT suivi d'un chiffre", "Refixe le timer (a faire)")
            message.channel.send(embed);
    }

    if (args[0] == "init" && message.channel.name == adminEventChannel){
        if (!isNaN(args[1])){
            totalpv = 15 * args[1]
            contreMesure = Math.ceil(args[1]/2)
            indice =  2 * args[1]
            initialIndice = indice
            damage = 0
            SendMessage(client,"Total PV <:jelly:733931040942587965> : **"+totalpv+"**\n Total <:TokenClue:443357925369577482> Acte 1 : **"+indice+"**\n Contre mesure : **"+contreMesure+"**")
        }
        else{
            message.channel.send(client,"Il faut mettre le nombre de participant");
        }
    }

    if (args[0] == "reset" && message.channel.name == adminEventChannel){
        indice  = initialIndice
        SendMessage(client,'Reinitialisation Acte 1 à **'+indice+'<:TokenClue:443357925369577482>**')
    }
    if (args[0] == "repair" && message.channel.name == adminEventChannel){
        SendMessage(client,'\:tools: **@Event Un peu de patience nous remettons les valeurs**\:tools:')
    }
    if (args[0] == "go" && message.channel.name == adminEventChannel){
        SendMessage(client,'\:ok_hand: **@Event, Reprise de la partie **\:ok_hand:')
    }
    if (args[0] == "fixI" && message.channel.name == adminEventChannel){
        indice = parseInt(args[1])
        message.channel.send('\:tools: Compteur <:TokenClue:443357925369577482> remis à '+indice+'**')
    }
    if (args[0] == "fixD" && message.channel.name == adminEventChannel){
        damage = parseInt(args[1])
        message.channel.send('\:tools: Compteur <:TokenDamage:443355098773585920> remis à '+damage+'**')
    }
    if (args[0] == "fixCM" && message.channel.name == adminEventChannel){
        contreMesure = parseInt(args[1])
        message.channel.send('\:tools: Compteur Contre-Mesure remis à '+contreMesure+'**');
    }
    if (args[0] == "timer" && message.channel.name == adminEventChannel){
        if (!isNaN(args[1])){
        //temps en miliseconde  
            timeInMinute = parseInt(args[1])
            timer = timeInMinute * 60000   
            message.channel.send('Mise en place d un timer de '+timeInMinute+' minutes')
        }
        rest = 0
        var interval = setInterval (function () {
            count = count + 1
            rest = timeInMinute - count
            if (rest > 10){
                message.channel.send('Il reste '+rest+' minute(s)')
                if (timeInMinute % 10 == 0){
                    SendMessage(client,'\:spy: Il reste '+rest+' minute(s)')
                }        
            }else
            {
                message.channel.send('Il reste '+rest+' minute(s)')
                SendMessage(client,'\:spy: Il reste '+rest+' minute(s)')
            }   
        }, 60000 );   
    }
}

function SendMessage(client,messagetoGroup){
    client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {channel.send(messagetoGroup)})
}

exports.help = {
    name: "blob"
};