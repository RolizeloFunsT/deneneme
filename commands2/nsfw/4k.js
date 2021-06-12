const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const superagent = require('superagent')
module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: '4k',
			aliases: [],
			group: 'ayarlar',
			memberName: '4k',
			description: 'Avatar Beşiktaş efekti verir.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg) {
     if (msg.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: '4k'})
    .end((err, response) => {
          const embed = new Discord.RichEmbed()
            .setImage(`attachment://4k.png`)
             .setColor("RANDOM")
          msg.channel.send({embed, files:[{attachment:response.body.message,name:"4k.png"}]})
    });
  } else {
    msg.channel.send("<:xx:509661885973397504> Bu komut sadece NSFW kanallarında kullanılabilir")
  }
	}
};