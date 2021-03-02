const axios = require("axios");
const cheerio = require("cheerio");

const CardService = {
  /**
   * Renvoie une liste de carte correspondant au texte recherché.
   * @param {string} searchString - Le texte recherché
   * @returns {Array<{title: string; xp?: number; id: string;}>} Un tableau
   *   avec les informations suivantes : titre de la carte, XP de la card, id
   *   de la carte.
   */
  getCardsForTitle: async (searchString) => {
    const escaped = encodeURIComponent(searchString);
    const url = `http://arkhamdb.fr.cr/recherche/${escaped}`;
    const searchResultPage = await axios.get(url);
    const $ = cheerio.load(searchResultPage.data);

    const REGEX = /^([^(]+)(?: \((\d)\))?$/;

    const cards = $("table.tableau")
      // C'est toujours le dernier tableau qui contient la recherche par titre
      .last()
      .find("tbody tr")
      .map((_i, row) => {
        const cardTitleAndLink = $(row).find("td").first();
        const cardTitleAndXp = cardTitleAndLink.text().trim();
        const cardLink = cardTitleAndLink.find("a").attr("href");
        const [, cardTitle, cardXp] = REGEX.exec(cardTitleAndXp);
        return {
          title: cardTitle,
          xp: cardXp,
          id: cardLink.split("/")[4],
        };
      })
      .get();
    return cards;
  },

  /**
   * Renvoie le lien vers l'image de la carte dont l'ID a été fourni.
   * @param {string} cardId - L'ID de la carte
   * @returns {string | undefined} Le lien vers l'image de la carte ou
   *   `undefined` si elle n'a pas été trouvée.
   */
  getCardLink: (cardId) => {
    const urlToTest = [
      `http://arkhamdb.fr.cr/IMAGES/CARTES/AH-${cardId}.jpg`,
      `http://arkhamdb.com/bundles/cards/${cardId}.jpg`,
      `http://arkhamdb.com/bundles/cards/${cardId}.png`,
    ];
    return firstWorkingUrl(urlToTest);
  },

  /**
   * Renvoie le lien vers l'image du dos de la carte dont l'ID a été fourni.
   * @param {string} cardId - L'ID de la carte
   * @returns {string | undefined} Le lien vers l'image du dos de la carte ou
   *   `undefined` si elle n'a pas été trouvée.
   */
  getCardBackLink: (cardId) => {
    const urlToTest = [
      `http://arkhamdb.fr.cr/IMAGES/CARTES/AH-${cardId}_back.jpg`,
      `http://arkhamdb.com/bundles/cards/${cardId}b.jpg`,
      `http://arkhamdb.com/bundles/cards/${cardId}b.png`,
    ];
    return firstWorkingUrl(urlToTest);
  },
};

/**
 * Renvoie le premier lien qui fonctionne parmi la liste fournie.
 * @param {string[]} urls - Une liste de lien à tester
 * @returns {string | undefined} Le premier lien qui fonctionne dans la liste
 *   ou `undefined` si aucun ne fonctionne.
 */
function firstWorkingUrl(urls) {
  return urls
    .reduce((previous, url) => {
      if (previous) {
        return previous.catch(() => {
          return axios.head(url).then((response) => {
            return response.config.url;
          });
        });
      } else {
        return axios.head(url).then((response) => {
          return response.config.url;
        });
      }
    }, undefined)
    .catch(() => {
      return undefined;
    });
}

module.exports = CardService;
