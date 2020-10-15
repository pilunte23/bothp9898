//const jsdom = require("jsdom");
const { JSDOM } = require('jsdom');
let rand = require('../function/random.js');

exports.run = (client, message) => {

    var cardArray = []; 
    cardArray.push(getRandomInt(1001,1103).toString().padStart(5, '0'));
    cardArray.push(getRandomInt(2001,2038).toString().padStart(5, '0'));
    cardArray.push(getRandomInt(2105,2117).toString().padStart(5, '0'));
    cardArray.push(getRandomInt(2147,2158).toString().padStart(5, '0'));
    cardArray.push(getRandomInt(2184,2194).toString().padStart(5, '0'));
    cardArray.push(getRandomInt(2225,2235).toString().padStart(5, '0'));
    cardArray.push(getRandomInt(2260,2273).toString().padStart(5, '0'));
    cardArray.push(getRandomInt(2299,2310).toString().padStart(5, '0'));    
   
    num =  cardArray[rand.getRandomInt(cardArray.length)]
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.help = {
    name: "random"
};