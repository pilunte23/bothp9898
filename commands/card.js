//const jsdom = require("jsdom");
const { JSDOM } = require('jsdom');

exports.run = (client, message, args) => {

    console.log(args);

    //si la recherche est basé sur un numéro
    if (args[0] == null){
        message.reply('Il faut saisir quelque chose après');
        return
    }
    if (args[0].match(/^\d/)) {
        SendCard(message, args[0])
    } else
    //si la recherhe est basée sur une chaine de caractère
    {
        let name = args.join('%20');
        let xp
        if (args.length >1){
            //si plus d'un argument et que le denier est numerique à alors carte à xp
            if (!isNaN(args[args.length - 1])){
                xp = args.pop()
                console.log(xp)
                args = args.splice(0,args.length )
                console.log(args)
                name = args.join('%20')
            }
        }       
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
                        if (xp  === undefined){
                            let celluleUne = ligneUne.cells[0];
                            let url = celluleUne.getElementsByTagName("a")[0].pathname;
                            let id = url.split('/')[2];
                            console.log('ID : ', id);
                            SendCard(message, id);
                        } else {
                            if (xp === '0'){
                                for (let i = 0; i < nombreLignes; i++) {
                                    let ligne = tbody.rows[i];
                                    let cellule= ligne.cells[0];                                 
                                    let url = cellule.getElementsByTagName("a")[0].pathname;
                                    let id = url.split('/')[2];
                                    console.log('ID : ', id);
                                    SendCard(message, id);                      
                                }     
                            }else
                            {
                                console.log(xp)
                                xp = '(' + xp + ')'
                                for (let i = 0; i < nombreLignes; i++) {
                                    let ligne = tbody.rows[i];
                                    let cellule= ligne.cells[0];
                                    console.log (cellule.textContent)
                                    if (cellule.textContent.includes(xp)){
                                        let url = cellule.getElementsByTagName("a")[0].pathname;
                                        let id = url.split('/')[2];
                                        console.log('ID : ', id);
                                        SendCard(message, id);
                                    }
                                }
                            }
                           
                        }
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
    const https = require('https');
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
                if (statusCode == 200 ) {
                    message.reply(linkUrl)
                }
                else {
                    linkUrl = 'http://arkhamdb.com/bundles/cards/' + num + '.jpg'
                    console.log(linkUrl)
                    http.get(linkUrl, (resp) => {
                        const { statusCode } = resp;
                        console.log("statusCode : " + statusCode);                          
                        if (statusCode == 200 ) {
                            message.reply(linkUrl)
                        }
                        else {
                            linkUrl = 'https://arkhamdb.com/bundles/cards/' + num + '.png'
                            console.log(linkUrl)
                            https.get(linkUrl, (resp) => {
                                const { statusCode } = resp;
                                console.log("statusCode : " + statusCode);
                                if (statusCode == 200 ) {
                                    message.reply(linkUrl)
                                }
                                else {
                                    linkUrl = 'https://arkhamdb.com/bundles/cards/' + num + '.jpg'
                                    console.log(linkUrl)
                                    https.get(linkUrl, (resp) => {
                                        const { statusCode } = resp;
                                        console.log("statusCode : " + statusCode);                          
                                        if (statusCode == 200 ) {
                                            message.reply(linkUrl)
                                        }
                                        else {
                                            message.reply('désolé le mystère de cette carte reste entier')
                                        }                                               
                                    })
                                }           
                            })
                        }                                               
                    })
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
    name: "card"
};