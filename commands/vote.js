const ms = require('ms')
const {RichEmbed} = require('discord.js')
const yes = "✅";
const no = "❎";


module.exports.run = async(bot, message, args) => {
    message.delete();
    if(!message.member.hasPermission(["ADMINISTRATOR","MANAGE_MESSAGES"])) return;
    if(args.length < 1) return message.channel.send('Please specify a time period, example: "vote 5m #<channel name here> <to vote>" to have a poll for 5 minute')

    let channelVote = message.mentions.channels.first();
    let voteMessage = "";
    let times = message.content.split(' ').slice(1);

    if(channelVote){
        messageChannels = message.content.split(" ").slice(3).join(" ");
        voteMessage = messageChannels;
    }else{  
        message.channel.send("Please specify a textchannel to start the vote! example: vote 5m #<channel name here> <to vote>")
    }

    let voteEmbed  = new RichEmbed()
        .setTitle("Votes!")
        .setThumbnail(message.author.avatarURL)
        .setDescription(voteMessage)
        .addField('Voted by:', message.author.username)
        .addField('End in:', ms(ms(times[0]), {long: true}));

    let voteSend = await channelVote.send(voteEmbed);
    await voteSend.react(yes);
    await voteSend.react(no);

    
    const Reaction = await voteSend.awaitReactions(reaction => 
        reaction.emoji.name === yes || reaction.emoji.name === no, {time: ms(times[0])}
        );

    let agree = Reaction.get("✅").count-1;
    let disagre = Reaction.get("❎").count-1;
    channelVote.send(`
Voted by ${message.author.username}
    ${voteMessage}
Vote ended! with the final result with
    ${agree} agreed 
    ${disagre} disagred
    `).then(voteSend.delete(), {time: 2500});
    
}

module.exports.config = {
    name: "votes",
    aliases: ["vote","votes","poll","polls"]
}