const fs = require("fs")


module.exports = (bot) => {
  fs.readdir("./events/", (err, files) => {

    if(err) return console.error(err);

    let jsfile = files.filter( f => f.split(".").pop() === 'js');
    if(jsfile.length <= 0){
      console.log("[LOGS] Couldnt find events!");
    }
    console.log(`Loading in ${jsfile.length} events!`);
    jsfile.forEach((f, i) => {
      require(`./events/${f}`);
      console.log(`${i + 1}: ${f} loaded!`);
      })
  });

  fs.readdir("./commands/", (err, files) => {

    if(err) return console.log(err);

    let jsfile = files.filter( f => f.split(".").pop() === 'js');
    if(jsfile.length <= 0){
      console.log("[LOGS] Couldnt find commands!");
    }
    console.log(`Loding in ${jsfile.length} commands!`);
    jsfile.forEach((f, i) => {
      let pull = require(`./commands/${f}`);
      console.log(`${i + 1}: ${f} loaded!`);
      bot.commands.set(pull.config.name, pull);
      pull.config.aliases.forEach(alias => {
        bot.aliases.set(alias, pull.config.name);
      })
    })
  });
}
