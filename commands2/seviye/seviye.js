const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");
const { Command } = require('discord.js-commando');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'seviye',
            aliases: ["level", "rank", "xp", "puan"],
            group: 'seviye',
            memberName: 'seviye',
            description: 'Seviyenizi ve XP\'nizi gösterir.',
            example : 'seviye [@kullanıcı/renk/resim] [renk kodu/resim URLsi/sıfırla]',
            throttling: {
				usages: 1,
				duration: 10
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

async run(msg, {user}) {
    
  let u;
  if (user === 'member') u = msg.author;
 else u = user;

        if(u.bot === true) {
                const embed = new Discord.RichEmbed()
                        .setDescription("Botların seviyesi bulunmamaktadır!")
                        .setColor("RANDOM")
                msg.channel.send(embed)
                return
        }
  
  var g = "95"
  
  var Canvas = require('canvas')
        var canvas = Canvas.createCanvas(934, 282)
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
        if(db.has(`${u.id}.resim`)) {
                const rs = await request.get(db.fetch(`${u.id}.resim`));
                const resim = await Canvas.loadImage(rs.body);
                ctx.drawImage(resim, 0, 0, 934, 282);
    
    var g = "55"
    
        }
  
  
  
  if (db.has(`${u.id}.saydam`) === true) {
    
    if (db.fetch(`${u.id}.saydam`) === "1") {
      
      var g = "40"
      
    };
    
    if (db.fetch(`${u.id}.saydam`) === "2") {
      
      var g = "30"
      
    };
    
    if (db.fetch(`${u.id}.saydam`) === "3") {
      
      var g = "20"
      
    };
    
    if (db.fetch(`${u.id}.saydam`) === "4") {
      
      var g = "10"
      
    };
    
    if (db.fetch(`${u.id}.saydam`) === "5") {
      
      var g = "0"
      
    };
    
  };
  
  ctx.fillStyle = "rgba(0, 0, 0, 0."+g+")";
  ctx.fill()
        ctx.fillRect(15, 15 ,900, 255)  
  
  
  
        ctx.fillStyle = "rgba(0, 0, 0, 0.30)";
        ctx.fill()
        ctx.fillRect(0, 0, 934, 282)
  
        var re = db.fetch(`${u.id}.renk`) || "FF0000"
  var xp = db.fetch(`puancik_${u.id + msg.guild.id}`);
  var lvl = db.fetch(`seviye_${u.id + msg.guild.id}`);  
  var gerekenxp = db.fetch(`gerekenxp_${u.id + msg.guild.id}`);  
  
        let sira = ''
        const sorted = msg.guild.members.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`seviye_${b.user.id + msg.guild.id}`) - db.fetch(`seviye_${a.user.id + msg.guild.id}`) });
        const top10 = sorted.splice(0, msg.guild.members.size)
        const mappedID = top10.map(s => s.user.id);
        for(var i = 0; i < msg.guild.members.size; i++) {
                if(mappedID[i] === u.id) {
                        sira += `${i + 1}`
                }
        }

        var de = 2.4
        ctx.beginPath()
        ctx.fillStyle = "#999999";
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 36.15, 250 * de, 37.5);
        ctx.arc(257 + 18.5 + 250 * de, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = `#${re}`;
        ctx.arc(257 + 18.5, 147.5 + 18.5 + 35.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
        ctx.fill();
        ctx.fillRect(257 + 18.5, 147.5 + 35.25, xp * 0.1, 37.5);
        ctx.arc(257 + 18.5 + xp * 0.1, 147.5 + 18.5 + 35.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
        ctx.fill();
        ctx.fillStyle = `#${re}`;
        ctx.font = '28px Impact';
        ctx.textAlign = "right";
        ctx.fillText(`Sıralama #${sira} | Seviye ${lvl || 0}`, 875, 70);
        ctx.font = '20px Impact';
        ctx.textAlign = "right";
        ctx.fillText(`${xp || 0} / ${gerekenxp || 155} XP`, 875, 100);
        ctx.fillStyle = `#bfbfbf`;
        ctx.font = '28px Impact';
        ctx.textAlign = "left";
        ctx.fillText(`${u.tag}`, 270, 150)
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.drawImage(durumicon, 220, 115, 50, 50);
        ctx.fill()
        ctx.lineWidth = 8;
        ctx.arc(50 + 80, 80 + 70, 70, 0, 2 * Math.PI, false);
        ctx.clip();
        ctx.drawImage(avatar, 50, 70, 160, 160);
  
        msg.channel.send({files:[{attachment:canvas.toBuffer(),name:"rank.png"}]})
  
};
}