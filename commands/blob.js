const { MessageEmbed,MessageAttachment } = require('discord.js');
const imgJelly = new MessageAttachment('image/jelly.png');
const imgGreen = new MessageAttachment('image/green.png');
const adminEventChannel = "groupe-admin-event";
initialIndice = 0;
initialPV = 0;
initialCM = 0;
restantPV = 0;
damage = 0;
contreMesure = 0;
indice = 0;
timer = 0;
timeInMinute = 0;
count = 0;
timeRest = 0;
var interval= null;
story = ['Repousser les Mi-Go', 'Désamorcer les Explosifs','Récuperer le Fragment','Secourir la Chimiste'];
groupe = [];
stats = new Map();
BigHit = 0
BigHitName = ""

exports.run = (client, message, args) => {

    console.log(args);
    //Command for players
    if (message.channel.name.startsWith("group")){
        //Gestion des Degats
        if (args[0] == "d"){
            if (timer == 0){
                message.channel.send("Commande inutilisable tant que le timer n'est pas lancé.");   
            }else
            {
                if (!isNaN(args[1])){
                    degat = args[1]
                    intDegat = parseInt(args[1])
                    if (restantPV > 0 ){
                        if (intDegat > restantPV){
                            intDegat = restantPV
                            degat = intDegat.toString()
                        }
                        if (degat > BigHit){
                            BigHit = intDegat
                            BigHitName = message.channel.name
                        }
                        damage = damage + intDegat
                        restantPV = restantPV - damage
                        addStats(message.channel.name,"damage",intDegat)
                        if (restantPV > 0 ){
                            SendMessage(client,message,'Le **'+message.channel.name+'** ajoute **'+degat+'**<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965> : il lui reste **'+restantPV+'**/**'+initialPV+'**')       
                        }
                        else
                        {
                            SendMessage(client,message,'\:information_source: Le Coup Final est porté **'+message.channel.name+'** ajoutant **'+degat+'**<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965>')
                            speed = timeInMinute - timeRest
                            SendMessage(client,message,'\:mega: **Félicitation** les \:spy: ont vaincu \:skull_crossbones:<:jelly:733931040942587965>\:skull_crossbones: en **'+speed+'** minutes')
                            clearInterval(interval);
                            timer = 0      
                        }
                    }else{
                        message.channel.send("Trop tard <:jelly:733931040942587965> est déjà vaincu.");  
                    }
                } 
            }        
        }
        //Gestion des Contre Mesure
        if (args[0] == "cm"){
            if (timer == 0){
                message.channel.send("Commande inutilisable tant que le timer n'est pas lancé.");      
            }else
            {
                if (args[1] == "+"){
                    contreMesure = contreMesure + 1
                    addStats(message.channel.name,"cmAdded",1)
                    SendMessage(client,message,'\:ok_hand: Bonne nouvelle, Le **'+message.channel.name+'** ajoute **1 Contre-Mesure** , il en reste **'+contreMesure+'**')
                }
                if (args[1] == "-" || args[1] == null){
                    if (contreMesure > 0){
                        contreMesure = contreMesure - 1
                        addStats(message.channel.name,"cmUsed",1)
                        SendMessage(client,message,'\:warning: Le **'+message.channel.name+'** utilise **1 Contre-Mesure** , il en reste **'+contreMesure+'**')
                    }else
                    {
                        message.channel.send("Désolé les \:spy:, vous n'avez plus de **Contre-Mesure** ; il en reste 0");
                    }
                }
            }          
        }
        //Gestion des Indices
        if (args[0] == "i"){
            if (timer == 0){
                message.channel.send("Commande inutilisable tant que le timer n'est pas lancé.");    
            }else
            {
                if (!isNaN(args[1])){
                    intIndice = parseInt(args[1])        
                    if (indice > 0){ 
                        if (intIndice > 3){
                            message.channel.send("Pas de tricherie, on peut pas en mettre plus de 3 indices"); 
                            return     
                        }
                        if (intIndice > indice){
                            intIndice = indice
                        }
                        indice  = indice - intIndice
                        addStats(message.channel.name,"clues",intIndice)
                        if (indice > 0){
                            SendMessage(client,message,'Le **'+message.channel.name+'** depose **'+intIndice+'<:TokenClue:443357925369577482>**, il en reste **'+indice+'**<:TokenClue:443357925369577482> à trouver')       
                        }else{
                            SendMessage(client,message,'\:information_source: Le **'+message.channel.name+'** depose le(s) dernier(s) **'+intIndice+'<:TokenClue:443357925369577482>** manquant(s)') 
                            SendMessage(client,message,'\:mega: **Félicitation** les \:spy: ont découvert la totalité des <:TokenClue:443357925369577482>, dès le prochain round passer à l acte 2')
                        } 
                    }else{
                        message.channel.send("Il n'y a plus besoin de déposer des indices pour l'instant")
                    }                        
                }else
                {
                    if (indice > 0){
                        indice = indice - 1
                        addStats(message.channel.name,"clues",1)
                        if (indice > 0){
                            SendMessage(client,message,'\ Le **'+message.channel.name+'** depose **1 <:TokenClue:443357925369577482>** , il en reste **'+indice+'**<:TokenClue:443357925369577482> à trouver')
                        }else
                        {
                            SendMessage(client,message,'\:information_source: Le **'+message.channel.name+'** depose le dernier **'+intIndice+'<:TokenClue:443357925369577482>** manquant') 
                            SendMessage(client,message,'\:mega: **Félicitation** les \:spy: ont découvert la totalité des <:TokenClue:443357925369577482>, dès le prochain round passer à l acte 2')
                        }
                    }else
                    {
                        message.channel.send("Il n'y a plus besoin de déposer des indices pour l'instant")
                    }          
                } 
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
            .addField("Utilisable uniquement quand le timer sera déclenché", "Dans les salons prévus pour l'evenement")
            .addField("!blob d suivi d'un chiffre ", "Inflige le nombre de degat au Dévoreur")
            .addField("!blob i", "Ajoute un indice sur l'acte 1")
            .addField("!blob i suivi d'une chiffre", "Ajoute le nombre indiqué d'indice sur l'acte 1")
            .addField("!blob cm", "Utilise une contre mesure")
            .addField("!blob cm +", "(Cas rare) Ajout d'une contre mesure.")
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
            SendMessage(client,message,embed)
    }
    
    if (args[0] == "admin" && message.channel.name == adminEventChannel){
        let embed = new MessageEmbed()
            .setTitle("Administration Dévoreur de Toute Chose")
            .attachFiles(imgJelly)
            .setThumbnail('attachment://jelly.png')
            .setColor("#67C355")
            .addField("Ordre conseillé des commandes", "**!b scan, !b welcome, !b init et !b timer**")
            .addField("!blob scan ", "Scanne les salons commençant par 'group' et reinitialise les stats")
            .addField("!blob welcome ", "Message d'introduction")
            .addField("!blob init suivi d'un chiffre ", "Initialisation des compteurs selon le nombre de participants")
            .addField("!blob timer (stop) ", "Lance le timer du chiffre indiqué en minutes, arret de timer avec stop")
            .addField("!blob reset", "Reinitialise les indices de l'acte 1")
            .addField("!blob story (reset)", "Selectionne aléatoirement et Annonce l'histoire selectionnée à chaque groupe")
            .addField("!blob stats", "Diffuse les statistiques par groupe")
            .addField("Commande de Maintenance", "**Les commandes dont on espere ne pas avoir besoin**")
            .addField("!blob repair", "Envoi un message indiquant qu'on remet d'aplomb les valeurs")
            .addField("!blob go", "Message indiquant la reprise de l'event")
            .addField("!blob fixD suivi d'un chiffre", "Refixe le nombre de dégat suite missplay ou crashbot")
            .addField("!blob fixI suivi d'un chiffre", "Refixe le nombre d'indice suite missplay ou crashbot")
            .addField("!blob fixCM suivi d'un chiffre", "Refixe le nombre de contre mesure suite missplay ou crashbot")
            message.channel.send(embed);
    }

    if (args[0] == "init" && message.channel.name == adminEventChannel){
        if (!isNaN(args[1])){
            initialPV = 15 * args[1]
            restantPV = initialPV
            initialIndice = 2 * args[1]
            indice = initialIndice 
            initialCM = Math.ceil(args[1]/2)
            contreMesure = initialCM  
            damage = 0
            SendMessage(client,message,"Total PV <:jelly:733931040942587965> : **"+initialPV+"**\n Total <:TokenClue:443357925369577482> Acte 1 : **"+initialIndice+"**\n Contre mesure : **"+initialCM+"**")
        }
        else{
            message.channel.send(client,"Il faut mettre le nombre de participant");
        }
    }

    if (args[0] == "story" && message.channel.name == adminEventChannel){
        if  (args[1] == "reset"){
            message.channel.send(client,"\:information_source: Liste Story Reinitialisée")
            story = ['Repousser les Mi-Go', 'Désamorcer les Explosifs','Récuperer le Fragment','Secourir la Chimiste'];
        }
        numRandom = getRandomInt(story.length)
        if ( Array.isArray(story) && story.length){    
            SendMessage(client,message,'\:mega: L\'histoire choisie est : **'+story[numRandom]+'** pour l\'acte 3b')
            story.splice(numRandom, 1)
        }else
        {
            message.channel.send(client,"Histoire épuisée")
        }

    }

    if (args[0] == "reset" && message.channel.name == adminEventChannel){
        indice  = initialIndice
        SendMessage(client,message,'\:mega: Reinitialisation Acte 1 à **'+indice+'<:TokenClue:443357925369577482>**')
    }

    if (args[0] == "repair" && message.channel.name == adminEventChannel){
        SendMessage(client,message,'\:tools: **Un peu de patience nous remettons les valeurs**\:tools:')
    }

    if (args[0] == "go" && message.channel.name == adminEventChannel){
        SendMessage(client,message,'\:ok_hand: **Reprise de la partie **\:ok_hand:')
    }

    if (args[0] == "fixI" && message.channel.name == adminEventChannel){
        indice = parseInt(args[1])
        SendMessage(client,message,'\:tools: Compteur <:TokenClue:443357925369577482> remis à **'+indice+'**')
    }

    if (args[0] == "fixD" && message.channel.name == adminEventChannel){
        restantPV = parseInt(args[1])
        SendMessage(client,message,'\:tools: Compteur <:TokenDamage:443355098773585920> remis à **'+restantPV+'**')
    }

    if (args[0] == "fixCM" && message.channel.name == adminEventChannel){
        contreMesure = parseInt(args[1])
        SendMessage(client,message,'\:tools: Compteur Contre-Mesure remis à **'+contreMesure+'**');
    }

    if (args[0] == "timer" && message.channel.name == adminEventChannel){
        if (!isNaN(args[1])){
        //temps en miliseconde  
            timeInMinute = parseInt(args[1])
            timer = timeInMinute * 60000
            timerRest = timer         
            SendMessage(client,message,'\:timer: Mise en place d un timer de **'+timeInMinute+'** minutes')

            interval = setInterval (function () {
                count = count + 1
                timeRest = timeInMinute - count
                message.channel.send('\:timer: **'+timeRest+'** minute(s) restante(s)')
                if (timeRest > 10){      
                    rest = timeRest % 30 
                    if (rest == 0){
                        SendMessage(client,message,'\:spy: Il reste **'+timeRest+'** minute(s)')
                    }        
                }else
                {
                    if (timeRest == 0 && restantPV > 0){
                        SendMessage(client,message,'**Temps écoulé** les \:skull_crossbones:\:spy:\:skull_crossbones: sont vaincus par <:jelly:733931040942587965>')
                        clearInterval(interval)
                        timer = 0 
                    }else
                    {
                        SendMessage(client,message,'\:spy: Il reste **'+timeRest+'** minute(s)')
                    }           
                }   
            }, 60000 );
        }else{
            if (args[1] == "stop"){
                clearInterval(interval)
                timer = 0 
                message.channel.send('\:information_source: Timer arrété')
            }      
        }  
    }

    if (args[0] == "scan" && message.channel.name == adminEventChannel){ 
        try{
            BigHit = 0
            BigHitName = ""
            groupe = []
            stats.clear()
            client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {
                groupe.push(channel.name)
                m = new Map([["damage", 0], ["clues", 0], ["cmUsed", 0], ["cmAdded", 0]])   
                stats.set(channel.name,m)
                message.channel.send(channel.name+' ajouté');
            })
            message.channel.send('\:information_source: Scan fini')
        }catch (e){
            console.log(e)
            message.channel.send('Désolé <:jelly:733931040942587965> a dévoré ta commande, redemarre le bot');
        }  
    }

    if (args[0] == "stats" && message.channel.name == adminEventChannel){ 
        SendMessage(client,message,"\:information_source: RAPPEL\n Total PV <:jelly:733931040942587965> : **"+initialPV+"**\n Total <:TokenClue:443357925369577482> Acte 1 : **"+initialIndice+"**\n Contre mesure : **"+initialCM+"**")      
        SendMessage(client,message,'Le coup le plus sanglant revient à **'+BigHitName+'** avec **'+BigHit+'**<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965> ; Félicitation');
        SendMessage(client,message,"Statistiques globales :") 
        mapAsc = mapSort3 = new Map([...stats.entries()].sort());
        for (const [groupname, groupstats] of mapAsc) {
            if (groupname != adminEventChannel){
                SendMessage(client,message, 'Le **'+groupname+"** a infligé **"+groupstats.get("damage")+"**<:TokenDamage:443355098773585920>, découvert **"+groupstats.get("clues")+"<:TokenClue:443357925369577482>** , utilisé **"+groupstats.get("cmUsed")+" Contre-Mesure** et en a offert **"+groupstats.get("cmAdded")+"**")
            }  
        }
    }
}

function SendMessage(client,message,messagetoGroup){
    groupe.forEach(function(item){
        onechannel = message.guild.channels.cache.find(channel => channel.name === item)
        onechannel.send(messagetoGroup)
    })   
}

function addStats(name,type,changedValue) {
    stat = stats.get(name)
    //"damage" : 0, "clues" : 0 , "cmUsed" : 0, "cmAdded"
    oldValue = stat.get(type)
    newValue = changedValue + oldValue
    stat.set(type, newValue)
    stats.set(name,stat)
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

exports.help = {
    name: "blob"
};