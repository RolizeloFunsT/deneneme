const { Command } = require('discord.js-commando');
const { Canvas } = require("canvas");
const { resolve, join } = require("path");
const { Attachment } = require("discord.js");
const fetch = require("node-fetch"); 
const request = require('node-superfetch');
const db = require('quick.db');

module.exports = class ProfilCard extends Command {
	constructor(client) {
		super(client, {
			name: 'profilkart',
			aliases: [],
			group: 'ekonomi',
			memberName: 'profilkart',
			description: 'Kayıt sistemi ile ilgili bilgi verir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			},
      args: [
				{
					key: 'user',
					prompt: 'Kimin seviyeyesine bakıcaksın?',
					type: 'user',
					default: 'member'
				}
			]

		});
	}

	async run(msg , {user}) {

try {
   let u;
  if (user === 'member') u = msg.author;
 else u = user;
  
   var Canvas = require('canvas')
        var canvas = Canvas.createCanvas(400, 180)
        var ctx = canvas.getContext('2d');
        const avatarURL = u.displayAvatarURL
        const durum = u.presence.status;
        const { body } = await request.get(avatarURL);
        const avatar = await Canvas.loadImage(body);
        let durumicons;
        if (u.presence.status === 'dnd') durumicons = "https://cdn.discordapp.com/emojis/596631159723524096.png"
        if (u.presence.status === 'online') durumicons = "https://cdn.discordapp.com/emojis/596631159769792522.png"
        if (u.presence.status === 'idle') durumicons = "https://cdn.discordapp.com/emojis/596631159530717195.png?v=1"
        if (u.presence.status === 'offline') durumicons = "https://cdn.discordapp.com/emojis/596631159870586890.png"
        const durumicon = await Canvas.loadImage(durumicons);
        var seviye = db.fetch(`seviye_${u.id + msg.guild.id}`)
           let bal = db.fetch(`money_${u.id}`)

    if (bal === null) bal = 0;
  ctx.fillStyle = "#7289DA";
  ctx.fillRect(84, 0, 316, 180)
  ctx.fillStyle = "#2C2F33"
  ctx.fillRect(0, 0, 84, 180)
  ctx.fillRect(169, 26, 231, 46)
  ctx.fillRect(224, 108, 176, 46)
  ctx.font = '12pt Impact';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(u.tag, 220 , 54);
  ctx.font = '12pt Impact';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Para: ${bal}`, 245 , 135);
  ctx.lineJoin = 'bevel';
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#23272A';
  ctx.strokeRect(20, 140 , 120 , 30);
  ctx.fillStyle = "#23272A"
  ctx.fillRect(20, 140, 120, 30)
  ctx.font = '12pt Impact';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Seviye: ${seviye || 0}`, 40 , 160);
  ctx.drawImage(durumicon, 180, 40, 20, 20);
  ctx.strokeStyle = '#3F51B5';
	ctx.strokeRect(585, 417 , 50 , 50);
  ctx.lineWidth = 3;
  ctx.shadowColor = '#3F51B5';
  ctx.shadowBlur = 8;
  ctx.fill()
  ctx.beginPath();
  ctx.ellipse(80, 80, 50, 50, Math.PI / 4, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(avatar, 30, 30, 100, 100);
  msg.channel.send({files:[{attachment:canvas.toBuffer(),name:"rank.png"}]})
} catch (error) {
  msg.channel.send('Bir hata oluştu hata bot yapımcısına iletildi.')
  const commands = this.client.registry.findCommands('profilkart', false, msg);
  await this.client.channels.get('662921732826595339').send(`**[Komut hata verdi]**\n**❯ Kullanıcı:** ${msg.author.tag}\n**❯ Sunucu adı:** ${msg.guild.name}\n**❯ Sunucu id:** ${msg.guild.id}\n**❯ Kullanılan komut:** ${commands[0].name}\n**❯ Hata:** ${error.message}`);
}
	}
};
