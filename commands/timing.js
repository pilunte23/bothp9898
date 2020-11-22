exports.run = (client, message) => {
    message.channel.send(new Discord.Attachment('../image/timing.jpg'))
}

exports.help = {
    name: "timing"
};