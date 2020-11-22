exports.run = (client, message) => {
    message.channel.send({
        files: ['../image/timing.jpg']
    });
}

exports.help = {
    name: "timing"
};