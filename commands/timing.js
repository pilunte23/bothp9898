exports.run = (client, message) => {
    message.channel.send({
        files: ['usr/src/bot/image/timing.jpg']
    });
}

exports.help = {
    name: "timing"
};