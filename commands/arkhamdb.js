const Command = require('./command')

module.exports = class Arkhamdb extends Command {

    static match (message) {
        return message.content.startsWith('!ah')
    }

    static action (message){
        let args = message.content.split(' ')
        args.shift()

        let linkUrl
        if (!isNaN(args[0])){ 
            linkUrl = 'https://arkhamdb.com/bundles/cards/'+args[0]+'.png'                     
        }   
        else
        {      
            linkUrl = 'https://arkhamdb.com/find?q=' +args.join('%20')                 
        }
        const https = require('https');
       
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

