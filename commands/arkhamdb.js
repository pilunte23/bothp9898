const Command = require('./command')

module.exports = class Arkhamdb extends Command {

    static match (message) {
        return message.content.startsWith('!ah')
    }

    static action (message){
        let args = message.content.split(' ')
        args.shift()
        
        if (!isNaN(args[0])){       
            message.reply('https://arkhamdb.com/bundles/cards/'+args[0]+'.png')
        }   
        else
        {
            message.reply('https://arkhamdb.com/find?q=' +args.join('%20'))
        }
    }

}

