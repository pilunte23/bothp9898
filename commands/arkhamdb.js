const Command = require('./command')
const axios = require('axios');

module.exports = class Arkhamdb extends Command {

    static match (message) {
        return message.content.startsWith('!ah')
    }

    static action (message){
        arkhamDB (message)
    }
}

async function arkhamDB (message){
    let args = message.content.split(' ')
    args.shift()
    const https = require('https')
    let linkUrl

    if (!isNaN(args[0])){ 
        console.log('is numeric');
        linkUrl = 'https://arkhamdb.com/bundles/cards/'+args[0]+'.png' 
        console.log(linkUrl);
        try {
            const response = await axios.get(linkUrl)
            console.log(response);
            if (response.statusCode !== 200 ) {
                console.log('png not found. status code :' + response.statusCode);
                linkUrl = 'https://arkhamdb.com/bundles/cards/'+args[0]+'.jpg'   
            }
            else
            {      
                linkUrl = 'https://arkhamdb.com/find?q=' +args.join('%20')                 
            }   
          } catch (error) {
            console.error(error);
        }
        
    }   
    console.log(linkUrl);
    https.get(linkUrl, (resp) => {
        if (resp.statusCode !== 200 ) {
            console.log('link not found');
            message.reply('désolé le mystère de cette carte reste entier')

        }else
        {
            message.reply(linkUrl)
        }
    })

}
