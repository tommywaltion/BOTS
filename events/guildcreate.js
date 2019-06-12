const config = require('../config.json')
const guildConfig = require('../guildConfig.json')
const {bot} = require('../main')
const fs = require('fs')

bot.on("guildCreate", (guild) => { // If the Bot was added on a server, proceed
	welcomeChannels = bot.channels.find("name", "general");
	suggestChannels = bot.channels.find("name", "suggest-channel");
	logChannels = bot.channels.find("name","log-channel");
    if (!guildConfig[guild.id]) { // If the guild's id is not on the GUILDCONF File, proceed
	guildConfig[guild.id] = {
		prefix: config.prefix,
		welcomeChannel: welcomeChannels,
		suggestChannel: suggestChannels,
		logChannel: logChannels
	    }
    }
     fs.writeFile('./guildConfig.json', JSON.stringify(guildConfig, null, 2), (err) => {
     	if (err) console.log(err)
	})
});