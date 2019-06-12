const {RichEmbed} = require('discord.js')

module.exports.run = async(bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        message.channel.send(`You dont have the permission to use this commands`);
        return;
      }
  
      let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!kUser) return message.channel.send("Cant find the spesific user!");
      let kReason = args.slice(1).join(" ");
      if(!kReason) return message.channel.send("Please put a reason!");
  
      let kickEmbed = new RichEmbed()
      .setTitle("Kick report!")
      .addField("Kicked by", `${message.author}`, true)
      .addField("Kicked", kUser, true)
      .addField("Reason", kReason)
      .addField("Time", message.createdAt)
      .setColor("#ff0000");
  
      message.delete().catch(O_o=>{});
      message.guild.member(kUser).kick(kReason);
      message.channel.send(`Kicked: ${kUser},by: ${message.author.username},reason: ${kReason}`);
      message.guild.channels.find("name", "log-channel").sendEmbed(kickEmbed);
  
      return;
}

module.exports.config = {
    name: "kick",
    aliases: ["k","kicks","kick"]
}