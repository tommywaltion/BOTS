const { Client, Collection } = require("discord.js");
const bot = new Client({disableEveryone: true});

let y = process.openStdin()
    y.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)
        bot.channels.get('572033832665219074').send(x.join(" "));
    })
require("./event")(bot);
bot.commands = new Collection();
bot.aliases = new Collection();

module.exports = {
  bot: bot
};
bot.login(process.env.BOT_TOKEN);