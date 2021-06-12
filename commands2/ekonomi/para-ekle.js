const { Command } = require('discord.js-commando');
const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

module.exports = class zarCommand extends Command {
    constructor(client){

        super(client, {
            name: 'para-ekle',
            aliases: ['hediye','para-ver'],
            group: 'ekonomi',
            memberName: 'para-ekle',
            description: 'Hesabınıza Para Ekler.',
          			args: [
				{
					key: 'user',
					prompt: 'Kime para vermek istersin?',
					type: 'user'
				},
          {
					key: 'miktar',
					prompt: 'Ne kadar vermek istersin?',
					type: 'string'
				}
			]

        })
    }

  	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

async run(message, args) {
  db.add(`money_${args.user.id}`, args.miktar)
  let bal = await db.fetch(`money_${args.user.id}`)
    let embed = new Discord.RichEmbed()
    .setAuthor(`Para Verme!`, message.author.displayAvatarURL)
    .addField(`Verilen Miktar`, `${args.miktar}`)
    .addField(`Bakiye:`, `${bal}`)
    .setColor("RANDOM") // random = "RANDOM"
    .setTimestamp()
    message.channel.send(embed)
}
}