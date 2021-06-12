const Discord = require('discord.js');
const db = require('quick.db');
const { Command } = require('discord.js-commando');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anahtarver',
            aliases: ['anahtarverlen'],
            group: 'oyun',
            memberName: 'anahtarver',
            description: 'Sunucudaki seviye liderlik tablosunu atar.',
            example : 'anahtarver',
            throttling: {
				usages: 1,
				duration: 10
			},
          			 args: [
				{
					key: 'user',
					prompt: 'Kime anahtar vermek istersin?',
					type: 'user'
				},
          	{
					key: 'kasa',
					prompt: 'Hangi kasanın anahtarını vermek istersin?',
					type: 'string'
				},
        				{
					key: 'anahtar',
					prompt: 'Kaç tane vermek istersin?',
					type: 'string'
				}
			]
        });
    }

async run(msg, {user , anahtar , kasa}) {
  
  var user = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(user.id); 
  db.set(`anahtarlars.${user.user.id}.hangikasa`, kasa)  
  db.set(`anahtarlars.${user.user.id}.anatarsayi`, anahtar)   
  msg.channel.send(`${user.user.username} Adlı kişiye ${kasa} adlı kasanın ${anahtar} tane anahtarı verildi.`)
}

  
};
