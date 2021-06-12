const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");
const { Command } = require('discord.js-commando');


module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'seviye-rol-ödülleri',
            aliases: ['seviyerolödülleri'],
            group: 'seviye',
            memberName: 'seviye-rol-ödülleri',
            description: 'Seviye rol ödülü ayarlarsınız.',
            example : 'seviye-rol-ödülleri-rol',
          			args: [
				{
					key: 'rol',
					prompt: 'Bir rol seçiniz.',
					type: 'role'
				},
        {
					key: 'seviye',
					prompt: 'Seçilen rol kaçıncı seviyede verilsin?',
					type: 'string'
				}
			]
        });
      
    }

  	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_ROLES")
	}
  
async run(msg, args) {
  
  db.set(`roll_${msg.guild.id}`, args.rol)
  db.set(`rollss_${msg.guild.id}`, args.seviye)
  
  const embed = new Discord.RichEmbed()
   .setDescription("Rol ödülleri sistemi başarıyla aktif edildi!")
  .setColor("RANDOM")
   msg.channel.send({embed})
                        return
        
  
};
}