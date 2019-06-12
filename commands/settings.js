const {RichEmbed} = require('discord.js')
const fs = require('fs')
const guildConfig = require('../guildConfig.json')

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_GUILD')){
        return;
      }

    if(args.length > 0){
        if(args[0] === "welcomeChannel"){

            if(!args[1]) return message.channel.send(`Current welcome channel is ${bot.channels.get(guildConfig[message.guild.id].welcomeChannel)}`)
            let searchChannel = message.mentions.channels.first();
            guildConfig[message.guild.id].welcomeChannel = searchChannel.id;

            fs.writeFile('./guildConfig.json', JSON.stringify(guildConfig, null, 2), (err) => {
                if (err) console.log(err)
             })
        }else if(args[0] === "suggestChannel"){

            if(!args[1]) return message.channel.send(`Current suggest channel is ${bot.channels.get(guildConfig[message.guild.id].suggestChannel)}`)
            let searchChannel = message.mentions.channels.first();
            guildConfig[message.guild.id].suggestChannel = searchChannel.id;

            fs.writeFile('./guildConfig.json', JSON.stringify(guildConfig, null, 2), (err) => {
                if (err) console.log(err)
             })
        }else if(args[0] === "logChannel"){

            if(!args[1]) return message.channel.send(`Current log channel is ${bot.channels.get(guildConfig[message.guild.id].logChannel)}`)
            let searchChannel = message.mentions.channels.first();
            guildConfig[message.guild.id].logChannel = searchChannel.id;

            fs.writeFile('./guildConfig.json', JSON.stringify(guildConfig, null, 2), (err) => {
                if (err) console.log(err)
             })
        }

    }else{
        try {
            welcomeChannel = bot.channels.get(guildConfig[message.guild.id].welcomeChannel);
            suggestChannel = bot.channels.get(guildConfig[message.guild.id].suggestChannel);
            logChannel = bot.channels.get(guildConfig[message.guild.id].logChannel);
        } catch (error) {
            console.log(error)
            welcomeChannel = null;
            suggestChannel = null;
            logChannel = null;
            
        }
    
        let infoEmbed = new RichEmbed()
        .setTitle('SETTINGS')
        .setDescription('bot settings for your server!')
        .addBlankField(false)
        .addField('welcomeChannel', welcomeChannel, true)
        .addField('suggestChannel', suggestChannel, true)
        .addField('logChannel', logChannel, true)
        .addField(`Current prefix is ${guildConfig[message.guild.id].prefix}`, `${bot.user.username} settings on ${message.guild.name}`);
    
    
        message.channel.send(infoEmbed)
    
    }

    
}

module.exports.config = {
    name: "settings",
    aliases: ["settings","setting","info","infos"]
}