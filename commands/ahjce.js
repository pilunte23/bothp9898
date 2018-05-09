const Command = require('./command')

module.exports = class AHjce extends Command {

    static match (message) {
        return message.content.startsWith('!ha')
    }

    static action (message){
        let args = message.content.split(' ')
        args.shift()      
        let linkUrl
        if (!isNaN(args[0])){ 
            linkUrl = 'http://www.ahjce.fr/IMAGES/CARTES/AH-'+args[0]+'.jpg'                     
        }   
        else
        {      
            linkUrl = 'http://www.ahjce.fr/carte_liste.php?rech=' +args.join('%20')                 
        }
        const http = require('http');
        
        http.get(linkUrl, (resp) => {
            const { statusCode } = resp;
            if (statusCode !== 200) {
                message.reply(linkUrl)
            }else
            {
                message.reply('carte non trouvée')
            }
        })
     
    }   
}

