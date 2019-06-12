const guildConfig = require('../guildConfig.json')
const {bot} = require('../main')
const fs = require('fs')

bot.on("guildDelete", (guild) => { // If the Bot was removed on a server, proceed
    delete guildConfig[guild.id]; // Deletes the Guild ID and Prefix
    fs.writeFile('./guildConfig.json', JSON.stringify(guildConfig, null, 2), (err) => {
        if (err) console.log(err)
   })
});