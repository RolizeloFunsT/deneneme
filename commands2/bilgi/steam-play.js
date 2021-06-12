const { Command } = require('discord.js-commando');
const { createCanvas, loadImage, registerFont } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { shortenText } = require('../../util/Canvas');

module.exports = class ProfilCard extends Command {
	constructor(client) {
		super(client, {
			name: 'steam-play',
			aliases: [],
			group: 'bilgi',
			memberName: 'steam-play',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
      args: [
        				{
					key: 'game',
					prompt: 'Oynuyor yazısı ne olsun?',
					type: 'string'
				},
				{
					key: 'user',
					prompt: 'Kime steam cart efekti vermek istersin?',
					type: 'user',
				}
			]

		});
	}

	async run(msg, { game, user }) {
	   let u;
  if (user === 'member') u = msg.author;
 else u = user;
		try {
      const avatarURL = u.displayAvatarURL
			const base = await loadImage('https://raw.githubusercontent.com/dragonfire535/xiao/master/assets/images/steam-now-playing.png');
			const { body } = await request.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.drawImage(avatar, 26, 26, 41, 42);
			ctx.fillStyle = '#90b93c';
			ctx.font = '14px Noto';
			ctx.fillText(u.username, 80, 34);
			ctx.fillText(shortenText(ctx, game, 200), 80, 70);
			return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'steam-now-playing.png' }] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};