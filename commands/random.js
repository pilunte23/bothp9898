//const jsdom = require("jsdom");
const { JSDOM } = require('jsdom');

exports.run = (client, message, args) => {

    console.log(args);

    find = false
    while (find == false){
        num = getRandomArbitrary(1001,7163)
        num = "0" + num
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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

exports.help = {
    name: "random"
};