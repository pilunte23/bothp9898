const Discord = require('discord.js')
//const Arkhamdb = require('./commands/arkhamdb')
//const FFGNews = require('./commands/ffgnews')
const Constants = require('./constants')
const bot = new Discord.Client()
const jsdom = require("jsdom");
const { JSDOM } = require( 'jsdom' );

bot.on('ready',async () =>{
    //bot.user.setAvatar('./avatar.png')
    //.then(() => console.log('Avatar mis en place avec succès'))
    //.catch(console.error)
    console.log(bot.user.username +' se réveille.')
    gameArray = ["Contrée de l'Horreur","Le Signe des Anciens","Horreur à Arkham JCE","Horreur à Arkham","Les Demeures de l'Epouvante"]
    
    bot.user.setActivity(gameArray[getRandomInt(5)]).catch(console.error)
})

bot.on('guildMemberAdd', function(member){
 member.createDM().then(function (channel){
     channel.send('Bienvenu dans le repaire de Cthulhu' +member.displayName)
 }).catch(console.error)

})

bot.on('message', async message =>{
    if(message.author.bot) return 
    if(message.channel.type === "dm") return

    let messageArray = message.content.split(" ")
    let command = messageArray[0]
    let args = messageArray.slice(1)
    
    if(!command.startsWith(Constants.prefix)) return
    if(command === Constants.prefix+'userinfo'){
        //console.log("Vous savez qui je suis")
        let embed =new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("Vos informations d'utilisateur")
            .setColor("#9B59B6")
            .addField("Nom complet", message.author.username+'#'+message.author.discriminator)
            .addField("Id", message.author.id)
            .addField("Crée le",message.author.createdAt)
        
        message.channel.send(embed)
           
        return
    }

    if(command === Constants.prefix+'aide' || command === Constants.prefix+'help' ){
        let embed =new Discord.RichEmbed()
            .setDescription("Voici les commandes pour vous aider mon ami")
            .setColor("#9B59B6")           
            .addField("!userinfo", "Je vous connais et vous donnerais des informations sur votre identité")
            .addField("!ha ", "suivi d'un numero ou d'une chaine de caractère pour chercher une carte sur www.ahjce.fr")
   
        message.channel.send(embed)
           
        return
    }
    let linkUrl
    if(command === Constants.prefix+'ha' ){ 
       
        const http = require('http');
        //si la recherche est basé sur un numéro
        if (!isNaN(args[0])){ 
            linkUrl = 'http://www.ahjce.fr/IMAGES/CARTES/AH-'+args[0]+'.jpg' 
            http.get(linkUrl, (resp) => { 
                const { statusCode } = resp;
                if (statusCode !== 200) {
                    message.reply('désolé le mystère de cette carte reste entier')
                }else
                {
                    message.reply(linkUrl)
                }
            })                   
        }   
        else
        //si la recherhe est basée sur une chaine de caractère
        {
           let linkUrl = 'http://www.ahjce.fr/carte_liste.php?rech=' +args.join('%20')   
           var jsdom = JSDOM.fromURL(linkUrl).then(dom => {
            
                var { window } = dom;
                var { document } = window;
                const $ = global.jQuery = require( 'jquery' )( window );

                global.window = window;
                global.document = document;
    
               var carteUnique = false
               var section= $('.section') 
               section.each( function(){     
                    //s'il n'y a qu'une carte ayant le terme dans le titre
                    var bool1 = $(this).html().includes("titre")
                    var bool2 = $(this).html().includes("(1)")
                    if (bool1 && bool2){ 
                         carteUnique = true
                         var indexTable =$(this).index() + 1 
                        data =  $(this).parent().find('table:last').find('a').attr('href').split("/") 
                        if (data[0] ==="cartes"){
                            message.reply('http://www.ahjce.fr/IMAGES/CARTES/AH-'+data[1]+'.jpg')  
                        }
                        if (data[0] ==="investigateurs"){
                            message.reply('http://www.ahjce.fr/IMAGES/CARTES/AH-'+data[1]+'.jpg') 
                            message.reply('http://www.ahjce.fr/IMAGES/CARTES/AH-'+data[1]+'_back.jpg') 
                        }                             
                    }                  
               })

               if (carteUnique === false){ 
                var font= $('font') 
                    if (font.html() == '0 cartes'){
                        message.reply('désolé vous avez du saisir le nom d un grand ancien car je n ai rien trouvé')  
                    }
                    else{
                        message.reply('http://www.ahjce.fr/carte_liste.php?rech=' +args.join('%20'))  
                    }       
               }
            })
            
        }
                   
    }
  // let commandUsed =  Ahjce.parse(message) || Arkhamdb.parse(message) || FFGNews.parse(message)
})


bot.login(Constants.token).catch(console.error)

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

