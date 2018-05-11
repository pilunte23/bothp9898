const Command = require('./command')

module.exports = class AHjce extends Command {

    static match (message) {
        return message.content.startsWith('!ha')
    }

    static action (message){
        let args = message.content.split(' ')
        args.shift()  

        let linkUrl = 'http://www.ahjce.fr'
        if (!isNaN(args[0])){ 
           let pathUrl = '/IMAGES/CARTES/AH-'+args[0]+'.jpg'                     
        }   
        else
        {      
           let  pathUrl = '/carte_liste.php?rech=' +args.join('%20')                 
        }
        const http = require('http');
        var optionsget = {
            host : linkurl,
            port : 80,
            path : pathUrl, // the rest of the url with parameters if needed
            method : 'GET' // do GET
        };

        http.get(optionsget, (resp) => {
            const { statusCode } = resp;
            if (statusCode !== 200) {
                message.reply('désolé le mystère de cette carte reste entier')
            }else
            {
                message.reply(linkUrl+pathUrl)
            }
        }).catch(console.log("Promise Rejected"))
     
    }   
}

