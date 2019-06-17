const {RichEmbed, Attachment} = require('discord.js')
const GoogleImage = require('image-search-google')
const {saveGoogle, google_api, NSFW} = require('../config.json')
const google = new GoogleImage(saveGoogle, process.env.API_KEY) //process.env.API_KEY);
const adult = new GoogleImage(NSFW, process.env.API_KEY) //process.env.API_KEY);

module.exports.run = async(bot, message, args) => {
    try {

      google.search("John Cena", {page: 1}).then(result => {
        if(!result) return console.log('FAILED');
        console.log(result)

        const attachment = new Attachment(result.url);
        message.channel.send(attachment);
        
      })

      //   const [result] = await google.search('John Cena');
      //   console.log(result)
      //   if (!result) return await message.channel.send(':x: No images found!');
    
      //   const attachment = new Attachment(result.url);
      //   await message.channel.send(attachment);
    } catch(err) {
     console.error(err);
    }

};

module.exports.config = {
    name: "image",
    aliases: ["image","googleimage","googleimages","images"]
}