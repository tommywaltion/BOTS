const config = require('../config.json')
const fs = require("fs")
const {bot} = require('../main')
const ytdl = require('ytdl-core')
const queue = new Map();
const {Util,RichEmbed} = require('discord.js')
const YT = require('simple-youtube-api')
const guildConfig = require('../guildConfig.json')



bot.on("message", async message =>{

  if(message.author.bot) return;
  if(message.author.id === bot.user.id) return;

  let msg = message.content.toLowerCase();
  let prefix = guildConfig[message.guild.id].prefix;

  if(!prefix) {
    guildConfig[message.guild.id].prefix = config.prefix
  }

  let cmd = msg.slice(prefix.length).split(" ");
  let args = message.content.split(" ").slice(1);
  console.log(args);

  if(msg.startsWith(`help`)){
    return message.channel.send(`"${prefix}prefix" to see your prefix! and yes this bot doesnt have help menu.`)
    
  }

  if(!message.content.startsWith(prefix)) return;
  
  let commandfile = bot.commands.get(cmd[0].toLowerCase()) || bot.commands.get(bot.aliases.get(cmd[0]));
  if(commandfile) commandfile.run(bot, message, args);

  //music section
  const serverQueue = queue.get(message.guild.id);
  const youtube = new YT(process.env.API_KEY)

  if(msg.startsWith(`${prefix}play`)){  
    const urls = message.content.split(" ").slice(1).join(" ");
    const searchString = message.content.split(" ").slice(1).join(" ");

    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send("Please connect to a voice channel!");
    const permission = voiceChannel.permissionsFor(message.guild.me);
    if(!permission.has('CONNECT')) return message.channel.send("I cant connect to a voice channel!");
    if(!permission.has('SPEAK')) return message.channel.send("I cant speak in this voice channel!");

    if(urls.match(/^https?:\/\/(www.youtube.com|youtube.com)\/list(.*)$/)){
      const playlist = await youtube.getPlaylist(urls);
      const videos = await playlist.getVideos();
      message.channel.send(`Playlist: ${playlist.title} Has been added to the queue!`);
      for(const video of Object.values(videos)){
        const video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message, voiceChannel, true);
      }
    }else{
      try{
        var video = await youtube.getVideo(urls)
      }catch(error){
        try{
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          let listEmbed = new RichEmbed()
            .addField("Search result list:", videos.map(video2 => `${++index}. ${video2.title}`).join('\n'))
            .addField(`Please choose between `, '1-10');
          message.channel.send(listEmbed);
          try{
            var respond = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2 < 11, {
              maxMatches: 1,
              time: 10000,
              errors: ['time']
            })
          }catch(err){
            console.error(err);
            message.channel.send('Nothing was entered, it must be a number!');
          }
          const videoindex = parseInt(respond.first().content);
          var video = await youtube.getVideoByID(videos[videoindex - 1].id);
        }catch(err){
          console.log(err)
          return message.channel.send('I cant find the song you looking for!');
        }
      }
      return handleVideo(video, message, voiceChannel);
    }

  }else if(msg.startsWith(`${prefix}skip`)){
    if(!serverQueue) return message.channel.send("Theres nothing i can skip!");
    serverQueue.connection.dispatcher.end('Skip command has been used');
    return undefined;
  }else if(msg.startsWith(`${prefix}stop`)){
    if (!message.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return message.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
    return undefined;
  }else if(msg.startsWith(`${prefix}np`)){
    if(!serverQueue) return message.channel.send("Theres nothing playing!");
    return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
  }else if(msg.startsWith(`${prefix}volume`)){
    if(!serverQueue) return message.channel.send("Theres no song to set volume to!")
    if(!args[0]) return message.channel.send(`The current volume is ${serverQueue.volume}`);
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send(`Volume has been changed to ${args[0]}`);
  }else if(msg.startsWith(`${prefix}q`)){
    if(!serverQueue) return message.channel.send("Theres no song in the queue!");
    return message.channel.send(`
    Queued song
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

Now playing: ${serverQueue.songs[0].title}
    `)
  }

})


function play(guild, song){
  const serverQueue = queue.get(guild.id);
  if(!song){
      queue.delete(guild.id);
      serverQueue.voiceChannel.leave();
      return;
  }
  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
      .on('end', reason => {
          if(reason === 'Stream is not generating quickly enough.') console.log('song ended....')
          else console.log(reason);
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
      })
      .on('error', error => console.error(error))
  dispatcher.setVolumeLogarithmic(5 /5 );

  serverQueue.textChannel.send(`Now playing: ${song.title}`);

}

async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
    const song = {
      id: video.id,
      title: Util.escapeMarkdown(video.title),
      url: `https://www.youtube.com/watch?v=${video.id}`
  }

  if(!serverQueue){
      const queueConstruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try{
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(message.guild, queueConstruct.songs[0]);
      }catch(error){
          queue.delete(message.guild.id);
          console.log("Theres an error!\n" + error);
          return message.channel.send("I got an error!\n" + error);
      }

    } else{
      serverQueue.songs.push(song);
      if(playlist) return undefined;
      else return message.channel.send(`${song.title} has been added to the queue!`)
    }

    return undefined;
}
