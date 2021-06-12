const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = class zarCommand extends Command {
    constructor(client){

        super(client, {
            name: 'para-sil',
            aliases: [],
            group: 'ekonomi',
            memberName: 'para-sil',
            description: 'İstediğiniz Kişinin Parasını Siler.',
                    			args: [
				{
					key: 'user',
					prompt: 'Kimeden para silmek istersin?',
					type: 'user'
				},
          {
					key: 'miktar',
					prompt: 'Ne kadar silmek istersin?',
					type: 'string'
				}
			]

        })
    }

  	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}
  
async run(message, args) {

    db.subtract(`money_${args.user.id}`, args.miktar) // subtract it now
    let bal = await db.fetch(`money_${args.user.id}`)

    let embed = new Discord.RichEmbed()
    .setAuthor(`Para Silme!`, message.author.displayAvatarURL)
    .addField(`Silinen Miktar`, `${args.miktar}`)
    .addField(`Kalan Bakiye:`, `${bal}`)
    .setColor("RED") // random = "RANDOM"
    .setTimestamp()
    // you can change it to args[1] if you want to, but then it's not gonna work like I want it to.

    message.channel.send(embed)





}
}