const { Command } = require('discord.js-commando');
const { createCanvas, loadImage, registerFont } = require('canvas');
const request = require('node-superfetch');
const path = require('path');

module.exports = class ProfilCard extends Command {
	constructor(client) {
		super(client, {
			name: 'steam-card',
			aliases: [],
			group: 'bilgi',
			memberName: 'steam-card',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
      args: [
				{
					key: 'user',
					prompt: 'Kime steam cart efekti vermek istersin?',
					type: 'user',
				}
			]

		});
	}

	async run(msg, { user }) {
	   let u;
  if (user === 'member') u = msg.author;
 else u = user;
		try {
			const base = await loadImage('https://raw.githubusercontent.com/dragonfire535/xiao/master/assets/images/steam-card.png');
      const avatarURL = u.displayAvatarURL
			const { body } = await request.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = '#feb2c1';
			ctx.fillRect(0, 0, base.width, base.height);
			ctx.drawImage(avatar, 12, 19, 205, 205);
			ctx.drawImage(base, 0, 0);
			ctx.font = '14px Noto';
			ctx.fillStyle = 'black';
			ctx.fillText(u.username, 16, 25);
			ctx.fillStyle = 'white';
			ctx.fillText(u.username, 15, 24);
			return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'steam-card.png' }] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};