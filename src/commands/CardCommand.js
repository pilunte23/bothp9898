const Command = require("../Command");

const CARD_COMMAND_REGEX = /^.*\s!(?:!|c|carte|cartes|card|cards)\s(\D*)(?: (\d))?$/;

/**
 * Une commande pour afficher la dernière liste taboos.
 * @extends Command
 */
class CardCommand extends Command {
  constructor() {
    super();
  }

  shouldExecute(message) {
    return CARD_COMMAND_REGEX.test(message.content);
  }

  getHelp() {
    return ["!! [texte recherché] [xp]", "Cherche et affiche une carte"];
  }

  async execute(message, bot) {
    const [, searchString, maybeXp] = CARD_COMMAND_REGEX.exec(message.content);

    // Recherche des cartes par titre
    const cards = await bot.getCardService().getCardsForTitle(searchString);
    if (cards.length > 0) {
      let cardsToDisplay = [];
      if (maybeXp && maybeXp !== "0") {
        // La première carte avec le niveau d'XP précisé
        const cardsWithGivenXp = cards.find((c) => c.xp === maybeXp);
        cardsToDisplay = cardsWithGivenXp ? [cardsWithGivenXp] : [];
      } else if (maybeXp && maybeXp === "0") {
        // Tous les niveaux de la première cafrte trouvée
        cardsToDisplay = cards.filter((c) => (c.title = cards[0].title));
      } else {
        // Seulement la première carte trouvée
        cardsToDisplay = [cards[0]];
      }

      // Récupération des images
      const linksToSend = await Promise.all(
        cardsToDisplay.map((card) =>
          Promise.all([
            bot.getCardService().getCardLink(card.id),
            bot.getCardService().getCardBackLink(card.id),
          ])
        )
      ).then((t) => t.flat().filter((el) => el !== undefined));

      // Réponse en envoyant les liens qui fonctionnent
      if (linksToSend.length > 0) {
        return Promise.all(linksToSend.map((link) => message.reply(link)))
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
      }
    }

    return message
      .reply("Désolé, le mystère de cette carte reste entier.")
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

module.exports = CardCommand;
