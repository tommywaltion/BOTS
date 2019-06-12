const {RichEmbed, Attachment} = require('discord.js')
const GoogleImage = require('image-search-google')
const {saveGoogle, google_api, NSFW} = require('../config.json')
const google = new GoogleImage('011226164124919537340:fznpem1gyrk', 'AIzaSyCULHDATZT0cbeoL-zTK1mKugXLimflqTI');
const adult = new GoogleImage(NSFW, google_api);

module.exports.run = async(bot, message, args) => {
    try {
        const [result] = await google.search('John Cena');
        console.log(result)
        if (!result) return await message.channel.send(':x: No images found!');
    
        const attachment = new Attachment(result.url);
        await message.channel.send(attachment);
      } catch(err) {
        console.error(err);
      }

};

module.exports.config = {
    name: "image",
    aliases: ["image","googleimage","googleimages","images"]
}