const Discord = require('discord.js');
const db = require('quick.db');
const { Command } = require('discord.js-commando');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kasaaç',
            aliases: ['kasaaçlen'],
            group: 'oyun',
            memberName: 'kasaaç',
            description: 'Sunucudaki seviye liderlik tablosunu atar.',
            example : 'kasaaç',
            throttling: {
				usages: 1,
				duration: 10
			},
          			 args: [
        				{
					key: 'string',
					prompt: 'Hangi kasayı açmak istersin?',
					type: 'string',
          default: '',
          validate: string => {
						if (string === 'bronze' || string === 'silver' || string === 'gold' || string === 'platinium' || string === 'emerald') return true;
						else return 'Sadce bu kasalardan birini aça bilirsin. (bronze - silver - gold - platinium - emerald)';
					}
				}
			]
        });
    }

async run(message , args) {
    
       if (args.string == '') {
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} Kasaaç`, message.author.displayAvatarURL)
    .setDescription(`Bronze (Kasayı açmak için: ${message.guild.commandPrefix}kasaaç bronze)\nSliver (Kasayı açmak için: ${message.guild.commandPrefix}kasaaç silver)\nGold (Kasayı açmak için: ${message.guild.commandPrefix}kasaaç gold)\nPlatinium (Kasayı açmak için: ${message.guild.commandPrefix}kasaaç platinium)\nEmerald (Kasayı açmak için: ${message.guild.commandPrefix}kasaaç emerald)`)
    .setColor("RANDOM") 

    message.channel.send(embed)
       }
  
  if (args.string == 'bronze') {
  if (db.fetch(`anahtarlars.${message.author.id}.hangikasa`) === args.string || db.fetch(`anahtarlars.${message.author.id}.anahtarsayi`) === '1') {
 db.subtract(`anahtarlars.${message.author.id}.anatarsayi`, 1)
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} Dükkan`, message.author.displayAvatarURL)
    .setDescription('Bronze adlı kasa açıldı.')
    .setColor("RANDOM")
    message.channel.send(embed)
  }else{
    message.channel.send('Bu kasayı açmak için anahtarın yok.')
  }
}

   if (args.string == 'silver') {
  if (db.fetch(`anahtarlars.${message.author.id}.hangikasa`) === args.string || db.fetch(`anahtarlars.${message.author.id}.anahtarsayi`) === '1') {
   db.subtract(`anahtarlars.${message.author.id}.anatarsayi`, 1)
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} Dükkan`, message.author.displayAvatarURL)
    .setDescription('Silver adlı kasa açıldı.')
    .setColor("RANDOM")
    message.channel.send(embed)
  }else{
    message.channel.send('Bu kasayı açmak için anahtarın yok.')
  }
   }
  
    if (args.string == 'gold') {
  if (db.fetch(`anahtarlars.${message.author.id}.hangikasa`) === args.string || db.fetch(`anahtarlars.${message.author.id}.anahtarsayi`) === '1') {
     db.subtract(`anahtarlars.${message.author.id}.anatarsayi`, 1)
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} Dükkan`, message.author.displayAvatarURL)
    .setDescription('Gold adlı kasa açıldı.')
    .setColor("RANDOM")
    message.channel.send(embed)
  }else{
    message.channel.send('Bu kasayı açmak için anahtarın yok.')
  }
  }
  
    if (args.string == 'platinium') {
  if (db.fetch(`anahtarlars.${message.author.id}.hangikasa`) === args.string || db.fetch(`anahtarlars.${message.author.id}.anahtarsayi`) === '1'){
   db.subtract(`anahtarlars.${message.author.id}.anatarsayi`, 1)  
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} Dükkan`, message.author.displayAvatarURL)
    .setDescription('Platinium adlı kasa açıldı.')
    .setColor("RANDOM")
    message.channel.send(embed)
  }else{
    message.channel.send('Bu kasayı açmak için anahtarın yok.')
  }
    }
  
    if (args.string == 'emerald') {
  if (db.fetch(`anahtarlars.${message.author.id}.hangikasa`) === args.string || db.fetch(`anahtarlars.${message.author.id}.anahtarsayi`) === '1') {
   db.subtract(`anahtarlars.${message.author.id}.anatarsayi`, 1)
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} Dükkan`, message.author.displayAvatarURL)
    .setDescription('Emerald adlı kasa açıldı.')
    .setColor("RANDOM")
    message.channel.send(embed)
  }else{
    message.channel.send('Bu kasayı açmak için anahtarın yok.')
  }
    }
  
}
  
};
