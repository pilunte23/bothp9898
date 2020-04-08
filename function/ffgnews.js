
const jsdom = require("jsdom");
const { JSDOM } = require( 'jsdom' );




module.exports = class FFGNews extends Command {

    static match (message) {
        return message.content.startsWith('!ffgnews')
    }

    static  action (message){
    console.log("action ffgnews")
        var jsdom = JSDOM.fromURL("http://www.fantasyflightgames.fr/recherche/jeux/horreur_a_arkham_lcg").then(dom => {
            
            var { window } = dom;
            var { document } = window;
            const $ = global.jQuery = require( 'jquery' )( window );

            global.window = window;
            global.document = document;
            var a = $('a .news_img');
            var ffgMap = new Map();
            
            //Récupération des inforamtions de FFG
            var link
            var img
            a.each(async function(){
               try{
               // console.log( $(this).children('img').attr('src'))
               //console.log( $(this).parent().attr('href') )
               // ffgMap.set($(this).parent().attr('href'),$(this).children('img').attr('src'))            
               // message.reply($(this).parent().attr('href'),{files: [ $(this).children('img').attr('src') ]})
                    

                    link = $(this).parent().attr('href')
                    img = $(this).children('img').attr('src')
                    //ffgMap.set(link,img)
                    
                    //await message.channel.awaitMessages(link,{files: [img]},3000);

                } catch (e) {
                    console.error(e);
                }

            })

            for (let [key, value] of Object.entries(ffgMap)) {
                console.log(key, value);
            }
            
           /* for (var [key, value] of ffgMap) {
                 setTimeout(function (){
                    console.log(key + " goes " + value)
                 }, 1000);

                 message.channel.send( key ,{files: [value]})       
               
            }
         */
        })
    }

}