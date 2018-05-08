const Command = require('./command')

module.exports = class AHjce extends Command {

    static match (message) {
        return message.content.startsWith('!ha')
    }

    static action (message){
        let args = message.content.split(' ')
        args.shift()
        
        if (!isNaN(args[0])){       
            message.reply('http://www.ahjce.fr/IMAGES/CARTES/AH-'+args[0]+'.jpg')
        }   
        else
        {
            message.reply('http://www.ahjce.fr/carte_liste.php?rech=' +args.join('%20'))
        }
    }

}

