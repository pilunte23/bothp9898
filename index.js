const Discord = require('discord.js')
const Ahjce = require('./commands/ahjce')
const Arkhamdb = require('./commands/arkhamdb')
const FFGNews = require('./commands/ffgnews')
const Constants = require('./constants')
const bot = new Discord.Client()

bot.on('ready',function(){
    //bot.user.setAvatar('./avatar.png')
    //.then(() => console.log('Avatar mis en place avec succès'))
    //.catch(console.error)
    console.log('Discord Dispo')
    bot.user.setActivity('Horreur à Arkham JCE').catch(console.error)
})

bot.on('guildMemberAdd', function(member){
 member.createDM().then(function (channel){
     channel.send('Bienvenu dans le repaire de Cthulu' +member.displayName)
 }).catch(console.error)

})

bot.on('message', function (message){
   let commandUsed =  Ahjce.parse(message) || Arkhamdb.parse(message) || FFGNews.parse(message)
})


bot.login(Constants.token).catch(console.error)

