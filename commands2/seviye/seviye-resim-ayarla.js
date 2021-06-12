const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");
const { Command } = require('discord.js-commando');


module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'seviye-resimi-ayarla',
            aliases: ['seviyeresimiayarla','seviye-resmi-ayarla','seviyeresmiayarla'],
            group: 'seviye',
            memberName: 'seviye-resimi-ayarla',
            description: 'Seviye resim ayarlar.',
            example : 'seviye-resimi-ayarla',
          args: [
				{
					key: 'resim',
					prompt: 'Bir resim urllesi girin',
					type: 'string'
				}
			]
        });
      
    }

async run(msg, args) {
                  if(!args.resim.startsWith('http')) {
                        const embed = new Discord.RichEmbed()
                                .setDescription("Resim linki http veya https ile başlamalı!")
                                .setColor("RANDOM")
                        msg.channel.send({embed})
                        return
                }
  
                db.set(`${msg.author.id}.resim`, args.resim)
                const embed = new Discord.RichEmbed()
               .setAuthor("Resim başarıyla ayarlandı!")
                .setImage(args[1])
                .setColor("RANDOM")
                msg.channel.send({embed})
                return
};
}