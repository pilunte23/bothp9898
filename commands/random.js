//const jsdom = require("jsdom");
const { JSDOM } = require('jsdom');
let rand = require('../function/random.js');

exports.run = (client, message) => {

    var cardArray = []; 
    cardArray.push(getRandomInt(1001,1103));
    cardArray.push(getRandomInt(1001,1103));
    cardArray.push(getRandomInt(1001,1103));
    cardArray.push(getRandomInt(1001,1103));
    cardArray.push(getRandomInt(1001,1103));
    cardArray.push(getRandomInt(1001,1103));
    cardArray.push(getRandomInt(1001,1103));           
    cardArray.push(getRandomInt(2001,2038));
    cardArray.push(getRandomInt(2105,2117));
    cardArray.push(getRandomInt(2147,2158));
    cardArray.push(getRandomInt(2184,2194));
    cardArray.push(getRandomInt(2225,2235));
    cardArray.push(getRandomInt(2260,2273));
    cardArray.push(getRandomInt(2299,2310));
    cardArray.push(getRandomInt(3001,3042));
    cardArray.push(getRandomInt(3106,3119));
    cardArray.push(getRandomInt(3147,3158));
    cardArray.push(getRandomInt(3189,3199));
    cardArray.push(getRandomInt(3228,3239));
    cardArray.push(getRandomInt(3263,3273));
    cardArray.push(getRandomInt(3304,3315));           
    cardArray.push(getRandomInt(4001,4042));
    cardArray.push(getRandomInt(4103,4112));
    cardArray.push(getRandomInt(4149,4160));
    cardArray.push(getRandomInt(4192,4204));
    cardArray.push(getRandomInt(4229,4236));
    cardArray.push(getRandomInt(4265,4276));
    cardArray.push(getRandomInt(4304,4313));
   
    num =  cardArray[rand.getRandomInt(cardArray.length)]
    numString = num.toString().padStart(5, '0');
    console.log(numString);
    let linkUrl
    const http = require('http');
    linkUrl = 'http://arkhamdb.fr.cr/IMAGES/CARTES/AH-' + numString + '.jpg'
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