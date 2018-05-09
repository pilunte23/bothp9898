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
        const https = require('https');
        https.get(linkUrl, (resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
        data += chunk;
        })
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
        })
        }).on("error", (err) => {
        console.log("Error: " + err.message);
        })
     
    }   
}

