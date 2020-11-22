exports.run = (client, message) => {
    message.channel.send({
        files: ['../../../image/phase.jpg']
    });
}

exports.help = {
    name: "phase"
};