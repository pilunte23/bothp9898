const { MessageEmbed } = require("discord.js");
const Command = require("../Command");

/**
 * Une commande pour afficher la dernière liste taboos.
 * @extends Command
 */
class TabooCommand extends Command {
  constructor() {
    super();
  }

  shouldExecute(message) {
    return /!(taboos|taboo|tabous|tabou|tb)\b/i.test(message.content);
  }

  getHelp() {
    return ["!taboos", "Affiche la dernière liste des Taboos"];
  }

  execute(message) {
    const embed = new MessageEmbed()
      .setTitle("Tabous Version Octobre 2020")
      .setDescription(
        "Adhérer à la Liste des Tabous est entièrement optionnel. Les investigateurs ne sont pas obligés de se conformer aux restrictions indiquées ici ; mais s’ils choisissent de le faire, ils doivent les appliquer dans leur intégralité (au lieu de choisir celles qu’ils souhaitent utiliser et celles qu’ils veulent laisser de côté)."
      )
      .setColor("#1B8CEA")
      .addField(
        "**Enchaînées/Déchaînées**",
        "Les cartes de cette liste voient leur coût en expérience augmenté par le nombre de points à côté de leur titre, tel que listé ci-dessous. Le niveau de chaque carte reste le même : seule l’expérience dépensée pour l’acheter évolue. Cette expérience supplémentaire doit être prise en compte lorsque vous améliorez une carte de cette liste (depuis une moindre version vers celle-ci, ou depuis celle-ci vers une meilleure version).\n- **Machette** : +1 expérience \n- **Insaisissable** : +2 expérience \n- **Eclaireur** : +2 expérience \n- **Cran d Arrêt(niveau 2)** : +1 expérience \n- **Études Supérieures** : +3 expérience \n- **Débrouillard** : +3 expérience \n- **Bagarreur** : +1 expérience \n- **Springfield M1903**: -1 expérience \n- **Lance-Flamme**: -1 expérience \n- **Partir Perdant** : +3 expérience \n- **M. « Rook »** : +4 expérience \n- **Le Savoir c’est le Pouvoir** : +2 expérience \n- **Segment d’Onyx** : +3 expérience \n- **Le Necronomicon (Traduction de Petrus de Dacia)** : +3 expérience"
      )
      .addField(
        "**Mutées**",
        "Les cartes de cette liste subissent un ajout ou une modification de texte, tel que décrit ci-dessous.\n- **Dr. Milan Christopher** – La capacité <:ResponseAction:443358346586619904> de cette carte indique désormais : « Après que vous avez enquêté avec succès, inclinez le Dr. Milan Christopher… »\n- **Rex Murphy** – La capacité <:ResponseAction:443358346586619904> de cette carte gagne : « (Limite d’une fois par round.) »\n- **Creuser Trop Profondément** – Cette carte gagne : « (Limite collective de 2 exemplaires de Creuser Trop Profondément dans la pile de victoire.) »\n- **Présence d’Esprit** – Cette carte gagne : « max. une fois par round. » à la fin de sa capacité\n- **Un Atout dans la Manche** – Cette carte gagne : « max.une fois par round. »\n- **Tour de Passe-Passe** - La capacité de cette carte indique désormais : « Mettez en jeu un soutien Objet de niveau 0 à 3 de votre main. »»\n- **Clé d’Ys** : Cette carte gagne le mot-clé Exceptionnel."
      )
      .addField(
        "**Mutées (suite)**",
        "- **Le Tout pour le Tout** – Cette carte gagne : « Retirez Le Tout pour le Tout de la partie. » à la fin de sa capacité.\n- **Parchemin des Secrets (les trois versions)** – Les capacités <:Action:443358538425958400> de ces cartes sont désormais des capacités <:FastAction:443358490619150338>.\n- **Winchester .35** – La capacité <:Action:443358538425958400> de cette carte dit désormais : « <:Action:443358538425958400> Dépensez 1 munition : Combattre. Vous gagnez +2<:SkillCombat:443358226118082571> pour cette attaque. Si un pion Chaos avec un modificateur non-négatif est révélé lors de cette attaque, cette attaque inflige +2 dégâts. »"
      )
      .addField(
        "**Interdites**",
        "Les cartes de cette liste ne peuvent pas être inclues dans votre deck. \n **Quitte ou Double**"
      );
    message.channel.send(embed);
  }
}

module.exports = TabooCommand;
