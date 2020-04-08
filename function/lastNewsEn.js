const { JSDOM } = require('jsdom');

function lastNewsEn(linkUrl, message) {
    var jsdom = JSDOM.fromURL(linkUrl).then(dom => {

        var { window } = dom;
        var { document } = window;
        const $ = global.jQuery = require('jquery')(window);

        global.window = window;
        global.document = document;
        link = 'https://www.fantasyflightgames.com/' + $('h1').children('a').attr('href')
        img = $('.blog-visual').attr('src')
        message.reply(link, { files: [img] })
    })
}

module.exports = { lastNewsEn };