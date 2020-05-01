const { MessageEmbed } = require('discord.js');
exports.run = (client, message) => {

    /*
        <:ClassRogue:443359489811546112>
    <:ClassMystic:443359703771250688>
    <:ClassSeeker:443359627195973634>
    <:ClassSurvivor:443359575131947008>
    <:ClassGuardian:443359750353190912>*/
    try {
        message.delete();

        const emojitTruand = client.emojis.cache.find(emoji => emoji.name === "ClassRogue");
        const emojitMystique = client.emojis.cache.find(emoji => emoji.name === "ClassMystic");
        const emojitChercheur = client.emojis.cache.find(emoji => emoji.name === "ClassSeeker");
        const emojitSurvivant = client.emojis.cache.find(emoji => emoji.name === "ClassSurvivor");
        const emojitGardien = client.emojis.cache.find(emoji => emoji.name === "ClassGuardian");
        const embed = new MessageEmbed()
            .setTitle("Attribution des Rôles")
            .setColor("#1B8CEA")
            .setDescription("Cliquer sur les réactions ci-dessous pour obtenir le rôle correspondant")
            .addField("Les rôles dispnibles", `
        ${emojitGardien} - Gardien : Si vous pensez maitriser assez le jeu pour répondre aux questions des novices.\n
        Si vous avez une question sur les règles , n'hesiter pas à utiliser la commande @Gardien
        ${emojitChercheur} - Chercheur : Si vous souhaitez participer au contenu fan made. \n
        (Création de scénarion , mise en carte, relecture , testeur)
        ${emojitTruand} - Truand : Utilisez utlérieurement.\n
        ${emojitMystique} - Mystique : Si vous diffusez du contenu media (youtube , article , etc ...) \n
        ${emojitSurvivant} - Survivant : Si vous posseder Table Top Simulator , ajoutez vous aux survivants.\n
        Si vous avez envie de lancer une partie mutlijoueur , n'hesiter pas à lancer la commande @Survivant
        `)


        message.channel.send(embed).then(async msg => {
            await msg.react(emojitGardien);
            await msg.react(emojitChercheur);
            await msg.react(emojitTruand);
            await msg.react(emojitMystique);
            await msg.react(emojitSurvivant);
        });
    } catch (e) {
        console.log(e);
    }
}


exports.help = {
    name: "roles"
};