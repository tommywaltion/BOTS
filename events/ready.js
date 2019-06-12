const {bot} = require("../main")

bot.on("ready", async() => {
  console.log(`Bot is now online!, current bot is ${bot.user.tag}`);
  console.log(`${bot.user.username} is online on ${bot.guilds.size} server!`);

 

  let Status = [
    "help",
    "Dont afraid to ask!",
    "Custom made bot!",
    "Made by TommyWaltion#1756",
    "Welcome!",
    `over ${bot.users.size} user!`,
    `on ${bot.guilds.size} server!`
  ]

  bot.user.setActivity(Status[0], {type: "STREAMING"});

  setInterval(function() {
    let Stats = Status[Math.floor(Math.random() * Status.length)];
    bot.user.setActivity(Stats, {type: "STREAMING"});
  }, 15 * 60 * 1000);

})
