class MockDiscordMessage {
  constructor(content, bot = false) {
    this.content = content;
    this.author = {
      bot,
    };
  }
}

module.exports = MockDiscordMessage;
