const Command = require('./command')

module.exports = class FFGNews extends Command {

    static match (message) {
        return message.content.startsWith('!ffgnews')
    }

    static action (message){
        const request = require('request');
     
        axios.get('http://www.fantasyflightgames.fr/recherche/jeux/horreur_a_arkham_lcg')
        .then(function(response){
            console.log(response.data); 
            console.log(response.status); 
        }); 
    }   
}