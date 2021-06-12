const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");
const { Command } = require('discord.js-commando');


module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'seviye-saydamlık-ayarla',
            aliases: ['seviyesaydamlıkayarla','seviyesaydamlık'],
            group: 'seviye',
            memberName: 'seviye-saydamlık-ayarla',
            description: 'Seviye resim ayarlar.',
            example : 'seviye-saydamlık-ayarla',
          args: [
				{
					key: 'saydamlık',
					prompt: 'Ayarlamak istediğiniz saydamlık derecesini girin. (Lütfen 1-5 kadar bir sayı girin)',
					type: 'string',
				}
			]
        });
      
    }

async run(msg, args) {
      if (args.saydamlık > 5 || args.saydamlık < 1) {
        const embed = new Discord.RichEmbed()
                                .setDescription("Saydamlık derecesi için `5`ten fazla bir seçenek yok! \n**Dereceler:** `1`, `2`, `3`, `4`, `5`")
                                .setColor("RANDOM")
                        msg.channel.send({embed})
                        return
    };
  
      db.set(`${msg.author.id}.saydam`, args.saydamlık)
      const embed = new Discord.RichEmbed()
      .setDescription("Siyah katmanın saydamlığı başarıyla değiştirildi!")
      .setColor("RANDOM")
      msg.channel.send({embed})
      return
};
}