const discord = require("discord.js")

module.exports.run = async(bot, message, args) => {
  if(!message.member.hasPermission('MENAGE_MESSAGES')){
    message.channel.send(`You dont have the permission to use this commands`);
    return;
  }
  
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) {
        message.delete();
        return message.channel.send("Cant find the specific user!")
      }
      let bReason = args.slice(1).join(" ");
      if(!bReason) return message.channel.send("Please put a reason!");
  
      let banEmbed = new Discord.RichEmbed()
      .setTitle("Ban report!")
      .addField("Banned by", `${message.author}`, true)
      .addField("Banned", kUser, true)
      .addField("Reason", kReason)
      .addField("Time", message.createdAt)
      .setColor("#B01010");
  
      message.delete().catch(O_o=>{});
      message.guild.member(bUser).ban(bReason);
      message.channel.send(`Baneed: ${kUser}, By: ${message.author}, Reason: ${bReason}`);
      message.guild.channels.find("name", "log-channel").sendEmbed(banEmbed);
}

module.exports.config = {
    name: "ban",
    aliases: ["ban","bans","b","punish"]
}