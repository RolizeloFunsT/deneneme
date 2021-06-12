const Discord = require('discord.js');
const db = require('quick.db');
const { Command } = require('discord.js-commando');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anahtarlarım',
            aliases: ['anahtarlarımlen'],
            group: 'oyun',
            memberName: 'anahtarlarım',
            description: 'Sunucudaki seviye liderlik tablosunu atar.',
            example : 'anahtarlarım',
            throttling: {
				usages: 1,
				duration: 10
			},
        });
    }

async run(message) {
if (db.fetch(`anahtarlars.${message.author.id}.hangikasa`) || db.fetch(`anahtarlars.${message.author.id}.anahtarsayi`)) {
 let kasa = db.fetch(`anahtarlars.${message.author.id}.hangikasa`)  
 let anahtarın =  db.fetch(`anahtarlars.${message.author.id}.anatarsayi`)   
     let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} Anahtarların`, message.author.displayAvatarURL)
    .addField('Kasa', kasa)
    .addField('Anahtarın', anahtarın)
    .setColor("RANDOM")
    message.channel.send(embed)
}else{
  message.channel.send('Anahtarın yok.')
}
}

  
};
