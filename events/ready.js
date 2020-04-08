let rand = require('../function/random.js');

module.exports = (client) => {
    console.log(client.user.username + ' se réveille avec le tag : ' + client.user.tag)
        //ajout d'un status aléatoire
    const gameArray = ["Contrée de l'Horreur", "Le Signe des Anciens", "Horreur à Arkham JCE", "Horreur à Arkham", "Les Demeures de l'Epouvante"]
    client.user.setActivity(gameArray[rand.getRandomInt(5)]).catch(console.error)
};