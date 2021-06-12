const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");
const { Canvas } = require("canvas");
const request = require('node-superfetch');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'instagram',
			aliases: [],
			group: 'bilgi',
			memberName: 'instagram',
			description: 'Avatar Beşiktaş efekti verir.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'name',
					prompt: 'Kullanıcı adı girin.',
					type: 'string',
				}
			]
		});
	}


	async run(message, {name}) {
  const url = `https://instagram.com/${name}/?__a=1`;

  let res;

   res = await fetch(url).then(url => url.json());

  const account = res.graphql.user;
/*
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setTitle(account.full_name)
    .setURL(`https://instagram.com/${name}`)
    .setThumbnail(account.profile_pic_url_hd)
    .addField("Profil bilgileri", stripIndents`**- kullanıcı adı:** ${account.username}
            **- isim:** ${account.full_name}
            **- biyografi:** ${
              account.biography.length == 0 ? "none" : account.biography
            }
            **- paylaşım:** ${account.edge_owner_to_timeline_media.count}
            **- takipçi:** ${account.edge_followed_by.count}
            **- takip edilen:** ${account.edge_follow.count}
            **- gizli hesap durumu:** ${
              account.is_private ? "gizli 🔐" : "gizli değil 🔓"
            }`
    );
*/
       var Canvas = require('canvas')
        var canvas = Canvas.createCanvas(600, 500)
        var ctx = canvas.getContext('2d');
        const avatarURL = account.profile_pic_url_hd
        const { body } = await request.get(avatarURL);
        const avatar = await Canvas.loadImage(body);  
      const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 15;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 1}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
    
  ctx.fillStyle = "#7289DA";
  ctx.fillRect(84, 0, 600, 500)
  ctx.fillStyle = "#2C2F33"
  ctx.fillRect(0, 0, 84, 500)
  ctx.lineJoin = 'bevel';
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#23272A';
  ctx.strokeRect(100, 410 , 480 , 30);
  ctx.fillStyle = "#23272A"
  ctx.fillRect(100, 410, 480, 30)
  ctx.font = '12pt sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Hesap Onayı: ${account.is_verified ? "Onaylı " : "Onaylı Değil"}`, 130 , 430);
  ctx.lineJoin = 'bevel';
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#23272A';
  ctx.strokeRect(100, 370 , 480 , 30);
  ctx.fillStyle = "#23272A"
  ctx.fillRect(100, 370, 480, 30)
  ctx.font = '12pt sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Hesap Durumu: ${account.is_private ? "Gizli " : "Gizli Değil"}`, 340 , 390);
	ctx.fillText(`Paylaşım: ${account.edge_owner_to_timeline_media.count}`, 130 , 390);
  ctx.lineJoin = 'bevel';
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#23272A';
  ctx.strokeRect(100, 330 , 480 , 30);
  ctx.fillStyle = "#23272A"
  ctx.fillRect(100, 330, 480, 30)
  ctx.font = '12pt san-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Takipci: ${account.edge_followed_by.count}`, 360 , 350);
	ctx.fillText(`Takip Edilen: ${account.edge_follow.count}`, 130 , 350);
  ctx.lineJoin = 'bevel';
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#23272A';
  ctx.strokeRect(100, 250 , 480 , 30);
  ctx.fillStyle = "#23272A"
  ctx.fillRect(100, 250, 480, 30)
  ctx.font = '12pt san-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Tam isim: ${account.full_name}`, 230 , 270);
  ctx.lineJoin = 'bevel';
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#23272A';
  ctx.strokeRect(100, 290 , 480 , 30);
  ctx.fillStyle = "#23272A"
  ctx.fillRect(100, 290, 480, 30)
  ctx.font = applyText(canvas, `Biyografi: ${account.biography.length == 0 ? "none" : account.biography}`);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Biyografi: ${account.biography.length == 0 ? "none" : account.biography}`, 120, 310);
  ctx.lineJoin = 'bevel';
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#23272A';
  ctx.strokeRect(100, 210 , 480 , 30);
  ctx.fillStyle = "#23272A"
  ctx.fillRect(100, 210, 480, 30)
  ctx.font = '12pt san-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`@${account.username}`, 260 , 230);
  ctx.lineWidth = 3;
  ctx.shadowColor = '#3F51B5';
  ctx.shadowBlur = 8;
  ctx.fill()
  ctx.beginPath();
  ctx.ellipse(330, 100, 80, 80, Math.PI / 4, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(avatar, 250, 20, 160, 180);
  const attachment = new Discord.Attachment(canvas.toBuffer(), "dreambotadamdir.png");
  const embed = new Discord.RichEmbed()
  .setImage(`attachment://dreambotadamdir.png`)
  .setColor("RANDOM")
  message.channel.send({embed, files:[{attachment:canvas.toBuffer(),name:"dreambotadamdir.png"}]})
	}
};