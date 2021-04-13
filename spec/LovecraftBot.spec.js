const { expect } = require("chai");
const { beforeEach, describe, it } = require("mocha");
const sinon = require("sinon");
const LovecraftBot = require("../src/LovecraftBot");
const MockDiscordClient = require("./support/MockDiscordClient");
const MockDiscordMessage = require("./support/MockDiscordMessage");

let mockClient;
let bot;

const pingCommand = {
  shouldExecute: (message) => {
    return message.content === "ping";
  },
  execute: async (message) => {
    message.reply("pong");
    return;
  },
};

describe("LovecraftBot", () => {
  beforeEach(() => {
    mockClient = new MockDiscordClient();
    bot = new LovecraftBot(mockClient);
  });

  describe("Réponse aux messages", () => {
    it("exécute la commande si elle doit l'être", async () => {
      bot.registerCommand(pingCommand);
      const message = new MockDiscordMessage("ping");
      message.reply = sinon.fake();
      await mockClient.emit("message", message);

      expect(message.reply).to.have.been.calledOnce;
      expect(message.reply).to.have.been.calledWith("pong");
    });

    it("exécute la commande si elle ne doit pas l'être", async () => {
      bot.registerCommand(pingCommand);
      const message = new MockDiscordMessage("paf");
      message.reply = sinon.fake();
      await mockClient.emit("message", message);

      expect(message.reply).to.not.have.been.called;
    });

    it("n'exécute pas la commande si le message vient d'un bot", async () => {
      bot.registerCommand(pingCommand);
      const message = new MockDiscordMessage("ping", true);
      message.reply = sinon.fake();
      await mockClient.emit("message", message);

      expect(message.reply).to.not.have.been.called;
    });
  });
});
