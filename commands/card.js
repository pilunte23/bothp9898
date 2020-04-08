//const jsdom = require("jsdom");
const { JSDOM } = require('jsdom');

exports.run = (client, message, args) => {

    console.log(args);

    //si la recherche est basé sur un numéro
    if (!isNaN(args[0])) {
        SendCard(message, args[0])
    } else
    //si la recherhe est basée sur une chaine de caractère
    {
        const name = args.join('%20');
        let Url = 'http://arkhamdb.fr.cr/recherche/' + name
        console.log(Url)


        let jsdom = JSDOM.fromURL(Url).then(dom => {

            let { window } = dom;
            let { document } = window;
            const $ = global.jQuery = require('jquery')(window);

            global.window = window;
            global.document = document;

            $(document).ready(function() {
                //recuperation du bon tableau
                let table = document.getElementsByTagName("table")[2];
                console.dir(table);
                if (table === undefined) {
                    table = document.getElementsByTagName("table")[1];
                }
                if (table === undefined) {
                    table = document.getElementsByTagName("table")[0];
                }
                if (table != undefined) {

                    let tbody = table.tBodies[0];
                    let nombreLignes = tbody.rows.length;
                    let ligneUne = tbody.rows[0];
                    let ligneDeux = tbody.rows[1];

                    if (ligneDeux == undefined) {
                        //Si une seule ligne
                        let celluleUne = ligneUne.cells[0];
                        let url = celluleUne.getElementsByTagName("a")[0].pathname;
                        let id = url.split('/')[2];
                        console.log('ID : ', id);
                        SendCard(message, id);
                    } else {
                        //Si plusieurs lignes
                        message.reply('Plusieurs références pour ce terme : <http://arkhamdb.fr.cr/recherche/' + name + '>');
                    }
                } else {
                    //Si pas de resultat
                    message.reply('Aucune référence de cette carte dans le Necronomicon');
                }

            })

        })

    }
}

function SendCard(message, num) {
    let linkUrl
    const http = require('http');
    linkUrl = 'http://arkhamdb.fr.cr/IMAGES/CARTES/AH-' + num + '.jpg'
    console.log(linkUrl)
    http.get(linkUrl, (resp) => {
        const { statusCode } = resp;
        console.log("statusCode : " + statusCode);
        if (statusCode !== 200) {
            linkUrl = 'http://arkhamdb.com/bundles/cards/' + num + '.png'
            console.log(linkUrl)
            http.get(linkUrl, (resp) => {
                const { statusCode } = resp;
                console.log("statusCode : " + statusCode);
                if (statusCode !== 301) {
                    message.reply('désolé le mystère de cette carte reste entier')
                } else {
                    message.reply(linkUrl)
                }
            })
        } else {
            message.reply(linkUrl)
                //try to send back
            linkUrl = 'http://arkhamdb.fr.cr/IMAGES/CARTES/AH-' + num + '_back.jpg'
            console.log(linkUrl)
            http.get(linkUrl, (resp) => {
                const { statusCode } = resp;
                console.log("statusCode : " + statusCode);
                if (statusCode == 200) {
                    message.reply('http://arkhamdb.fr.cr/IMAGES/CARTES/AH-' + num + '_back.jpg')
                }
            })
        }
    })
}


exports.help = {
    name: "ha"
};