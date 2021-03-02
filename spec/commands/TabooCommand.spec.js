const { expect } = require("chai");
const { beforeEach, describe, it } = require("mocha");
const sinon = require("sinon");
const LovecraftBot = require("../../src/LovecraftBot");
const MockDiscordClient = require("../support/MockDiscordClient");
const MockDiscordMessage = require("../support/MockDiscordMessage");

let mockClient;
let bot;

describe("TabooCommand", () => {
  beforeEach(() => {
    mockClient = new MockDiscordClient();
    bot = new LovecraftBot(mockClient);
  });

  it("s'exécute quand il voit '!tb'", async () => {
    const message = new MockDiscordMessage("Bonjour, !tb stp");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.have.been.called;
  });

  it("s'exécute quand il voit '!taboo'", async () => {
    const message = new MockDiscordMessage("Vite la liste !taboo");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.have.been.called;
  });

  it("s'exécute quand il voit '!taboos'", async () => {
    const message = new MockDiscordMessage("Vite les !taboos");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.have.been.called;
  });

  it("s'exécute quand il voit '!tabou'", async () => {
    const message = new MockDiscordMessage("C'est quoi un !tabou ?");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.have.been.called;
  });

  it("s'exécute quand il voit '!tabous'", async () => {
    const message = new MockDiscordMessage("Ah bon y'a des !tabous ?");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.have.been.called;
  });

  it("ne s'exécute pas quand il ne voit pas '!tabou'", async () => {
    const message = new MockDiscordMessage(
      "Le tabac c'est tabou, on en viendra tous à bout"
    );
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.not.have.been.called;
  });

  it("envoie une description des taboos", async () => {
    const message = new MockDiscordMessage("Bonjour, !tb stp");
    message.channel = {
      send: sinon.fake(),
    };
    await bot.whenCommandsLoaded();
    mockClient.emit("message", message);
    expect(message.channel.send).to.have.been.called;
    const messageEnvoye = message.channel.send.firstArg;
    expect(messageEnvoye.title).to.not.be.undefined;
    expect(messageEnvoye.title).to.include("Tabous");
    expect(messageEnvoye.description).to.not.be.undefined;
    expect(messageEnvoye.fields).to.have.length.above(0);
  });
});
