const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      message.channel.send(`You dont have the right permission to use this command!`);
      return;
    }

    if(!args[0]) return message.channel.send("Please specify how much message to delete!");
    message.channel.bulkDelete(args[0]).catch(err => message.channel.send(err)).then(() =>{
      message.channel.send(`Cleared ${args[0]} messages!`).then(message => message.delete(2250));
    });

}

module.exports.config = {
  name: "purge",
  aliases: ['purge','delete','clear']
}
