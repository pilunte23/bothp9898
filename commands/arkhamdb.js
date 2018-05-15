const Command = require('./command')

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
        const resp = await https.get(linkUrl)
        if (resp.statusCode !== 200) {
            console.log('png not found. status code :' + resp.statusCode);
            linkUrl = 'https://arkhamdb.com/bundles/cards/'+args[0]+'.jpg'   
        }
    }   
    else
    {      
        linkUrl = 'https://arkhamdb.com/find?q=' +args.join('%20')                 
    }

    https.get(linkUrl, (resp) => {
        if (resp.statusCode !== 200) {
            console.log('link not found');
            message.reply('désolé le mystère de cette carte reste entier')

        }else
        {
            message.reply(linkUrl)
        }
    })

}
