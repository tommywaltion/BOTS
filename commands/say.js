const {RichEmbed} = require('discord.js')

module.exports.run = async (bot, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            message.channel.send(`You dont have the permission to use this commands`);
            return;
          }
    let textSay = args;
    let tChannel = message.mentions.channels.first();

    message.delete();
    if(tChannel){
        announce = textSay.slice(1).join(" ");
        let announcement = new RichEmbed()
        .setTitle("ATTENTION!")
        .setAuthor(message.author.username)
        .setDescription(announce)
        
        tChannel.send(announcement)
    }else{
        announce = textSay.join(" ");
        let announcement = new RichEmbed()
        .setTitle("ATTENTION!")
        .setAuthor(message.author.username)
        .setDescription(announce)
        message.channel.send(announcement)
     }

 }
module.exports.config = {
    name: "say",
    aliases: ["say","says"]
}