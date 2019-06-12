const discord = require("discord.js");
const fs = require("fs");
const guildConfig = require('../guildConfig.json')

module.exports.run = async(bot, message, args) => {
    

  let prefix = guildConfig[message.guild.id].prefix;

  if(args.length > 1 ){
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      message.channel.send(`You dont have the right permission to use this command!`);
      return;
    }
    if(args[0] === "change"){
      guildConfig[message.guild.id].prefix = args[1];
      fs.writeFile('./guildConfig.json', JSON.stringify(guildConfig, null, 2), (err) => {
     	  if (err) console.log(err)
	    })

    message.delete();

    message.channel.send(`Prefix has been change into ${args[1]}`);
    return;
    }

  }else {
    message.delete();
    message.channel.send(`The current prefix is ${prefix}, use ${prefix}prefix change to change the prefix!`);
    return
  }

}

module.exports.config = {
  name: "prefix",
  aliases: ['prefix','p']
}
