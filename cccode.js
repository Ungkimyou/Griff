module.exports = async (client, message, args, member) => {
  const db = require("quick.db");
  const Discord = require("discord.js");
  const { Canvas } = require("canvas-constructor");
  const fetch = require("node-fetch");
  const name = message.member.user.username;
  const user = message.author;
  const level = await db.fetch(`level_${user.id}`);
  if (level === null) level = 0;
  const xp = db.fetch(`xp_${user.id}`);
  if (xp === null) xp = 0;
  const nxp = db.fetch(`nxp_${user.id}`);
  if (nxp === null) nxp = 0;
  if (xp >= nxp) {
    message.channel.send(`<@${user.id}> You leveled up yayyy.`);
    db.subtract(`xp_${user.id}`, nxp);
    db.add(`level_${user.id}`, 1);
    db.add(`nxp_${user.id}`, 100);
  }
  const boyL = await fetch(
    "https://cdn.discordapp.com/attachments/650333041025351731/669450766506917898/Logopit_1579679870456.png"
  );
  const av = await message.author.displayAvatarURL;
  const boy = await boyL.buffer();
  const avL = await fetch(av);
  const avatar = await avL.buffer();
  const imgL = await fetch(
    "https://cdn.glitch.com/256ccade-fb85-42e6-882f-cd3dd81f765c%2Fcurrentlevel.png?v=1580460198697"
  );
  const image = await imgL.buffer();
};
