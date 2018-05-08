const Discord = require('discord.js')

const bot = new Discord.Client()
const Ahjce = require('./commands/ahjce')
const Arkhamdb = require('./commands/arkhamdb')

bot.on('ready',function(){
    //bot.user.setAvatar('./avatar.png')
    //.then(() => console.log('Avatar mis en place avec succès'))
    //.catch(console.error)
    bot.user.setActivity('Horreur à Arkham ').catch(console.error)
})

bot.on('guildMemeberAdd', function(member){
 member.createDM().then(function (channel){
     channel.send('Bienvenu dans le repaire de Cthulu' +memeber.displayName)
 }).catch(console.error)

})

bot.on('message', function (message){
   let commandUsed =  Ahjce.parse(message) || Arkhamdb.parse(message)
})


bot.login('NDQzMzY0NjM3MTUzNjg5NjAx.DdMTFA._OKvAkoz2A8A_YTcgwIggy-2-64')

