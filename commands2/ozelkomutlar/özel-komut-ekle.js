const { Command } = require('discord.js-commando');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'özel-komut-ekle',
			aliases: ['özelkomut'],
			group: 'genel',
			memberName: 'özel-komut-ekle',
			description: 'Özel komut eklersiniz.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'komut',
					prompt: 'Komut adı ne olsun',
					type: 'string'
				},
        				{
					key: 'cevap',
					prompt: 'Cevap ne olsun',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(msg, args) {
let komut = args.komut;
    let cevap = args.cevap;
      let obj = {name: komut, desc: cevap}
   if (!db.has(`${msg.guild.id}.ozelkomut`)) {
       db.set(`${msg.guild.id}.ozelkomut`, new Array(obj))
    } else {  
        if (db.has(`${msg.guild.id}.ozelkomut`) && db.has(`${msg.guild.id}.ozelkomut`).map(k => k.name).includes(komut) === true) {
      return;
        } else {
      db.set(`${msg.guild.id}.ozelkomut`, obj)
      
    }  
    
	}
    msg.channel.send('Özel komut eklendi')
  }
};