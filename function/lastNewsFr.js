const { JSDOM } = require('jsdom');

function lastNewsFr(linkUrl, message) {
    var jsdom = JSDOM.fromURL(linkUrl).then(dom => {

        var { window } = dom;
        var { document } = window;
        const $ = global.jQuery = require('jquery')(window);

        global.window = window;
        global.document = document;
        var a = $('a .news_img');
        message.reply(a.parent().attr('href'), { files: [a.children('img').attr('src')] })

    })
}

module.exports = { lastNewsFr };