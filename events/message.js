const constants = require("../constants.js");

module.exports = (client, message) => {
  console.log("message : " + message);
  if (message.author.bot) return;
  console.log("prefix : " + constants.PREFIX);
  if (message.content.includes("hastur")) {
    const yellow = client.emojis.cache.find((emoji) => emoji.name === "yellow");
    message.reply(`tu as attiré celui dont il ne faut pas prononcer le nom`);
    message.reply(`${yellow}`);
  }
  if (message.content.indexOf(constants.PREFIX) !== 0) return;
  const args = message.content
    .slice(constants.PREFIX.length)
    .trim()
    .split(/ +/g);
  console.log("args : " + args);
  let command = args.shift().toLowerCase();
  if (command == "regles" || command == "r") command = "rules";
  if (command == "aide" || command == "h") command = "help";
  if (command == "s") command = "search";
  if (command == "d") command = "deck";
  if (command == "b") command = "blob";
  if (command == "t") command = "timing";
  if (command == "p") command = "phase";
  if (command == "rd") command = "random";
  const cmd = client.commands.get(command);
  if (!cmd) return undefined;
  cmd.run(client, message, args);
};

// Chaos Bag
// Lien de deck
// Lecture d'histoire lovecraft
