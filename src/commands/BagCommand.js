const Command = require("../Command");
const { randomInt } = require("../utils");

const ZELATRICE_STANDARD = [
  "p1",
  "p0",
  "p0",
  "m1",
  "m1",
  "m1",
  "m2",
  "m2",
  "m3",
  "m4",
  "ChaosSkull",
  "ChaosSkull",
  "ChaosCultist",
  "ChaosTablet",
  "ChaosFail",
  "ChaosElderSign",
];

/**
 * Une commande pour tirer un jeton Chaos.
 * @extends Command
 */
class BagCommand extends Command {
  constructor() {
    super();
  }

  shouldExecute(message) {
    return /!bag\b/i.test(message.content);
  }

  getHelp() {
    return ["!bag", "Pioche un jeton dans le Chaos Bag"];
  }

  execute(message, bot) {
    const token =
      ZELATRICE_STANDARD[randomInt(0, ZELATRICE_STANDARD.length - 1)];
    const emojiToken = bot.client.emojis.cache.find(
      (emoji) => emoji.name === token
    );

    if (emojiToken) {
      return message.channel.send(`${emojiToken}`);
    }
  }
}

module.exports = BagCommand;
