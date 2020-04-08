let NewsFr = require('../function/lastNewsFr.js');

exports.run = (client, message) => {
    let linkUrl = "http://www.fantasyflightgames.fr/recherche/jeux/les_demeures_de_lepouvante_2nde_edition"
    NewsFr.lastNewsFr(linkUrl, message);
}

exports.help = {
    name: "denews"
};