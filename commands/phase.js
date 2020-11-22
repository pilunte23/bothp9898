exports.run = (client, message) => {
    message.channel.send({
        files: ['usr/src/bot/image/phase.jpg']
    });
}

exports.help = {
    name: "phase"
};