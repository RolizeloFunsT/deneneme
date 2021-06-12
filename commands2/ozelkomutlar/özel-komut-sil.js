const { Command } = require('discord.js-commando');
const db = require('quick.db');
const Discord = require("discord.js");

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'özel-komut-sil',
			aliases: ['özelkomutsil'],
			group: 'genel',
			memberName: 'özel-komut-sil',
			description: 'Özel komut silersiniz',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},
      	args: [
				{
					key: 'komut',
					prompt: 'Hangi komutu silmek istersin?',
					type: 'string'
				},
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(msg, args) {
  
 var komut = args.komut;
        if (db.has(`${msg.guild.id}.ozelkomut`) && db.fetch(`${msg.guild.id}.ozelkomut`).map(k => k.name === komut)) {
      if (db.fetch(`${msg.guild.id}.ozelkomut`).length === true) {
        msg.channel.send(`:white_check_mark: Başarıyla  \`${komut}\` adlı komut silindi`)
        db.delete(`${msg.guild.id}.ozelkomut`)
      } else {
          msg.channel.send(`:white_check_mark: Başarıyla  \`${komut}\` adlı komut silindi!`)
          let arr = []
      db.fetch(`${msg.guild.id}.ozelkomut`).forEach(c => {
        if (c.name !== komut) {
          arr.push(c)
      db.set(`${msg.guild.id}.ozelkomut`, arr)
        }
      })
      }
    } else {
             msg.reply(`:x: \`${komut}\` adlı özel komut zaten yok ya da silinmiş!`)
        }
	}
};