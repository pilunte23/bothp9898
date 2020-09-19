module.exports = (reaction, user) => {
   /* console.log("Message Reaction Add Top");
    //let applyRole = async() => {
    //let member = reaction.message.guild.members.cache.find(member => member.id == user.id);
    //if (member.user.bot) return;
    if (user.bot) return;
    //const filter = (reaction, user) => {
    //    return ["ClassRogue", "ClassMystic", "ClassSeeker", "ClassSurvivor", "ClassGuardian"].includes(reaction.emoji.name) && user.id === message.author.id;
    //};
    reaction(reaction, user);

*/


};




/*
if (reaction.message.partial) {
    try {
        async msg => {
            let mess = await reaction.message.fetch()
            console.log(msg.id);
            if (mess.id === MessageNumber) {
                console.log("Cached - Applied");
                applyRole();
            }
        }
    } catch (err) {
        console.log(err);
    }
} else {
    console.log("Not a Partial");
    if (reaction.message.id === MessageNumber) {
        console.log("Not a Partial - applied")
        applyRole();
    }
}*/
/*
const roletTruand = message.guild.roles.fetch("443785307503067136");
const roleMystique = message.guild.roles.fetch("671419196986621983");
const roleChercheur = message.guild.roles.fetch("443451274730405889");
const roleSurvivant = message.guild.roles.fetch("513969962809819146");
const roleGardien = message.guild.roles.fetch("693864816909090838");

const msg = messageReaction.message;

const member = msg.guild.members.fetch(user.id)
    //const channel = message.guild.channels.find(c => c.name === "test-bot")

if (member.user.bot) return;

if (["ClassRogue", "ClassMystic", "ClassSeeker", "ClassSurvivor", "ClassGuardian"].includes(messageReaction.emoji.name) && message.channel.id === channel.id) {
    switch (messageReaction.emoji.name) {
        case "ClassRogue":
            member.addRole(roletTruand);
            message.channel.send(`Le rôle ${roletTruand.name} a été ajouté avec succès`).then(msg => msg.delete({ timeout: 2500 }));
            break;
        case "ClassMystic":
            member.addRole(roleMystique);
            message.channel.send(`Le rôle ${roleMystique.name} a été ajouté avec succès`).then(msg => msg.delete({ timeout: 2500 }));
            break;
        case "ClassSeeker":
            member.addRole(roleChercheur);
            message.channel.send(`Le rôle ${roleChercheur.name} a été ajouté avec succès`).then(msg => msg.delete({ timeout: 2500 }));
            break;
        case "ClassSurvivor":
            member.addRole(roleSurvivant);
            message.channel.send(`Le rôle ${roleSurvivant.name} a été ajouté avec succès`).then(msg => msg.delete({ timeout: 2500 }));
            break;
        case "ClassGuardian":
            member.addRole(roleGardien);
            message.channel.send(`Le rôle ${roleGardien.name} a été ajouté avec succès`).then(msg => msg.delete({ timeout: 2500 }));
            break;
    }

}
*/