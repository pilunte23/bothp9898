/* eslint-disable no-unused-vars */
/**
 * Classe abstraite pour les commandes auxquelles le Bot peut répondre.
 */
class Command {
  /**
   * Précise si la commande devrait s'exécuter sur la base du message reçu.
   * @param {Discord.Message} message - Le message reçu.
   # @returns {boolean} Vrai si la commande devrait s'exécuter, faux sinon.
   */
  shouldExecute(message) {
    throw new Error("non implémenté");
  }

  /**
   * Renvoie le texte d'aide de la commande.
   * @returns {string[]} Un tableau avec en premier élément le nom de la
   *   commande et en second la description de la commande.
   */
  getHelp() {
    throw new Error("non implémenté");
  }

  /**
   * Exécute la commande.
   * @param {Discord.Message} message - le message qui a déclenché la commande
   * @param {LovecraftBot} bot - le LovecraftBot qui exécute la commande
   * @param {Promise<any>}
   *  sinon.
   */
  execute(message, bot) {
    throw new Error("non implémenté");
  }
}

module.exports = Command;
