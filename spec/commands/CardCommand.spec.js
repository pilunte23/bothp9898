const { expect } = require("chai");
const { beforeEach, describe, it } = require("mocha");
const sinon = require("sinon");
const LovecraftBot = require("../../src/LovecraftBot");
const MockDiscordClient = require("../support/MockDiscordClient");
const MockDiscordMessage = require("../support/MockDiscordMessage");

let mockClient;
let bot;
let fakeCardService;

describe("CardCommand", () => {
  beforeEach(() => {
    mockClient = new MockDiscordClient();
    bot = new LovecraftBot(mockClient);
    fakeCardService = {
      getCardsForTitle: sinon.fake.returns(
        Promise.resolve([
          {
            title: "Nier l'Existence",
            xp: undefined,
            id: "05032",
          },
          {
            title: "Nier l'Existence",
            xp: "5",
            id: "05280",
          },
          {
            title: "Une autre carte",
            xp: undefined,
            id: "99999",
          },
        ])
      ),
      getCardLink: sinon.fake.returns(
        Promise.resolve("http://arkhamdb.fr.cr/IMAGES/CARTES/AH-05032.jpg")
      ),
      getCardBackLink: sinon.fake.returns(Promise.resolve(undefined)),
    };

    sinon.stub(bot, "getCardService").returns(fakeCardService);
  });

  for (const trigger of ["!!", "!c", "!carte", "!cartes", "!card", "!cards"]) {
    it(`s'exécute quand il voit '${trigger}'`, async () => {
      const message = new MockDiscordMessage(`Bonjour, ${trigger} Nier`);
      message.reply = sinon.fake();
      await bot.whenCommandsLoaded();
      mockClient.emit("message", message);
      await bot.whenDone();
      expect(message.reply).to.have.been.called;
    });
  }

  it("renvoie la première carte si appelé sans numéro", async () => {
    const message = new MockDiscordMessage(`Bonjour, !! Nier`);
    message.reply = sinon.fake();
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    await bot.whenDone();
    expect(message.reply).to.have.been.calledWith(
      "http://arkhamdb.fr.cr/IMAGES/CARTES/AH-05032.jpg"
    );
  });

  it("renvoie la carte avec l'XP correspondant si appelé avec un numéro différent de 0", async () => {
    const message = new MockDiscordMessage(`Bonjour, !! Nier 5`);
    message.reply = sinon.fake();
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    await bot.whenDone();
    expect(fakeCardService.getCardLink).to.have.been.calledWith("05280");
  });

  it("renvoie toutes les versions de la première carte si appelé avec 0", async () => {
    const message = new MockDiscordMessage(`Bonjour, !! Nier 0`);
    message.reply = sinon.fake();
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    await bot.whenDone();
    expect(fakeCardService.getCardLink).to.have.been.calledWith("05032");
    expect(fakeCardService.getCardLink).to.have.been.calledWith("05280");
  });
});
