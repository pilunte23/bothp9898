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
     channel.send('Bienvenu dans le repaire des cultistes ' +member.displayName)
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
            .setTitle("Aide") 
            .setDescription("Voici les commandes pour vous aider mon ami")
            .setColor("#9B59B6")           
            .addField("!ha ", "suivi d'un numero ou d'une chaine de caractère pour chercher une carte sur http://arkhamdb.fr.cr")
            .addField("!ah ", "suivi d'une chaine de caractère pour chercher la valeur sur http://fr.arkhamdb.com , !!! en cours n'affiche pas de carte pour l'instant")
            .addField("!ahnews ", "Affiche la dèrniere news Arkham Horror LCG sur fantasyflightgames.com ")
            .addField("!hanews ", "Affiche la dèrniere news Horreur à Arkham JCE sur fantasyflightgames.fr ")
            .addField("!hav3news ", "Affiche la dèrniere news Horreur à Arkham V3 sur fantasyflightgames.fr ")
            .addField("!chnews ", "Affiche la dèrniere news de Contrée de l'horreur sur fantasyflightgames.fr") 
            .addField("!denews ", "Affiche la dèrniere news de Demeure de l'Epouvante sur fantasyflightgames.fr")
            .addField("!userinfo", "Je vous connais et vous donnerais des informations sur votre identité")       
        message.author.send(embed)
           
        return
    }
    if(command === Constants.prefix+'role'  ){
        let embed =new Discord.RichEmbed()
            .setTitle("Choisissez votre classe") 
            .setColor("#FFFFFF")                

        let msg =  await message.channel.send(embed)
         await msg.react('443359750353190912');
         await msg.react('443359489811546112');
         await msg.react('443359627195973634');
         await msg.react('443359703771250688');
         await msg.react('443359575131947008');
              
         

        return
    }



    if(command === Constants.prefix+'ha' ){ 
        let linkUrl
        const http = require('http');
        //si la recherche est basé sur un numéro
        if (!isNaN(args[0])){ 
            linkUrl = 'http://arkhamdb.fr.cr/IMAGES/CARTES/AH-'+args[0]+'.jpg' 
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
           let linkUrl = 'http://arkhamdb.fr.cr/carte_liste.php?rech=' +args.join('%20')   
           let jsdom = JSDOM.fromURL(linkUrl).then(dom => {
            
                let { window } = dom;
                let { document } = window;
                const $ = global.jQuery = require( 'jquery' )( window );

                global.window = window;
                global.document = document;
    
               let carteUnique = false
               let section= $('.section') 
               section.each( function(){     
                    //s'il n'y a qu'une carte ayant le terme dans le titre
                    const bool1 = $(this).html().includes("titre")
                    const bool2 = $(this).html().includes("(1)")
                    if (bool1 && bool2){ 
                         carteUnique = true
                         const indexTable =$(this).index() + 1 
                        data =  $(this).parent().find('table:last').find('a').attr('href').split("/") 
                        if (data[0] ==="cartes"){
                            message.reply('http://arkhamdb.fr.cr/IMAGES/CARTES/AH-'+data[1]+'.jpg')  
                        }
                        if (data[0] ==="investigateurs"){
                            message.reply('http://arkhamdb.fr.cr/IMAGES/CARTES/AH-'+data[1]+'.jpg') 
                            message.reply('http://arkhamdb.fr.cr/IMAGES/CARTES/AH-'+data[1]+'_back.jpg') 
                        }                             
                    }                  
               })

               if (carteUnique === false){ 
                let font= $('font') 
                    if (font.html() == '0 cartes'){
                        message.reply('désolé vous avez du saisir le nom d un grand ancien car je n ai rien trouvé')  
                    }
                    else{
                        message.reply('http://arkhamdb.fr.cr/carte_liste.php?rech=' +args.join('%20'))  
                    }       
               }
            })
            
        }
                   
    }

    // Chaos Bag
    // Lien de deck
    // Lecture d'histoire lovecraft

    if(command === Constants.prefix+'hadeck' ){
        linkUrl = 'http://arkhamdb.fr.cr/deck.php?id='+args[0]
        let jsdom = JSDOM.fromURL(linkUrl).then(dom => {
            
            let { window } = dom;
            let { document } = window;
            const $ = global.jQuery = require( 'jquery' )( window );

            global.window = window;
            global.document = document;
            let a = $("#carte_dans_deck").find('a')
            a.each( function(){
                console.log($(this).attr('href'))
                message.reply($(this).attr('href'))
            })
        })
    }


    if(command === Constants.prefix+'ah' ){
        let args = message.content.split(' ')
        args.shift()
        let https = require('https');
        let linkUrl

        if (isNaN(args[0])){      
            linkUrl = 'https://fr.arkhamdb.com/find?q=' +args.join('%20')  
            https.get(linkUrl, (resp) => {
                const { statusCode } = resp;
                if (statusCode !== 200) {
                    message.reply('désolé le mystère de cette carte reste entier')
                }else
                {
                    message.reply(linkUrl)
                }
            })               
        }   
      
    }

    if(command === Constants.prefix+'chnews' ){
        let linkUrl ="http://www.fantasyflightgames.fr/recherche/jeux/les_contrees_de_lhorreur"
        lastNewsFr(linkUrl,message)       
    }

    if(command === Constants.prefix+'hanews' ){
        let linkUrl ="http://www.fantasyflightgames.fr/recherche/jeux/horreur_a_arkham_lcg"
        lastNewsFr(linkUrl,message)      
    }
    if(command === Constants.prefix+'denews' ){
        let linkUrl ="http://www.fantasyflightgames.fr/recherche/jeux/les_demeures_de_lepouvante_2nde_edition"
        lastNewsFr(linkUrl,message)      
    }
    if(command === Constants.prefix+'hav3news' ){
        let linkUrl ="http://www.fantasyflightgames.fr/recherche/jeux/horreur_a_arkham_3e_edition"
        lastNewsFr(linkUrl,message)      
    }
    
    if(command === Constants.prefix+'ahnews' ){
        let linkUrl ="https://www.fantasyflightgames.com/en/news/tag/arkham-horror-the-card-game/?page=1"
        lastNewsEn(linkUrl,message)      
    }

  // let commandUsed =  Ahjce.parse(message) || Arkhamdb.parse(message) || FFGNews.parse(message)
})



bot.on('messageReactionAdd', (reaction,user) =>{
    if  (reaction.emoji.name === '443359750353190912'){
        let role = message.guild.roles.find(role => role.name === "Gardien")
        user.addRole(role)
    }
});

bot.login(Constants.token).catch(console.error)

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function lastNewsFr(linkUrl,message){
    var jsdom = JSDOM.fromURL(linkUrl).then(dom => {
            
            var { window } = dom;
            var { document } = window;
            const $ = global.jQuery = require( 'jquery' )( window );

            global.window = window;
            global.document = document;
            var a = $('a .news_img');
            message.reply(a.parent().attr('href'),{files: [ a.children('img').attr('src') ]})
            
        })   
}

function lastNewsEn(linkUrl,message){
    var jsdom = JSDOM.fromURL(linkUrl).then(dom => {
            
            var { window } = dom;
            var { document } = window;
            const $ = global.jQuery = require( 'jquery' )( window );

            global.window = window;
            global.document = document;
            link = 'https://www.fantasyflightgames.com/'+ $('h1').children('a').attr('href')
            img = $('.blog-visual').attr('src')
            message.reply(link,{files: [ img ]})           
        })   


}

