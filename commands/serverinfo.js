const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let sEmbed = new discord.RichEmbed()
  .setColor("#1CC1FD")
  .setTitle("Server Info")
  .setThumbnail(message.guild.iconURL)
  .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
  .addField("**Guild Name**", `${message.guild.name}`, true)
  .addField("**Guild Owner**", `${message.guild.owner}`, true)
  .addField("**Member & Roles**", `${message.guild.memberCount} member, and ${message.guild.roles.size} roles`)
  .setFooter(bot.user.username, bot.user.displayAvatarURL);

  message.delete().catch(O_o=>{});
  message.channel.send({embed: sEmbed});
}

module.exports.config = {
  name: "serverinfo",
  aliases: ['si','serverinfo']
}
