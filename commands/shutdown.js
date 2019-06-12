const discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
    if(message.author.id != '274154221257883659') return;


    try {
        await message.channel.send("Shutting down...")
        process.exit()
    }catch(e){
        message.channel.send(`ERROR: ${e.message}`)
    }
}

module.exports.config = {
    name: "shutdown",
    aliases: ["shutdown","stopped","stops"]
}