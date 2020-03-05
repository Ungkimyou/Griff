module.exports = {
  name: "end",
  usage: "g!end giveaway message id",
  category: "moderation",
  description: "giveaway command",
  run: async (client, message, args) => {
    const ms = require("ms");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        ":x: You need to have the manage messages permissions to reroll giveaways."
      );
    }
    let messageID = args[0];
    if (!messageID) {
      return message.channel.send(
        ":x: You have to specify a valid message ID!"
      );
    }

    try {
      client.giveawaysManager.edit(messageID, {
        setEndTimestamp: Date.now()
      });
      message.channel.send(
        "Giveaway will end in less than " +
          client.giveawaysManager.options.updateCountdownEvery / 1000 +
          " seconds..."
      );
    } catch (error) {
      if (error.startsWith(`No giveaway found with ID ${messageID}.`)) {
        message.channel.send(
          "Cannot find any giveaway for the message ID: " + messageID
        );
      }
    }
  }
};
