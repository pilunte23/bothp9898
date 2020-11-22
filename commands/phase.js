exports.run = (client, message) => {
    message.channel.send(new Discord.Attachment('../image/phase.jpg'))
}

exports.help = {
    name: "phase"
};