const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const db = require('quick.db')

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'afk',
			aliases: [],
			group: 'ayarlar',
			memberName: 'afk',
			description: 'AFK Komutu.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'sebep',
					prompt: 'Afk sebebi yazmalısın.',
					type: 'string'
				}
			]
		});
	}

	async run(message , args) {
	let user = message.author
        db.set(`afk_${user.id}`, args.sebep)
        db.set(`afk_${user.id}_süre`, Date.now());
        const member = message.guild.member(user.id)
      member.setNickname('[AFK] ' + message.author.username) 
        const embed = new Discord.RichEmbed()
			.setColor("RANDOM")
			.setDescription(`<@${message.author.id}>, Adlı kullanıcı artık **${args.sebep}** sebebi ile AFK!`)
			message.channel.send(embed)
	}
};