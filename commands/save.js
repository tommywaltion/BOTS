module.exports.run = async(bot, message, args) => {
  let sender = message.author;

  async function save(){
    if(!message.member.hasPermission('MENAGE_MESSAGES')){
      message.channel.send(`You dont have the permission to use this commands`);
      return;
    }
    await message.delete();
    setTimeout(function(){
      let saveMsg = message.content.split(" ").slice(1).join(" ");
      const SaveMessage = bot.channels.find("name", "saved-message")
      if(!SaveMessage){
        return message.channel.send('Cant find text channel named \'saved-message\' to save');
      }else{
      SaveMessage.send(saveMsg);
      SaveMessage.send("From: " + sender.tag);
    }
    }, 500);

  }

  save();
}

module.exports.config = {
  name: "save",
  aliases: ['s','quotes','save']
}
