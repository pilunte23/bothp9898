const Command = require('./command')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = class FFGNews extends Command {

    static match (message) {
        return message.content.startsWith('!ffgnews')
    }

    async action (message){
    console.log("action ffgnews")
        
        /*JSDOM.fromURL("http://www.fantasyflightgames.fr/recherche/jeux/horreur_a_arkham_lcg").then(dom => {
            console.log(dom.serialize());
           });
        */
        JSDOM.env({
            html: 'http://www.fantasyflightgames.fr/recherche/jeux/horreur_a_arkham_lcg',
            src: [
              jquery
            ],
            done: function(errors, window) {
        
              if(errors){
                return getLinks(retries + 1);
              }
        
              var $ = window.$;
              $('a').each(function(){
                console.log( $(this).attr('href') );
              });
            }
          });



    }   
}