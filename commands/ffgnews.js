const Command = require('./command')

module.exports = class FFGNews extends Command {

    static match (message) {
        return message.content.startsWith('!ffgnews')
    }

    static action (message){
     
        var request = require('request');
        request('http://www.fantasyflightgames.fr/recherche/jeux/horreur_a_arkham_lcg', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        })
    }   
}