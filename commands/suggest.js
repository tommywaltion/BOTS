const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {


      let suggestion = args[0];
      let reason = message.content.slice(prefix.length).split(" ").slice(2).join(" ");

      if(args[0] === "mods"){


        let suggestEmbed = new discord.RichEmbed()
        .setTitle("Suggestion")
        .addField("Suggestion about", suggestion,)
        .addField("Suggested by", `${message.author} with ID: ${message.author.id}`, true)
        .addField("Created time", message.createdAt, true)
        .addField("The suggestion", reason)
        .setColor("#040BC1");

        message.delete().catch(O_o=>{});
        let suggestChannel = message.guild.channels.find("name", "suggest-channel");
        if(!suggestChannel) return message.channel.send("Cant find 'mods-suggestion' to save the suggestion");
        suggestChannel.sendEmbed(suggestEmbed);

      }else{

      let suggestEmbed = new discord.RichEmbed()
      .setTitle("Suggestion")
      .addField("Suggestion about", suggestion,)
      .addField("Suggested by", `${message.author} with ID: ${message.author.id}`, true)
      .addField("Created time", message.createdAt, true)
      .addField("The suggestion", reason)
      .setColor("#06ff61");

      message.delete().catch(O_o=>{});
      const suggestChannel = message.guild.channels.find("name", "suggest-channel");
      if(!suggestChannel) return message.channel.send("Cant find 'suggest-channel' to save the suggestion");
      suggestChannel.sendEmbed(suggestEmbed);
    }

      return;
}

module.exports.config = {
  name: "suggest",
  aliases: ['suggest','suggestion']
}
