const {bot} = require("../main")


bot.on("error", async(err) =>{
  console.error(err);
})
