//const jsdom = require("jsdom");
const { JSDOM } = require('jsdom');
let rand = require('../function/random.js');

exports.run = (client, message) => {

    var cardArray = []; 
    addArray(cardArray,1001,1103);
    addArray(cardArray,2001,2038);
    addArray(cardArray,2105,2117);
    addArray(cardArray,2147,2158);
    addArray(cardArray,2184,2194);
    addArray(cardArray,2225,2235);
    addArray(cardArray,2260,2273);
    addArray(cardArray,2299,2310);    
    
    num =  cardArray[rand.getRandomInt(cardArray.length)].toString().padStart(5, '0');
    console.log(num);
    let linkUrl
    const http = require('http');
    linkUrl = 'http://arkhamdb.fr.cr/IMAGES/CARTES/AH-' + num + '.jpg'
    http.get(linkUrl, (resp) => {
        const { statusCode } = resp;
        if (statusCode == 200) {
            message.reply(linkUrl)
        
        } 
    })
    
}

function addArray( array, min, max) {
    for (let pas = min ; pas = max; pas++) {
        array.push(pas)
      }  
}
exports.help = {
    name: "random"
};