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
        $(document).ready(function() {

            $('option').each(function(index, value) {
                if (args[0] == undefined) {
                    i = i + 1;
                    list = list + $(this).text() + "\n";
                    if (i > 50) {
                        /*message.reply(list).then(msg => {
                            msg.delete({ timeout: 50000 })
                        });
                        */
                        let embed = new MessageEmbed()
                            .setTitle("Liste des Points de règle : ")
                            .setDescription(list)
                            .setColor("#8B0000")
                            .addField("Tips", "Utilise la commande !rules suivi du point de règles ci-dessus pour avoir le détail")
                        message.channel.send(embed)
                        list = "";
                        i = 0;
                    }
                } else {
                    if (args.join(' ') == $(this).text()) {
                        console.log($(this).val());
                        $.post('http://castorjo.fr/ahlcg/quote/generate-rule.php', { keyword: $(this).val() }, function(data, status, jqXHR) {

                            let taille = data.length;

                            if (taille < 2000) {
                                var string = cleanString(data);
                                let embed = new MessageEmbed()
                                    .setTitle("Point de règle : " + args.join(' '))
                                    .setDescription(string)
                                    .setColor("#8B0000")
                                message.channel.send(embed)

                            } else {
                                var tableString = splitString(data, 1900, true);
                                let suite = '';
                                for (let i = 0; i < tableString.length; i++) {
                                    //console.log(i)
                                    //console.log(tableString[i])
                                    if (i > 0) {
                                        suite = '( Suite )';
                                    }
                                    let embed = new MessageEmbed()
                                        .setTitle("Point de règle : " + args.join(' ') + suite)
                                        .setDescription(cleanString(tableString[i]))
                                        .setColor("#8B0000")
                                    message.channel.send(embed)
                                }

                            }
                        })

                    }
                }

            })
        })
    })

}

exports.help = {
    name: "rules"
};

function splitString(string, size, multiline) {
    var matchAllToken = (multiline == true) ? '[^]' : '.';
    var re = new RegExp(matchAllToken + '{1,' + size + '}', 'g');
    return string.match(re);
}

function cleanString(str) {
    var stripedHtml = str.replace(/\[.?b\]/g, '**');
    stripedHtml = stripedHtml.replace(/\[.?u\]/g, '');
    stripedHtml = stripedHtml.replace(/\[.?quote.?/g, '');
    stripedHtml = stripedHtml.replace(/\[(.*?)\]/g, '');
    stripedHtml = stripedHtml.replace(/\]/g, '');
    stripedHtml = stripedHtml.replace(/(:action:)/g, '<:Action:443358538425958400>');
    stripedHtml = stripedHtml.replace(/(:free:)/g, '<:FastAction:443358490619150338>');
    stripedHtml = stripedHtml.replace(/(:reaction:)/g, '<:ResponseAction:443358346586619904>');
    stripedHtml = stripedHtml.replace(/(:inves:)/g, '<:InvestigatorIcon:443358431949357066>');
    stripedHtml = stripedHtml.replace(/(:crane:)/g, '<:ChaosSkull:443359879135232039>');
    stripedHtml = stripedHtml.replace(/(:cult:)/g, '<:ChaosCultist:443360241187291137>');
    stripedHtml = stripedHtml.replace(/(:rune:)/g, '<:ChaosTablet:443359804174630912>');
    stripedHtml = stripedHtml.replace(/(:poulpe:)/g, '<:ChaosElderOne:443360168458321935>');
    stripedHtml = stripedHtml.replace(/(:tentac:)/g, '<:ChaosFail:443359948970393610>');
    stripedHtml = stripedHtml.replace(/(:signe:)/g, '<:ChaosElderSign:443360082806177803>');
    return stripedHtml;
}