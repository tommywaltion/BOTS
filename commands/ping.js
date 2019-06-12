const discord = require('discord.js')

module.exports.run = async(bot, message, args) => {
    message.channel.send("Pinging...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = [
            "Is this really my ping?",
            "i've pingged it just for you!",
            "oh boy, this is the ping",
            "is it good? i cant see"
        ]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response} Bot latency: \`${ping}\` API latency: \`${Math.round(bot.ping)}\` `)
    })
}

module.exports.config = {
    name: "ping",
    aliases: ["ping","pings","pingme","pongs","pong"]
}