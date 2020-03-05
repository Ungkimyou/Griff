module.exports = {
  name: "start",
  usage: "**start #channel time(s/h/d) winners prize",
  category: "moderation",
  description: "giveaway command",
  run: async (client, message, args) => {
    const ms = require("ms");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(
        ":x: You need to have the manage messages permissions to start giveaways."
      );
    }
    let giveawayChannel = message.mentions.channels.first();
    if (!giveawayChannel) {
      return message.channel.send(":x: You have to mention a valid channel!");
    }
    let giveawayDuration = args[1];
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
      return message.channel.send(":x: You have to specify a valid duration!");
    }
    let giveawayNumberWinners = args[2];
    if (isNaN(giveawayNumberWinners)) {
      return message.channel.send(
        ":x: You have to specify a valid number of winners!"
      );
    }
    let giveawayPrize = args.slice(3).join(" ");
    if (!giveawayPrize) {
      return message.channel.send(":x: You have to specify a valid prize!");
    }
    client.giveawaysManager.start(giveawayChannel, {
      time: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: giveawayNumberWinners,
      message: "{winner} on the {prize}",
      giveaway: "**Griffin-Bot Giveaway Has Started C'mon**"
    });
    message.channel.send(`Giveaway started in ${giveawayChannel}!`);
  }
};
