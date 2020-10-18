//const jsdom = require("jsdom");
const { JSDOM } = require('jsdom');
let rand = require('../function/random.js');
const { MessageEmbed } = require('discord.js');


exports.run = (client, message, args) => {
    if (args[0] === "24"){
        var interval = setInterval (function () {
            card(message)
         }, 86400000);
    }else
    {
        card(message)
    }
    
}

function card(message){
    var cardArray = []; 
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
    cardArray.push(getRandomInt(5001,5042));
    cardArray.push(getRandomInt(5109,5119));
    cardArray.push(getRandomInt(5151,5160));
    cardArray.push(getRandomInt(5186,5196));
    cardArray.push(getRandomInt(5229,5237));
    cardArray.push(getRandomInt(5273,5283));
    cardArray.push(getRandomInt(5313,5324));
    cardArray.push(getRandomInt(6001,6038));
    cardArray.push(getRandomInt(6110,6118));
    cardArray.push(getRandomInt(6155,6167));
    cardArray.push(getRandomInt(6195,6205));
    cardArray.push(getRandomInt(6234,6246));
    cardArray.push(getRandomInt(6276,6285));
    cardArray.push(getRandomInt(6323,6332));           
 
    num =  cardArray[rand.getRandomInt(cardArray.length)]
    let pack
    let campaign
    let thumb
    switch (true) {
        case (num < 1104):
            thumb= "http://arkhamdb.fr.cr/IMAGES/EXT/ext1.png"
            campaign = "La Nuit de la Zélatrice"
            pack = "Boite de Base"
            break;
        case (num < 2039):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext2.png"
            campaign = "Cycle de Dunwich"
            pack = "Deluxe - L'Héritage de Dunwich"
            break;
        case (num < 2118):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext6.png"
            campaign = "Cycle de Dunwich"
            pack = "Le Musée Miskatonic"
            break;
        case (num < 2159):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext8.png"
            campaign = "Cycle de Dunwich"
            pack = "L'Express du Comté d'Essex"
            break;
        case (num < 2195):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext11.png"
            campaign = "Cycle de Dunwich"
            pack = "Du Sang sur l'Autel"
            break;
        case (num < 2236):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext12.png"
            campaign = "Cycle de Dunwich"
            pack = "Aux Frontières du Visible"
            break;
        case (num < 2274):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext13.png"
            campaign = "Cycle de Dunwich"
            pack = "Là où le Destin Attend"
            break;
        case (num < 2311):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext14.png"
            campaign = "Cycle de Dunwich"
            pack = "Perdu dans le Temps et l'Espace"
            break;
        case (num < 3043):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext15.png"
            campaign = "Cycle de Carcosa"
            pack = "Deluxe - La Route de Carcosa"
            break;
        case (num < 3120):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext16.png"
            campaign = "Cycle de Carcosa"
            pack = "Les Échos du Passé"
            break;
        case (num < 3159):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext18.png"
            campaign = "Cycle de Carcosa"
            pack = "Le Serment Indicible"
            break;
        case (num < 3200):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext19.png"
            campaign = "Cycle de Carcosa"
            pack = "Le Spectre de la Vérité"
            break;
        case (num < 3240):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext20.png"
            campaign = "Cycle de Dunwich"
            pack = "Le Masque Blême"
            break;
        case (num < 3274):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext21.png"
            campaign = "Cycle de Carcosa"
            pack = "Sous les Étoiles Noires"
            break;
        case (num < 3316):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext22.png"
            campaign = "Cycle de Carcosa"
            pack = "La Pâle Carcosa"
            break;
        case (num < 4043):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext24.png"
            campaign = "Cycle la Civilisation Oubliée"
            pack = "Deluxe - La Civilisation Oubliée"
            break;
        case (num < 4113):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext25.png"
            campaign = "Cycle la Civilisation Oubliée"
            pack = "Les Fils du Destin"
            break;
        case (num < 4161):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext26.png"
            campaign = "Cycle la Civilisation Oubliée"
            pack = "Par-delà les Limites"
            break;
        case (num < 4205):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext27.png"
            campaign = "Cycle la Civilisation Oubliée"
            pack = "Le Coeur des Anciens"
            break;
        case (num < 4237):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext28.png"
            campaign = "Cycle la Civilisation Oubliée"
            pack = "La Cité des Archives"
            break;
        case (num < 4277):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext29.png"
            campaign = "Cycle la Civilisation Oubliée"
            pack = "Les Profondeurs de Yoth"
            break;
        case (num < 4314):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext30.png"
            campaign = "Cycle la Civilisation Oubliée"
            pack = "Paradoxes Temporels"
            break;
        case (num < 5043):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext34.png"
            campaign = "Cycle Le Cercle Brisé"
            pack = "Deluxe - Le Cercle Brisé"
            break;
        case (num < 5120):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext35.png"
            campaign = "Cycle Le Cercle Brisé"
            pack = "Le Nom Secret"
            break;
        case (num < 5161):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext36.png"
            campaign = "Cycle Le Cercle Brisé"
            pack = "Le Salaire du Péché"
            break;
        case (num < 5197):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext39.png"
            campaign = "Cycle Le Cercle Brisé"
            pack = "Pour le Bien Commun"
            break;
        case (num < 5238):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext40.png"
            campaign = "Union et Désillusion"
            pack = "Le Masque Blême"
            break;
        case (num < 5284):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext41.png"
            campaign = "Cycle Le Cercle Brisé"
            pack = "Dans les Griffes du Chaos"
            break;
        case (num < 5325):
            thumb="http://arkhamdb.fr.cr/IMAGES/EXT/ext42.png"
            campaign = "Cycle Le Cercle Brisé"
            pack = "Devant le Trône Noir"
            break;
        default:
            thumb= "http://arkhamdb.fr.cr/IMAGES/EXT/ext1.png"
            campaign = "Campagne Inconnue"
            pack = "Pack Inconnu"
            break;
    }
    numString = num.toString().padStart(5, '0');
    console.log(numString);
    let linkUrl
    const http = require('http');
    linkUrl = 'http://arkhamdb.fr.cr/IMAGES/CARTES/AH-' + numString + '.jpg'
    http.get(linkUrl, (resp) => {
        const { statusCode } = resp;
        if (statusCode == 200) {     
            //message.reply(linkUrl)
            const embed = new MessageEmbed()
            .setTitle("Carte du Jour")
            .setThumbnail(thumb)
            .addField("Campagne : " , campaign)
            .addField("Pack : " , pack)
            .setColor("#9B59B6")
            .setImage(linkUrl)
            message.reply(embed);
    
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