const Command = require("../Command");

const CARD_COMMAND_REGEX = /^.*!(?:!|c|carte|cartes|card|cards)\s(\D*)(?: (\d))?$/;
const CARD_ID_COMMAND_REGEX = /^.*!(?:!|c|carte|cartes|card|cards)\s(\d+).*$/;

/**
 * Une commande pour afficher la dernière liste taboos.
 * @extends Command
 */
class CardCommand extends Command {
  constructor() {
    super();
  }

  shouldExecute(message) {
    return (
      CARD_COMMAND_REGEX.test(message.content) ||
      CARD_ID_COMMAND_REGEX.test(message.content)
    );
  }

  getHelp() {
    return ["!! [texte recherché] [xp]", "Cherche et affiche une carte"];
  }

  async execute(message, bot) {
    let cardIds = [];
    if (CARD_ID_COMMAND_REGEX.test(message.content)) {
      // C'est un ID de carte qui est demandé
      const [, cardId] = CARD_ID_COMMAND_REGEX.exec(message.content);
      cardIds = [cardId];
    } else if (CARD_COMMAND_REGEX.test(message.content)) {
      // C'est une recherche par titre de la carte
      const [, searchString, maybeXp] = CARD_COMMAND_REGEX.exec(
        message.content
      );

      // Recherche des cartes par titre
      const cards = await bot.getCardService().getCardsForTitle(searchString);

      if (cards.length > 0) {
        if (maybeXp && maybeXp !== "0") {
          // La première carte avec le niveau d'XP précisé
          const maybeCardWithGivenXp = cards.find((c) => c.xp === maybeXp);
          cardIds = maybeCardWithGivenXp ? [maybeCardWithGivenXp.id] : [];
        } else if (maybeXp && maybeXp === "0") {
          // Tous les niveaux de la première cafrte trouvée
          cardIds = cards
            .filter((c) => (c.title = cards[0].title))
            .map((c) => c.id);
        } else {
          // Seulement la première carte trouvée
          cardIds = [cards[0].id];
        }
      }
    }

    if (cardIds.length > 0) {
      // Récupération des images
      const linksToSend = await Promise.all(
        cardIds.map((id) =>
          Promise.all([
            bot.getCardService().getCardLink(id),
            bot.getCardService().getCardBackLink(id),
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
