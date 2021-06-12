const { Command } = require('discord.js-commando');
const db = require('quick.db');
const Discord = require("discord.js");
module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'özel-komut-liste',
			aliases: ['özelkomutliste'],
			group: 'genel',
			memberName: 'özel-komut-liste',
			description: 'Sunucudaki özel komut listesini atar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(msg, args) {

if(db.has(`${msg.guild.id}.ozelkomut`)) {
  db.fetch(`${msg.guild.id}.ozelkomut`).length
   var name =   db.fetch(`${msg.guild.id}.ozelkomut`).map(c => c.name)
   var desc = db.fetch(`${msg.guild.id}.ozelkomut`).map(c=> c.desc)
const embed = new Discord.RichEmbed()
.addField("Komut", name ,true)
.addField("Açıklama", desc, true)
msg.channel.send(embed)
} else {
msg.channel.send("❌ Bu sunucuda özel komut bulunmuyor.")
}
	}
};