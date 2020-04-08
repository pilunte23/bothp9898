//const jsdom = require("jsdom");
const { JSDOM } = require('jsdom');
const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {

    let Url = 'http://castorjo.fr/ahlcg/quote/'

    let jsdom = JSDOM.fromURL(Url).then(dom => {

        let { window } = dom;
        let { document } = window;
        const $ = global.jQuery = require('jquery')(window);

        global.window = window;
        global.document = document;
        let list = "";
        let i = 0;
        const name = args.join('%20');
        const cleanname = args.join(' ');
        $(document).ready(function() {
            $.post('http://castorjo.fr/ahlcg/quote/search-rule.php', { research: name }, function(data, status, jqXHR) {
                if (data != '') {
                    var stripedHtml = data.replace(/<(\/?optgroup.*?)>/g, '');
                    stripedHtml = stripedHtml.replace(/<\/option>/g, '')
                    stripedHtml = stripedHtml.replace(/<(.*?)>/g, '\n')
                    let embed = new MessageEmbed()
                        .setTitle("Liste des points de règle contenant le terme : " + cleanname)
                        .setDescription(stripedHtml)
                        .setColor("#9B59B6")
                        .addField("Tips", "Utilise la commande !rules suivi du point de règles ci-dessus pour avoir le détail")
                    message.channel.send(embed)
                }
            })
        })
    })

}

exports.help = {
    name: "search"
};