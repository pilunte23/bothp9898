//const jsdom = require("jsdom");
const { JSDOM } = require('jsdom');

exports.run = (client, message) => {

    

    find = false
    while (find == false){
        num = getRandomInt(1001,99999).toString().padStart(5, '0');
        console.log(num);
        let linkUrl
        const http = require('http');
        linkUrl = 'http://arkhamdb.fr.cr/IMAGES/CARTES/AH-' + num + '.jpg'
        http.get(linkUrl, (resp) => {
            const { statusCode } = resp;
            if (statusCode == 200) {
                message.reply(linkUrl)
                find = true
            } 
        })
    }
 
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.help = {
    name: "random"
};