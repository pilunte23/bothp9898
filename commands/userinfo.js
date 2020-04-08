const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {
    let embed = new MessageEmbed()
        .setAuthor(message.author.username)
        .setDescription("Vos informations d'utilisateur")
        .setColor("#9B59B6")
        .addField("Nom complet", message.author.username + '#' + message.author.discriminator)
        .addField("Id", message.author.id)
        .addField("Crée le", message.author.createdAt)

    message.channel.send(embed)

}

exports.help = {
    name: "userinfo"
};