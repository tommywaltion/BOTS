const discord = require('discord.js')

module.exports.run = async(bot, message, args) => {
    if(message.author.id != '274154221257883659') return;
    if(!args[0]) return message.channel.send('Please spesify a command to reload').then(message.delete(), 2500);

    let commandName = args[0];

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    }catch{
        return message.channel.send(`Cant reload \`${commandName}\`!`).then(message.delete(), 2500)
    }

    message.channel.send(`The command ${args[0]} has been reloaded!`);

}

module.exports.config = {
    name: "reload",
    aliases: ["reload","reloads","rl"]
}