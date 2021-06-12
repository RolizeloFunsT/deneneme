const { Command } = require('discord.js-commando');
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dükkan',
			aliases: ['market'],
			group: 'ekonomi',
			memberName: 'dükkan',
			description: 'Mağzayı görüntüler.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},
                args: [
				{
					key: 'string',
					prompt: 'Hangisi satın almak istersin',
					type: 'string',
          default: '',
					validate: string => {
						if (string === 'özelrol' || string === 'kitap') return true;
						else return 'Lütfen `özelrol` , `kitap`  birini yazın.';
					}
				}
			]

		});
	}

     async run(message, args) {
       if (args.string == '') {
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} Dükkan`, message.author.displayAvatarURL)
    .setDescription(`Özel Rol: 700 D Para (Satın almak için: ${message.guild.commandPrefix}market özelrol)\nKitap: 250 D Para (Satın almak için: ${message.guild.commandPrefix}market kitap)`)
    .setColor("RANDOM") 

    message.channel.send(embed)
       }
       
           let author = db.fetch(`money_${message.author.id}`)

    if (args.string == 'özelrol') {
        if (author < 700) return message.channel.send('Özel rolü almak için yeterli paran yok.') // Yeterli parası yoksa uyarı.
        
        db.subtract(`money_${message.author.id}`, 700)
        message.channel.send(message.author.tag + ' Özel rolü 700 D paraya aldın.')
    }  
  if(args.string == 'kitap') {
       
        if (author < 250) return message.channel.send('Kitap almak için yeterli paran yok.') // Yeterli parası yoksa uyarı.

        db.subtract(`money_${message.author.id}`, 250)
        message.channel.send(message.author.tag + ' Kitabı 250 D paraya aldın.')
    }

     }
}