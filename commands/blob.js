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
count = 0;
timeRest = 0;
story = ['Repousser les Mi-Go', 'Désamorcer les Explosifs','Récuperer le Fragment','Secourir la Chimiste'];
groupe = ['groupe-admin-event', 'groupe-1','groupe-2','groupe-3','groupe-4','groupe-5'];
stat = new Map([
    ['groupe-1', {"damage" : 0, "clues" : 0 , "cmUsed" : 0}],
    ['groupe-2', {"damage" : 0, "clues" : 0 , "cmUsed" : 0}],
    ['groupe-3', {"damage" : 0, "clues" : 0 , "cmUsed" : 0}],
    ['groupe-4', {"damage" : 0, "clues" : 0 , "cmUsed" : 0}],
    ['groupe-5', {"damage" : 0, "clues" : 0 , "cmUsed" : 0}]
  ])
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
                    if (restantPV > 0 ){
                        if (degat > BigHit){
                            BigHit = degat
                            BitHitName = message.channel.name
                        }
                        damage = damage + parseInt(args[1])
                        restantPV = initialPV - damage
                        if (restantPV > 0 ){
                            SendMessage(client,message,'Le **'+message.channel.name+'** ajoute **'+degat+'**<:TokenDamage:443355098773585920> sur <:jelly:733931040942587965> : il lui reste **'+restantPV+'**/**'+initialPV+'**')       
                        }
                        else
                        {
                            SendMessage(client,message,'**Félicitation** les \:spy: ont vaincu \:skull_crossbones:<:jelly:733931040942587965>\:skull_crossbones:')       
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
                    SendMessage(client,message,'\:ok_hand: Bonne nouvelle, Le **'+message.channel.name+'** ajoute **1 Contre-Mesure** , il en reste **'+contreMesure+'**')
                }
                if (args[1] == "-" || args[1] == null){
                    if (contreMesure > 0){
                        contreMesure = contreMesure - 1
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
                    if (indice > 0){
                        if (parseInt(args[1]) > 3){
                            message.channel.send("Pas de tricherie, on peut pas en mettre plus de 3 indices"); 
                            return     
                        }
                        indice  = indice - parseInt(args[1])
                        if (indice > 0){
                            SendMessage(client,message,'Le **'+message.channel.name+'** depose **'+parseInt(args[1])+'<:TokenClue:443357925369577482>**, il en reste **'+indice+'**<:TokenClue:443357925369577482> à trouver')       
                        }else{
                        SendMessage(client,message,'@Event,**Félicitation** les \:spy: ont découvert la totalité des <:TokenClue:443357925369577482>, dès le prochain round passer à l acte 2')
                        } 
                    }else{
                        message.channel.send("Il n'y a plus besoin de déposer des indices pour l'instant")
                    }                        
                }else
                {
                    if (indice > 0){
                        indice = indice - 1
                        if (indice > 0){
                            SendMessage(client,message,'Le **'+message.channel.name+'** depose **1 <:TokenClue:443357925369577482>** , il en reste **'+indice+'**<:TokenClue:443357925369577482> à trouver')
                        }else
                        {
                            SendMessage(client,message,'@Event, **Félicitation** les \:spy: ont découvert la totalité des <:TokenClue:443357925369577482>, dès le prochain round passer à l acte 2')
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
            .addField("!blob cm +", "(Cas rare) Ajout une contre mesure.")
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
            .addField("!blob init suivi d'un chiffre ", "Initialisation des compteurs selon le nombre de participants")
            .addField("!blob timer ", "Lance le timer du chiffre indiqué en minutes")
            .addField("!blob reset", "Reinitialise les indices de l'acte 1")
            .addField("!blob story", "Selectionne aléatoirement et Annonce l'histoire selectionné à chaque groupe")
            .addField("!blob stats", "Diffuse les statistiques par groupe (a faire)")
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
        numRandom = getRandomInt(story.length)
        SendMessage(client,message,'\:mega: L\'histoire choisie est : **'+story[numRandom]+'** pour l\'acte 3b')
        story = story.splice(numRandom, 1)
    }

    if (args[0] == "reset" && message.channel.name == adminEventChannel){
        indice  = initialIndice
        SendMessage(client,message,'Reinitialisation Acte 1 à **'+indice+'<:TokenClue:443357925369577482>**')
    }

    if (args[0] == "repair" && message.channel.name == adminEventChannel){
        SendMessage(client,message,'\:tools: **@Event Un peu de patience nous remettons les valeurs**\:tools:')
    }

    if (args[0] == "go" && message.channel.name == adminEventChannel){
        SendMessage(client,message,'\:ok_hand: **@Event, Reprise de la partie **\:ok_hand:')
    }

    if (args[0] == "fixI" && message.channel.name == adminEventChannel){
        indice = parseInt(args[1])
        SendMessage(client,message,'\:tools: Compteur <:TokenClue:443357925369577482> remis à **'+indice+'**')
    }

    if (args[0] == "fixD" && message.channel.name == adminEventChannel){
        damage = parseInt(args[1])
        SendMessage(client,message,'\:tools: Compteur <:TokenDamage:443355098773585920> remis à **'+damage+'**')
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

            var interval = setInterval (function () {
                count = count + 1
                timeRest = timeInMinute - count
                message.channel.send('\:timer: **'+timeRest+'** minute(s) restantPVe(s)')
                if (timeRest > 10){      
                    rest = timeRest % 5 
                    if (rest == 0){
                        SendMessage(client,message,'\:spy: Il reste **'+timeRest+'** minute(s)')
                    }        
                }else
                {
                    if (timeRest == 0){
                        SendMessage(client,message,'**Temps écoulé** les \:skull_crossbones:\:spy:\:skull_crossbones: sont vaincus par <:jelly:733931040942587965>')
                        clearInterval(interval);
                    }else
                    {
                        SendMessage(client,message,'\:spy: Il reste **'+timeRest+'** minute(s)')
                    }           
                }   
            }, 60000 );
        }else{
            if ((args[1]) == "clean"){
                clearInterval(interval);
            }
        }
    
    }
}

function SendMessage(client,message,messagetoGroup){
    /*try{
        client.channels.cache.filter(chan => chan.name.startsWith("group")).forEach(channel => {channel.send(messagetoGroup)})
    }catch (e){
        console.log(e)
        message.channel.send('Désolé <:jelly:733931040942587965> a dévoré ta commande, ressaisis la');
    }
    */
    groupe.forEach(function(item){
        onechannel = message.guild.channels.cache.find(channel => channel.name === item)
        onechannel.send(messagetoGroup)
    })
    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

exports.help = {
    name: "blob"
};