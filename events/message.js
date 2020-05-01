const constants = require('../constants.js');

module.exports = (client, message) => {
    console.log('message : ' + message);
    if (message.author.bot) return;
    console.log('prefix : ' + constants.PREFIX);
    if (message.content.indexOf(constants.PREFIX) !== 0) return;
    const args = message.content.slice(constants.PREFIX.length).trim().split(/ +/g);
    console.log('args : ' + args);
    let command = args.shift().toLowerCase();
    //hack card=carte
    if (command == "carte" || command == "cards" || command == "cartes") command = "card";
    if (command == "regles") command = "rules";
    if (command == "aide") command = "help";
    if (command == "tabous" || command == "tabou" || command == "taboo") command = "taboos";
    const cmd = client.commands.get(command);
    if (!cmd) return undefined;
    cmd.run(client, message, args);
};

// Chaos Bag
// Lien de deck
// Lecture d'histoire lovecraft
/*
    if (command === 'hadeck') {
        linkUrl = 'http://arkhamdb.fr.cr/deck.php?id=' + args[0]
        let jsdom = JSDOM.fromURL(linkUrl).then(dom => {

            let { window } = dom;
            let { document } = window;
            const $ = global.jQuery = require('jquery')(window);

            global.window = window;
            global.document = document;
            let a = $("#carte_dans_deck").find('a')
            a.each(function() {
                console.log($(this).attr('href'))
                message.reply($(this).attr('href'))
            })
        })
    }


    if (command === 'ah') {
        let args = message.content.split(' ')
        args.shift()
        let https = require('https');
        let linkUrl

        if (isNaN(args[0])) {
            linkUrl = 'https://fr.arkhamdb.com/find?q=' + args.join('%20')
            https.get(linkUrl, (resp) => {
                const { statusCode } = resp;
                if (statusCode !== 200) {
                    message.reply('désolé le mystère de cette carte reste entier')
                } else {
                    message.reply(linkUrl)
                }
            })
        }

    if (command === 'ffghaa') {
        message.reply('https://www.facebook.com/ffghaa/')
    }

}



    */