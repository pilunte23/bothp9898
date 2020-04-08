let NewsEn = require('../function/lastNewsEn.js');

exports.run = (client, message) => {
    let linkUrl = "https://www.fantasyflightgames.com/en/news/tag/arkham-horror-the-card-game/?page=1"
    NewsEn.lastNewsEn(linkUrl, message);
}

exports.help = {
    name: "ahnews"
};