const fs = require("fs");
const { promisify } = require("util");
const CardService = require("./CardService");

const readdir = promisify(fs.readdir);

/**
 * Un Bot pour le serveur Discord français de Horreur à Arkham : le jeu de
 * cartes.
 */
class LovecraftBot {
  /**
   * Créé un LovecraftBot.
   * @param {Discord.Client} client - Le client Discord.js
   */
  constructor(client) {
    this.client = client;
    this.cardService = CardService;
    this.commands = [];

    this._loaded = this._loadCommands();
    this._isWorking = undefined;

    this.client.on("message", this.handleMessage.bind(this));
  }

  /**
   * Renvoie le CardService qui va permettre d'avoir des informations sur les
   * cartes.
   * @returns {CardService} Le CardService
   */
  getCardService() {
    return this.cardService;
  }

  /**
   * Enregistre une commande pour ce bot.
   * @param {Command} command - La commande à enregistrer.
   */
  registerCommand(command) {
    this.commands.push(command);
  }

  /**
   * Traite un message reçu.
   * @param {Discord.Message} message - le message reçu
   * @returns {Promise<void[]>} - Promesse d'exécution des commandes
   */
  handleMessage(message) {
    if (isMessageFromBot(message)) {
      return;
    }

    const commandsForMessage = this.commands.filter((command) =>
      command.shouldExecute(message)
    );

    this._isWorking = Promise.all(
      commandsForMessage.map((command) => command.execute(message, this))
    ).then(() => {
      this._isWorking = undefined;
    });
  }

  /**
   * Retourne la promesse de chargement des commandes afin de chaîner avec des
   * actions à ne lancer qu'une fois les commandes chargées. Utile pour les
   * tests.
   * @returns {Promise<void>} - La promesse de chargement des méthodes
   */
  whenCommandsLoaded() {
    return this._loaded;
  }

  /**
   * Retourne la promesse de traitement des messages qui ne sera résolue qu'une
   * fois les messages traités. Utile pour les tests.
   * @returns {Promise<void>} - La promesse de chargement des méthodes
   */
  whenDone() {
    if (this._isWorking) {
      return this._isWorking;
    } else {
      return Promise.resolve();
    }
  }

  /**
   * Charge l'ensemble des commandes.
   * @returns {Promise<void>} Une promesse de chargement des commandes
   */
  _loadCommands() {
    return readdir("./src/commands/").then((files) => {
      for (const file of files) {
        const commandConstructor = require(`./commands/${file}`);
        this.registerCommand(new commandConstructor());
      }
    });
  }
}

/**
 * Indique si le message est en provenance d'un bot.
 * @param {Discord.Message} message - le message reçu
 * @returns {boolean} Vrai s'il s'agit d'un message d'u, bot, faux sinon.
 */
function isMessageFromBot(message) {
  return message.author.bot;
}

module.exports = LovecraftBot;
