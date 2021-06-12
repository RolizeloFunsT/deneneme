const { Command } = require('discord.js-commando');
const Jimp = require("jimp");
const Discord = require('discord.js');
module.exports = class bjk extends Command {
	constructor(client) {
		super(client, {
			name: 'bjk',
			aliases: [],
			group: 'ayarlar',
			memberName: 'bjk',
			description: 'Avatar Beşiktaş efekti verir.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'user',
					prompt: 'Kime beşiktaş efekti vermek istersin.',
					type: 'user',
          default: 'member'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, {user}) {
        let avatarURL;
        if (user === 'member') avatarURL = msg.author.avatarURL;
        else avatarURL = user.displayAvatarURL;
		let img    = Jimp.read(avatarURL),
    bjk = Jimp.read("https://cdn.discordapp.com/attachments/496412678563037186/497368036731256842/bjk.png");
    Promise.all([img, bjk]).then(imgs => {
    let bjk = imgs[1],
        img = imgs[0];
    bjk.resize(512, 512);  
    img.resize(512, 512) 
    img.composite(bjk, 0, 0).getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (!err) 
        msg.channel.send(new Discord.Attachment(buffer));        
    });
});
	}
};