const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setTitle("Tabous")
        .setDescription("Adhérer à la Liste des Tabous est entièrement optionnel. Les investigateurs ne sont pas obligés de se conformer aux restrictions indiquées ici ; mais s’ils choisissent de le faire, ils doivent les appliquer dans leur intégralité (au lieu de choisir celles qu’ils souhaitent utiliser et celles qu’ils veulent laisser de côté).")
        .setColor("#1B8CEA")
        .addField("**Enchaînées/Déchaînées**", "Les cartes de cette liste voient leur coût en expérience augmenté par le nombre de points à côté de leur titre, tel que listé ci-dessous. Le niveau de chaque carte reste le même : seule l’expérience dépensée pour l’acheter évolue. Cette expérience supplémentaire doit être prise en compte lorsque vous améliorez une carte de cette liste (depuis une moindre version vers celle-ci, ou depuis celle-ci vers une meilleure version).\n- **Machette** : +2 expérience \n- **Insaisissable** : +2 expérience \n- **Quitte ou Double** : +3 expérience \n- **Cran d Arrêt(niveau 2)** : +1 expérience \n- **Études Supérieures** : +5 expérience \n- **Débrouillard** : +5 expérience \n- **Bagarreur** : +2 expérience \n- **Springfield M1903**: -1 expérience \n- **Partir Perdant** : +3 expérience ")
        .addField("**Mutées**", "Les cartes de cette liste subissent un ajout ou une modification de texte, tel que décrit ci-dessous.\n- **Dr. Milan Christopher** – La capacité <:ResponseAction:443358346586619904> de cette carte indique désormais : « Après que vous avez enquêté avec succès, inclinez le Dr. Milan Christopher… »\n- **Rex Murphy** – La capacité <:ResponseAction:443358346586619904> de cette carte gagne : « (Limite d’une fois par round.) »\n- **Creuser Trop Profondément** – Cette carte gagne : « (Limite collective de 2 exemplaires de Creuser Trop Profondément dans la pile de victoire.) »\n- **Présence d’Esprit** – Cette carte gagne : « 1 max. attribuée par test de compétence. »\n- **Un Atout dans la Manche** – Cette carte gagne : « (Limite d’une fois par round.) »\n- **Tour de Passe-Passe** - La capacité de cette carte indique désormais : « Mettez en jeu un soutien Objet de votre main qui occupe moins de 2 emplacements de main. »\n- **Clé d’Ys** : Cette carte gagne le mot-clé Exceptionnel.")
        .addField("**Interdites**", "Les cartes de cette liste ne peuvent pas être inclues dans votre deck. \n Pour le moment, la liste des cartes interdites est vide")
    message.channel.send(embed);
}

exports.help = {
    name: "taboos"
};