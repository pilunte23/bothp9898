/**
 * Renvoie un entier aléatoire compris entre 2 valeurs (incluses).
 * @param {number} min - Valeur minimum
 * @param {number} max - Valeur maximum
 * @returns {number} Un entier aléatoire compris entre `min` et `max` inclus.
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.randomInt = randomInt;
