const { EventEmitter } = require("events");

class MockDiscordClient extends EventEmitter {
  constructor() {
    super();
  }
}

module.exports = MockDiscordClient;
