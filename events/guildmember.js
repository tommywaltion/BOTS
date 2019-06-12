const {bot} = require('../main')
const guildConfig = require('../guildConfig.json')
const fs = require('fs')

const getDefaultChannel = (guild) => {
  if(guild.channels.has(guild.id))
    return guild.channel.get(guild.id)
  
  const generalChannel = guild.channels.find(channel => channel.name === "general");
  if(generalChannel)
    return generalChannel;
  
  return guild.channels
       .filter(c => c.type === "text" &&
    c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
      .sort((a, b) => a.position - b.position ||
        long.fromString(a.id).sub(long.fromString(b.id)).toNumber())
      .first();
  }
  
  bot.on("guildMemberAdd", member =>{

    console.log(member.user.username);

    let welcomeChannel = bot.channels.get(guildConfig[member.guild.id].welcomeChannel);
    if(!welcomeChannel || welcomeChannel == null){
      guildConfig[member.guild.id].welcomeChannel = getDefaultChannel(member.guild).id
      fs.writeFile('./guildConfig.json', JSON.stringify(guildConfig, null, 2), (err) => {
        if (err) console.log(err)
     })
    }
    
    welcomeChannel.send(`***Welcome ${member}***`)

    // const channel = getDefaultChannel(member.guild);
    // channel.send(`***Welcome ${member}***`)
  })
  
  bot.on("guildMemberRemove", member=>{

    console.log(member.user.username);

    let welcomeChannel = bot.channels.get(guildConfig[member.guild.id].welcomeChannel);
    if(!welcomeChannel || welcomeChannel == null){
      guildConfig[member.guild.id] = getDefaultChannel(member.guild).id
      fs.writeFile('./guildConfig.json', JSON.stringify(guildConfig, null, 2), (err) => {
        if (err) console.log(err)
     })
    }
    
    welcomeChannel.send(`***Goodbye ${member}***`)

    // const channel = getDefaultChannel(member.guild);
    // channel.send(`***GoodBye ${member.user.username}***`)
  })

  