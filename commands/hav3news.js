let NewsFr = require('../function/lastNewsFr.js');

exports.run = (client, message) => {
    let linkUrl = "http://www.fantasyflightgames.fr/recherche/jeux/horreur_a_arkham_3e_edition"
    NewsFr.lastNewsFr(linkUrl, message);
}

exports.help = {
    name: "hav3news"
};