const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");
const { Command } = require('discord.js-commando');


module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'seviye-sıfırla',
            aliases: ['seviyesıfırla'],
            group: 'seviye',
            memberName: 'seviye-sıfırla',
            description: 'Rank rengini sıfırlar.',
            example : 'seviye-sıfırla',
          			args: [
				{
					key: 'string',
					prompt: 'Hangisini sıfırlamak istersein? (resim , renk , saydamlık , rolödülleri)',
					type: 'string',
					validate: string => {
						if (string === 'resim' || string === 'renk' || string === 'saydamlık' || string === 'rolödülleri') return true;
						else return 'Lütfen `resim` `renk` `saydamlık` `rolödülleri` bunlardan birini yazın.';
					}
				}
			]
        });
      
    }

async run(msg, args) {
  
  if (args.string === "renk") {
       if(!db.has(`${msg.author.id}.renk`)) {
       const embed = new Discord.RichEmbed()
     .setDescription("Renk değiştirilmemiş neyi sıfırlayacaksın!")
    .setColor("RANDOM")
    msg.channel.send({embed})
    return
   }
    
 db.delete(`${msg.author.id}.renk`)
       const embed = new Discord.RichEmbed()
       .setDescription("Renk başarıyla sıfırlandı!")
        .setColor("RANDOM")
        msg.channel.send({embed})
  }
  if (args.string === "resim") {
   if(!db.has(`${msg.author.id}.resim`)) {
  const embed = new Discord.RichEmbed()
  .setDescription("Ayarlı bir resim yok neyi sıfırlayacaksın!")
 .setColor("RANDOM")
   msg.channel.send({embed})
 return
 }
    
  db.delete(`${msg.author.id}.resim`)
   const embed = new Discord.RichEmbed()
  .setDescription("Resim başarıyla sıfırlandı!")
  .setColor("RANDOM")
   msg.channel.send({embed})
  }

 if (args.string === "saydamlık") {
if(!db.has(`${msg.author.id}.saydam`)) {
const embed = new Discord.RichEmbed()
.setDescription("Saydamlık zaten standart halinde!")
.setColor("RANDOM")
msg.channel.send({embed})
 return
}
db.delete(`${msg.author.id}.saydam`)
const embed = new Discord.RichEmbed()
.setDescription("Saydamlık başarıyla sıfırlandı!")
.setColor("RANDOM")
msg.channel.send({embed})
return
 }
  
  if (args.string === "rolödülleri") {
          if (!db.has(`rollss_${msg.guild.id}`)) {
         const embed = new Discord.RichEmbed()
         .setDescription("Rol ödülleri sistemi sıfırlanamıyor çünkü bu sistem aktif edilmemiş!")
          .setColor("RANDOM")
         msg.channel.send({embed})
         return
                        }
 db.delete(`roll_${msg.guild.id}`)
  db.delete(`rollss_${msg.guild.id}`)
 const embed = new Discord.RichEmbed()
.setDescription("Rol ödülleri sistemi başarıyla sıfırlandı!")
.setColor("RANDOM")
msg.channel.send({embed})
return
  }
  
};
}