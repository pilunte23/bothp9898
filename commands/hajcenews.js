let NewsFr = require('../function/lastNewsFr.js');

exports.run = (client, message) => {
    let linkUrl = "http://www.fantasyflightgames.fr/recherche/jeux/horreur_a_arkham_lcg"
    NewsFr.lastNewsFr(linkUrl, message);
}

exports.help = {
    name: "hajcenews"
};