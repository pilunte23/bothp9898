let NewsFr = require('../function/lastNewsFr.js');

exports.run = (client, message) => {
    let linkUrl = "http://www.fantasyflightgames.fr/recherche/jeux/les_contrees_de_lhorreur"
    NewsFr.lastNewsFr(linkUrl, message);
}

exports.help = {
    name: "chnews"
};