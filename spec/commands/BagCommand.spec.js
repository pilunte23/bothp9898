const { expect } = require("chai");
const { beforeEach, describe, it } = require("mocha");
const sinon = require("sinon");
const LovecraftBot = require("../../src/LovecraftBot");
const MockDiscordClient = require("../support/MockDiscordClient");
const MockDiscordMessage = require("../support/MockDiscordMessage");

let mockClient;
let bot;

describe("BagCommand", () => {
  beforeEach(() => {
    mockClient = new MockDiscordClient();
    mockClient.emojis = {
      cache: {
        find: sinon.fake.returns("MON_EMOJI"),
      },
    };
    bot = new LovecraftBot(mockClient);
  });

  it("s'exécute quand il voit '!bag'", async () => {
    const message = new MockDiscordMessage("!bag");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.have.been.called;
  });

  it("s'exécute quand il voit '!bag' peu importe la casse", async () => {
    const message = new MockDiscordMessage("!Bag");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.have.been.called;
  });

  it("s'exécute quand il voit '!bag', même au milieu de la phrase", async () => {
    const message = new MockDiscordMessage(
      "HP, donne moi un jeton !bag et que ça saute"
    );
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.have.been.called;
  });

  it("ne s'exécute pas quand il voit '!bag' au milieu d'un mot", async () => {
    const message = new MockDiscordMessage("Oula !bagages");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.not.have.been.called;
  });

  it("ne s'exécute pas quand il voit '!bag' au milieu d'un mot", async () => {
    const message = new MockDiscordMessage("Oula !bagages");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.not.have.been.called;
  });

  it("renvoie un jeton aléatoire", async () => {
    const randStub = sinon.stub(Math, "random").returns(0);
    const message = new MockDiscordMessage("!bag");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(randStub).to.have.been.called;
    expect(message.channel.send).to.have.been.calledWith("MON_EMOJI");
    randStub.restore();
  });
});
