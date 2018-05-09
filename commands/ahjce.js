const Command = require('./command')

module.exports = class AHjce extends Command {

    static match (message) {
        return message.content.startsWith('!ha')
    }

    static action (message){
        let args = message.content.split(' ')
        args.shift()      
        if (!isNaN(args[0])){ 
            if (checkurl('http://www.ahjce.fr/IMAGES/CARTES/AH-'+args[0]+'.jpg')){
                message.reply('http://www.ahjce.fr/IMAGES/CARTES/AH-'+args[0]+'.jpg')
            }              
        }   
        else
        {               
            if (checkurl('http://www.ahjce.fr/carte_liste.php?rech=' +args.join('%20'))){
                message.reply('http://www.ahjce.fr/carte_liste.php?rech=' +args.join('%20'))
            }
        }               
    }


     checkUrl(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = processRequest;

        function processRequest(e){
            if (xhr.readyState == 4){           
                if (xhr.status == 200) {
                    return true
                }else
                {
                    console.log(xhr.status)
                    return false
                }
            }
        }
        return false
    }
}


