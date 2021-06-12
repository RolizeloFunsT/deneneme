const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const Discord = require('discord.js');
const giveaways = require("discord-giveaways");
const path = require('path');
const sqlite = require('sqlite');
const conf = require('./ayarlar.json');
const moment = require('moment');
const ms = require("ms");
const parse = require("parse-ms")
const fs = require("fs");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = require('quick.db')
const Jimp = require('jimp');
require("moment-duration-format")
const dateFormat = require("dateformat")
const { Canvas ,createCanvas, loadImage } = require('canvas');
const process = require('process');
require('events').EventEmitter.defaultMaxListeners = 20;

const client = new CommandoClient({
    commandPrefix: conf.prefix,
    unknownCommandResponse: false,
    owner: conf.owner,
    disableEveryone: false
});

client.ayar = db;
client.registry
    .registerDefaultTypes()
    .registerGroups([
  ['ayarlar' , 'Bot ayarları'],
  ['seviye' , 'Seviye Komutları'],
  ['nsfw', 'NSFW Komutları'],
  ['bilgi' , 'Bilgi Komutları'],
  ['ekonomi' , 'Ekonomi Komutları'],
  ['oyun' , 'Oyun Komutları'],
  ['genel', 'Genel Komutlar']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

	sqlite.open("./database.sqlite3").then((db) => {
		client.setProvider(new SQLiteProvider(db));
	});


client.on('ready', () => {   
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`);
  // client.channels.get('544445296709599242').send(`<:dreambotonline:596631159769792522> [Bağlanıldı] - <@525405664814825473>\nBot Discord'a bağlandı ve hazır. Sunucularda çevrimiçi duruma geçti.`)
  client.user.setActivity(`Dream41'in Test Botu`, {type: "STREAMING" , url: 'https://www.twitch.tv/dream1841'})
})

/* client.on('reconnecting', () => {    
   var guildhook = new Discord.WebhookClient('608273333150154793', 'pc610iZ0DnKv-jRaJSC6CaUK-hwOrWhxNXAYfIKehM8wjYICyLaEMKsSpSH6vJPLXwxX')
  guildhook.send(`<:dreambotidle:596631159530717195> [Bağlantı Kesildi] - <@525405664814825473> \nBot Şuanda Discord'a yeniden bağlanmaya çalışıyor. Bağlandığında bilgi verilecektir.`);
}) */


/* 
client.on("commandError", function (command, error) { 
  console.error(`Error ${error.toString()} in command ${command.name}`) 
})
*/

client.on('commandError', function (cmd, error, msg) {
        
        
   console.log(`⚠ **[Komut Hata Verdi]** - <@482855531220959242>\n**❯ Kullanıcı:** ${msg.author.tag}\n**❯ Kullanıcı ID:** ${msg.author.id}\n**❯ Sunucu Adı:** ${msg.guild.name}\n**❯ Sunucu ID:** ${msg.guild.id}\n**❯ Kullanılan Komut:** ${cmd.groupID}:${cmd.memberName}\n**❯ Hata:** ${error.toString()}`)
        
          })


  client.on("error", (e) => console.error(e))    


/*
process.on('unhandledRejection', (reason, promise) => {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Bot Hatası')
  .setDescription(`${client.user.username} Discord botu hataya uğradı!`)
  .addField('Hata Kısaltması:', '```' + reason + '```')
  .addField('Hata:', '```' + `{ ${reason.stack}\n${reason.name}\nmessage: ${reason.message}\npath: ${reason.path}\ncode: ${reason.code}\nmethod: ${reason.method} }` + '```')
  .setTimestamp();
  client.channels.get('544445296709599242').send(embed);
})
*/

    .on('guildMemberAdd', async member => {
  	var kanal = member.guild.channels.get(member.guild.settings.get('ozeltagKanal'));
  if (!kanal) return;
  var tag = member.guild.settings.get('tag');
        member.setNickname(tag + ` ${member.user.username}`)
        kanal.send(member.user.username + ' Adlı kişi katıldı adına ' + tag  + ' tagı eklendi.')
    })

.on('guildMemberAdd',async member => {
  const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 7}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
  let user = client.users.get(member.id);
		const veri = client.provider.get(member.guild.id, "güvenlikkanalK", []);
		if (veri ==! true) return;
		if (veri === true) {
		const kanalveri = client.provider.get(member.guild.id, "güvenlikkanal", []);
    const resimveri = client.provider.get(member.guild.id, "güvenlikresim", []);
    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(750,300);
    const ctx = canvas.getContext('2d');
      if(member.user.bot) {return;}
   if (!member.bot){
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
    var kontrol;
    if (kurulus > 30) kontrol = 'Güvenli'
    if (kurulus < 30) kontrol = 'Şüpheli'
    const background = await Canvas.loadImage(resimveri || 'https://media.discordapp.net/attachments/663220987948564531/663221025252573184/bunesimdiyy.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.shadowBlur = 10;
    ctx.font = applyText(canvas, `${user.tag}`);
	  ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
	  ctx.font = applyText(canvas, `${user.tag}`);
	  ctx.fillStyle = '#ffffff';
	  ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
    ctx.font = '30pt Impact';
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.shadowBlur = 10;
    ctx.fillText(kontrol, 250 , 140);
    ctx.font = '30pt Impact';
	  ctx.fillStyle = '#ffffff';
	  ctx.fillText(kontrol, 250 , 140);
    ctx.strokeStyle = '#3F51B5';
    ctx.lineWidth = 8;
    ctx.shadowColor = '#3F51B5';
    ctx.shadowBlur = 8;
    ctx.fill()
    ctx.beginPath();
    ctx.ellipse(130, 160, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(avatar, 30, 60, 220, 220);
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'DreamBot-Güvenlik.png');
   member.guild.channels.get(kanalveri).send(attachment)
   }
    }
})

.on("guildMemberAdd", async member => {
    const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 7}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
		const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
		if (veri ==! true) return;
		if (veri === true) {
			const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
			let username = member.user.tag;
			if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
			if (member.guild.channels.get(kanalveri).type === "text") {
			  const request = require('node-superfetch');
        const userimg = member.user.displayAvatarURL
        const sunucuicon = await loadImage(member.guild.iconURL || 'https://cdn.discordapp.com/attachments/415626207607128076/526891779992322078/sunucuicon.png')
        const { body } = await request.get(userimg);
        const avatar = await loadImage(body);
        var canvas = createCanvas(710, 474)
        var ctx = canvas.getContext('2d');
        const bg = await loadImage('https://media.discordapp.net/attachments/606801627126562816/606802097673076747/yabunesimdi.png');
        ctx.drawImage(bg , 0, 0 , 710, 474);
        ctx.strokeStyle = '#3F51B5';
	      ctx.strokeRect(0, 0 , 710 , 474);
        ctx.fillStyle = "#263238"
        ctx.font = '40px Impact';
        ctx.font = applyText(canvas, `${username}`);
	      ctx.fillText(`${username}`, 200, 375 , 300);
        ctx.fillStyle = "#fff"
        ctx.font = '40px Impact';
        ctx.font = applyText(canvas, `${username}`);
	      ctx.fillText(`${username}`, 200, 370 , 300);
        ctx.strokeStyle = '#3F51B5';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#3F51B5';
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.arc(585, 417, 40, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.save();
        ctx.clip();
        ctx.drawImage(sunucuicon , 535, 370 , 100, 100);
        ctx.restore();
        ctx.lineWidth = 8;
        ctx.shadowColor = '#3F51B5';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(330, 220, 100, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.save();
        ctx.clip();
        ctx.drawImage(avatar, 220, 120, 220, 220);
        member.guild.channels.get(kanalveri).send({files:[{attachment:canvas.toBuffer(),name:"DreamBot-Hosgeldin.png"}]})
      }
		}
	})

.on("guildMemberRemove", async member => {
      const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 7}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
		const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
		if (veri ==! true) return;
		if (veri === true) {
			const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
			let username = member.user.tag;
			if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
			if (member.guild.channels.get(kanalveri).type === "text") {
			  const request = require('node-superfetch');
        const userimg = member.user.displayAvatarURL
        const sunucuicon = await loadImage(member.guild.iconURL || 'https://cdn.discordapp.com/attachments/415626207607128076/526891779992322078/sunucuicon.png')
        const { body } = await request.get(userimg);
        const avatar = await loadImage(body);
        var canvas = createCanvas(710, 474)
        var ctx = canvas.getContext('2d');
        const bg = await loadImage('https://media.discordapp.net/attachments/606801627126562816/606802079515803700/ciktibusimdi.png');
        ctx.drawImage(bg , 0, 0 , 710, 474);
        ctx.strokeStyle = '#3F51B5';
	      ctx.strokeRect(0, 0 , 710 , 474);
        ctx.fillStyle = "#263238"
        ctx.font = '40px Impact';
        ctx.font = applyText(canvas, `${username}`);
	      ctx.fillText(`${username}`, 200, 375 , 300);
        ctx.fillStyle = "#fff"
        ctx.font = '40px Impact';
        ctx.font = applyText(canvas, `${username}`);
	      ctx.fillText(`${username}`, 200, 370 , 300);
        ctx.strokeStyle = '#3F51B5';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#3F51B5';
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.arc(585, 417, 40, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.save();
        ctx.clip();
        ctx.drawImage(sunucuicon , 535, 370 , 100, 100);
        ctx.restore();
        ctx.lineWidth = 8;
        ctx.shadowColor = '#3F51B5';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(330, 220, 100, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.save();
        ctx.clip();
        ctx.drawImage(avatar, 220, 120, 220, 220);
        member.guild.channels.get(kanalveri).send({files:[{attachment:canvas.toBuffer(),name:"DreamBot-Gorusuruz.png"}]})
      }
		}
	})

 
/* .on('guildMemberAdd' ,member => {
const veri = client.provider.get(member.guild.id, 'sunucuPanel', []);
if (veri ==! true) return;
if (veri === true) {
const toplamkullanıcı = client.provider.get(member.guild.id, 'toplamKullanici', []);
const toplamkişi = client.provider.get(member.guild.id, 'toplamKişi', []);
const toplambot = client.provider.get(member.guild.id, 'toplamBot', []);
const banlı = client.provider.get(member.guild.id, 'toplamBanli', []);
member.guild.channels.get(toplamkullanıcı).setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get(toplamkişi).setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get(toplambot).setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get(banlı).setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
};
})

.on('guildMemberRemove' ,member => {
const veri = client.provider.get(member.guild.id, 'sunucuPanel', []);
if (veri ==! true) return;
if (veri === true) {
const toplamkullanıcı = client.provider.get(member.guild.id, 'toplamKullanici', []);
const toplamkişi = client.provider.get(member.guild.id, 'toplamKişi', []);
const toplambot = client.provider.get(member.guild.id, 'toplamBot', []);
const banlı = client.provider.get(member.guild.id, 'toplamBanli', []);
member.guild.channels.get(toplamkullanıcı).setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get(toplamkişi).setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get(toplambot).setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get(banlı).setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
}
})

.on('guildBanAdd', async (guild, member) => {
const veri = client.provider.get(member.guild.id, 'sunucuPanel', []);
if (veri ==! true) return;
if (veri === true) {
const toplamkullanıcı = client.provider.get(member.guild.id, 'toplamKullanici', []);
const toplamkişi = client.provider.get(member.guild.id, 'toplamKişi', []);
const toplambot = client.provider.get(member.guild.id, 'toplamBot', []);
const banlı = client.provider.get(member.guild.id, 'toplamBanli', []);
member.guild.channels.get(toplamkullanıcı).setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get(toplamkişi).setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get(toplambot).setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get(banlı).setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))
}
})
	
.on('guildBanRemove', async (guild, member) => {
const veri = client.provider.get(member.guild.id, 'sunucuPanel', []);
if (veri ==! true) return;
if (veri === true) {
const toplamkullanıcı = client.provider.get(member.guild.id, 'toplamKullanici', []);
const toplamkişi = client.provider.get(member.guild.id, 'toplamKişi', []);
const toplambot = client.provider.get(member.guild.id, 'toplamBot', []);
const banlı = client.provider.get(member.guild.id, 'toplamBanli', []);
member.guild.channels.get(toplamkullanıcı).setName(`Toplam Kullanıcı Sayısı: ${member.guild.memberCount}`);
member.guild.channels.get(toplamkişi).setName(`Toplam Kişi Sayısı: ${member.guild.members.filter(m => !m.user.bot).size}`);
member.guild.channels.get(toplambot).setName(`Toplam Bot Sayısı: ${member.guild.members.filter(m => m.user.bot).size}`);
member.guild.fetchBans().then(bans => member.guild.channels.get(banlı).setName(`Toplam Banlı Kişi Sayısı: ${bans.size}`))	
}
})
*/
.on('guildMemberAdd', async member => {
    const kanal = member.guild.channels.get(member.guild.settings.get('kayitKanal'));
    if (!kanal) return;
		const kayitrol = client.provider.get(member.guild.id, 'kayitRolK', []);
		if (kayitrol ==! true) return;
		if (kayitrol === true) {
      const kayitemoji = client.provider.get(member.guild.id, 'kayitEmojiK', []);
    if (kayitemoji ==! true) return;
		if (kayitemoji === true) {
      const kayitmesaj = client.provider.get(member.guild.id, 'kayitMesajK', []);
      if (kayitmesaj ==! true) return;
		if (kayitmesaj === true) {
			const kayitrolveri = client.provider.get(member.guild.id, 'kayitRol', []);
      const kayitemojiveri = client.provider.get(member.guild.id, 'kayitEmoji', []);
      const kayitmesajveri = client.provider.get(member.guild.id, 'kayitMesaj', []);
	 const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username , member.user.displayAvatarURL)
  .setDescription(kayitmesajveri.replace('{sunucu}', `${member.guild.name}`).replace('{kullanıcı}', `${member.user.username}`))
  .setThumbnail(member.guild.iconURL)
  .setFooter(`${client.user.username} Kayıt sistemi` , client.user.avatarURL)
  kanal.send(embed).then(msg => {
    
 msg.react(kayitemojiveri).then( r  =>{
      
    const backwardsFilter = (reaction , user) => reaction.emoji.id === kayitemojiveri && user.id === member.id;
      
    const backwards = msg.createReactionCollector(backwardsFilter);
      
      backwards.on('collect', r => {
      if (!msg.channel.permissionsFor(client.user).has("MANAGE_ROLES")) {
      msg.delete()
      const kayitroladi = member.guild.roles.get(client.provider.get(member.guild.id, 'kayitRol')).name
      kanal.send(`<@${member.guild.owner.id}> \`${member.user.tag}\` Adlı kişiye \`${kayitroladi}\` adlı rolü veremedim çünkü **Rolleri yönet** yetkim bulunmuyor.`)
    }else{   
			if (member.guild.roles.get(kayitrolveri) === undefined || member.guild.roles.get(kayitrolveri) === null) return;
			  member.addRole(kayitrolveri);  
        msg.delete()
    }
     })
    })
  }) 

		}
    }
    }
	})
	
		.on('guildMemberAdd', async member => {
		const veri = client.provider.get(member.guild.id, 'girisRolK', []);
		if (veri ==! true) return;
		if (veri === true) {
			const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
			if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
    member.addRole(girisrolveri);
		}
	})



.on('guildMemberAdd', member => {
  var kanal = member.guild.channels.get(member.guild.settings.get('sayaçkanal'));
  if (!kanal) return;
  var sayaç = member.guild.settings.get('sayac');
  if (!sayaç) return;

if (member.guild.members.size > sayaç) return kanal.send(`Sunucudaki kişi sayısı zaten belirlenen hedefe ulaşmış! Sayaçı değiştiriniz!`)
 kanal.send(`:inbox_tray: **${member.user.username}** Sunucuya Katıldı! \`${sayaç}\` kullanıcı olmaya \`${sayaç - member.guild.members.size}\` kullanıcı kaldı!`)
  if (member.guild.members.siz === sayaç) return kanal.send(`Sunucunuz Belirlenen Hedefe Ulaştı Sayaç Özelliği Otomatikmen devredışı bırakılıyor!`)
})

	.on('messageUpdate', async (oldMsg, newMsg) => {
		if (!oldMsg.guild) return;
		if (oldMsg.author.bot) return;
		const enabled = client.provider.get(oldMsg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMsg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMsg.guild.channels.get(logCh) === undefined || oldMsg.guild.channels.get(logCh) === null) return;
		if (oldMsg.guild.channels.get(logCh).type === "text") {
			const embed = new Discord.RichEmbed()
			.setColor(3066993)
			.setAuthor(`${oldMsg.author.username}  ${oldMsg.channel.name} Kanalına gönderdiği mesajını düzenledi.` , oldMsg.author.avatarURL)
			.addField('Eski Mesaj' , '```' +  oldMsg.content + '```')
            .addField('Yeni Mesaj' , '```' + newMsg.content  + '```')
			.setFooter(`ID: ${oldMsg.id}`);
			oldMsg.guild.channels.get(logCh).send({embed});
		};
	})


.on('message', async msg => { 
            if (!msg.guild) return;
        const veri = client.provider.get(msg.guild.id, 'saas', []);
        if (veri ==! true) return;
        if (veri === true) {
            const swearWords = ["sa" , "sea" , "selam", "selamün aleyküm" , "selamun aleyküm" , "selamın aleyküm","SA","Sa"];
            if (swearWords.some(word => msg.content === (word))) {
				msg.react("498054746779942923").then(() => msg.react("498054757836128268"))
                try {
                        return msg.channel.sendMessage(`Aleyküm selam hoş geldin <@!${msg.author.id}>.`);
                } catch(err) {
                    console.log(err);
                }
            }
        }
})

.on("message", message => {
            if (!message.guild) return;
        const veri = client.provider.get(message.guild.id, 'selfbotkoruma', []);
        if (veri ==! true) return;
        if (veri === true) {
  if (message.author.bot) return;
  message.guild.fetchMember(message.author).then(member => {
    if (member.hasPermission("BAN_MEMBERS")) return;
    var b = [];
    var aut = [];
    setTimeout(() => {
      message.channel.fetchMessages({ limit: 10 }).then(m => {
        m.forEach(a => {
          if (m.filter(v => v.content === a.content).size > m.size / 2) {
            message.guild.fetchMember(m.author).then(member2 => {
              if (member2.hasPermission("BAN_MEMBERS")) return;
              b.push(a);
              aut.push(a.author);
            });
          }
        });
        if (!b.includes("`Saldırgan` botlar banlanıcak.")) {
          işlem();
        } else {
        }

        function işlem() {
          if (b.length > 5) {
            message.channel.send("`Saldırgan` botlar banlanıcak.");
            aut.forEach(a => {
              message.guild.ban(a.id)
            });
            message.channel.send("`Saldırgan` botlar banlandı.");
          } else return;
        }
      });
    });
  });
        }
})

.on('message', async msg => {
	    if (!msg.guild) return;
      let kullanıcı = msg.member
      let uyarısayın = await db.fetch(`uyarılar.${msg.author.id}`)
	    const veri = client.provider.get(msg.guild.id, 'reklamEngel', []);
	    const veri2 = client.provider.get(msg.guild.id, 'linkEngel', []);
	    if (veri ==! true) return;
	    if (veri === true) {
	        const swearWords = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
	        if (swearWords.some(word => msg.content.includes(word))) {
	        	try {
              msg.delete();
              db.add(`uyarılar.${msg.author.id}`, 1)
              if (uyarısayın === null) {
                  let uyari = new Discord.RichEmbed()
                      .setColor("RED")
                      .setFooter('Reklam kick sistemi', client.user.avatarURL)
                      .setDescription(`<@${msg.author.id}> Reklam-Kick Sistemi Tarafından Uyarıldınız (1/3)`)
                      .setTimestamp()
                  msg.channel.send(uyari).then(msg => msg.delete(3000));            
}
               if (uyarısayın === 1) {
                  let uyari = new Discord.RichEmbed()
                      .setColor("RED")
                      .setFooter('Reklam kick sistemi', client.user.avatarURL)
                      .setDescription(`<@${msg.author.id}> Reklam-Kick Sistemi Tarafından Uyarıldınız (2/3)`)
                      .setTimestamp()
                  msg.channel.send(uyari).then(msg => msg.delete(3000));
              }
              if (uyarısayın === 2) {
                  msg.delete();
                  await kullanıcı.kick({
                      reason: `Reklam kick sistemi`,
                  })
                  let uyari = new Discord.RichEmbed()
                      .setColor("RED")
                      .setFooter('Reklam kick sistemi', client.user.avatarURL)
                      .setDescription(`<@${msg.author.id}> 3 adet reklam uyarısı aldığı için kicklendi. Bir kez daha yaparsa banlanacak`)
                      .setTimestamp()
                  msg.channel.send(uyari).then(msg => msg.delete(3000));
              }
              if (uyarısayın === 3) {
                  msg.delete();
                  await kullanıcı.ban({
                      reason: `Reklam ban sistemi`,
                  })
                  db.delete(`uyarılar.${msg.author.id}`)
                  let uyari = new Discord.RichEmbed()
                      .setColor("RED")
                      .setFooter('Reklam kick sistemi', client.user.avatarURL)
                      .setDescription(`<@${msg.author.id}> kick yedikten sonra tekrar devam ettiği için banlandı.`)
                      .setTimestamp()
                  msg.channel.send(uyari).then(msg => msg.delete(3000));
              }
              
	        	} catch(err) {
	        		console.log(err);
	        	}
	        }
	    }
	})

	.on('guildMemberAdd', async member => {
    const kanal = member.guild.channels.get(member.guild.settings.get('girişKanal'));
    if (!kanal) return;
		const veri = client.provider.get(member.guild.id, 'girisMesajK', []);
		if (veri ==! true) return;
		if (veri === true) {
			const girismesajveri = client.provider.get(member.guild.id, 'girisMesaj', []);
      kanal.send(girismesajveri.replace('{sunucu}', `${member.guild.name}`).replace('{kullanıcı}', `${member.user.tag}`).replace('{kişisayısı}' , `${member.guilds.size}`))
		}
	})


	.on('guildMemberRemove', async member => {
    const kanal = member.guild.channels.get(member.guild.settings.get('çıkışKanal'));
    if (!kanal) return;
		const veri = client.provider.get(member.guild.id, 'cikisMesajK', []);
		if (veri ==! true) return;
		if (veri === true) {
			const girismesajveri = client.provider.get(member.guild.id, 'cikisMesaj', []);
      kanal.send(girismesajveri.replace('{sunucu}', `${member.guild.name}`).replace('{kullanıcı}', `${member.user.tag}`).replace('{kişisayısı}' , `${member.guilds.size}`))
		}
	})

.on('guildMemberAdd', async member  => {
		if (!member.guild) return;
  if(member.user.bot){
		const enabled = client.provider.get(member.guild.id, 'bottakipKanalK', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'bottakipKanal', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {

const entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'})
  let botInviterID = await entry.entries.first();
  				var embed = new Discord.RichEmbed()
				.setColor('RANDOM')
				.setThumbnail(member.user.displayAvatarURL)
				.setTitle('Bot Eklendi')
		    .addField('Eklenen Bot <:bots:671109654558015508>', `**${member.user.username}**`)
        .addField('Ekleyen Kişi', `**${botInviterID.executor.tag}** (${botInviterID.executor.id})`)
        .setTimestamp()
        .setFooter(`${client.user.username} - Bot takip sistemi.` , client.user.avatarURL)
  member.guild.channels.get(logCh).send(embed);
    }
  }
})

.on('guildMemberAdd', async member  => {
            if (!member.guild) return;
     if(member.user.bot){
        const veri = client.provider.get(member.guild.id, 'botkoruması', []);
        if (veri ==! true) return;
        if (veri === true) {
          const kanal = member.guild.channels.get(member.guild.settings.get('botkorumakanal'));
          const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`${member.user.username} Adlı bot eklendi girmesini onaylıyormusun?\n Onaylamak için: ${conf.customEmoji.basarili}\nReddetmek için: ${conf.customEmoji.basarisiz}\n Emojilerden birine tıklayın eğer tıklamasanız 3 dakika sonra işlem iptal olucak.`)
 
 kanal.send(embed).then(msg => {
    
    msg.react('509661885843505153').then(reaction => {
    msg.react('509661885973397504').then(reactions => {
      
 
    const backwardsFilter = (r , user) => r.emoji.id === '509661885843505153' && user.id === member.guild.owner.id;
    const forwardsFilter = (r , user) => r.emoji.id === '509661885973397504' && user.id === member.guild.owner.id;
     
    const backwards = msg.createReactionCollector(backwardsFilter, {time: 180000});
    const forwards = msg.createReactionCollector(forwardsFilter, {time: 180000}); 
     
      backwards.on('collect', r => {
        embed.setDescription(`${member.user.username} Adlı bot onaylandı`)
        msg.edit(embed)
        reaction.remove()
        reactions.remove()
      })
      
     
      backwards.on('end', () => {
         if(reaction.count === 1) {
        reaction.remove()
       reactions.remove()
        embed.setDescription(`${member.user.username} Adlı bot seçim yapmadığın için atıldı.`)
        msg.edit(embed)  
        member.kick()
         }else return;
      })
           
      forwards.on('collect', r => {
        embed.setDescription(`${member.user.username} Adlı bot atıldı.`)
        msg.edit(embed)
        member.kick('Bot koruma sistemi')
        reaction.remove()
        reactions.remove()
      })
      
    })
    })
  })
        
        }
        }
})

const invites = {};
const wait = require('util').promisify(setTimeout);
client.on('ready', () => {
  wait(1000);
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    }).catch(error => {
      console.log('Bazı sunucularda yetkim olmadığı için davetlerini göremiyorum.')
    })
  });
  
});

/*
client.on('guildMemberAdd', member => {
  if (!member.guild) return;
  const enabled = client.provider.get(member.guild.id, 'davetKanalK', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'davetKanal', []);
    if (!logCh) return;

  if (member.guild.channels.cache.get(logCh) === undefined || member.guild.channels.cache.get(logCh) === null) return;
		if (member.guild.channels.cache.get(logCh).type === "text") {
    		const veri = client.provider.get(member.guild.id, 'davetMesajK', []);
			const girismesajveri = client.provider.get(member.guild.id, 'davetMesaj', []);
  	        if(member.user.bot) {return;}
                if(!member.user.bot) {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.cache.get(invite.inviter.id);
    if (veri !== undefined) member.guild.channels.cache.get(logCh).send(`:inbox_tray: **${member.user.tag}** sunucuya katıldı. Davet eden: **${inviter.tag}** Daveti kullanan kişi sayısı: **${invite.uses}**`)
    if (veri === true)  member.guild.channels.cache.get(logCh).send(girismesajveri.replace('{kullanıcı}', `${member.user.tag}`).replace('{daveteden}', `${inviter.tag}`).replace('{davetsayı}', `${invite.uses}`))
    
    const davetödülE = client.provider.get(member.guild.id, 'davetÖdülK', []);
		const davetödül = client.provider.get(member.guild.id, 'davetÖdül', []);
    const davetödülS = member.guild.settings.get('davetÖdülS');
        if (davetödülE ==! true) return;
        if (davetödülE === true) {
    if (invite.uses === davetödülS) {
    const davetÖdülRol = member.guild.roles.cache.get(client.provider.get(member.guild.id, 'davetÖdül')).name
    inviter.send(`**${davetödülS}** Davet sayısına ulaştın ve  **${davetÖdülRol}** rolünü aldın!`)
     member.guild.member(inviter).addRole(davetödül)
    }
     }
  });
    }
    }
})
*/

client.on('emojiUpdate', async emoji => {
		if (!emoji.guild) return;
		const enabled = client.provider.get(emoji.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(emoji.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (emoji.guild.channels.get(logCh) === undefined || emoji.guild.channels.get(logCh) === null) return;
		if (emoji.guild.channels.get(logCh).type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.png`)
				.setTitle('Emoji düzenlendi')
		        .setDescription('**`' + emoji.name + '` adlı emoji düzenledi.**')
				emoji.guild.channels.get(logCh).send({embed});
		}
	})

		.on('roleUpdate', async (role , newRole) => {
		if (!role.guild) return;
		const enabled = client.provider.get(role.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(role.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (role.guild.channels.get(logCh) === undefined || role.guild.channels.get(logCh) === null) return;
		if (role.guild.channels.get(logCh).type === "text") {
          var Changes = {
        unknown: 0,
        permissions: 1,
    };
    var change = Changes.unknown;

      
     if(newRole.name != role.name) {
        var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(role.guild.iconURL)
				.setTitle('Rol Adı Değiştirildi')
		    .addField('Eski Adı', '`' + role.name + '`')
        .addField('Yeni Adı', '`' + newRole.name + '`')
				role.guild.channels.get(logCh).send({embed});
     }
              
        if(newRole.permissions != role.permissions)
        change = Changes.permissions;
      
      switch(change) {       
        case Changes.permissions:
        var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(role.guild.iconURL)
				.setTitle('Rol Düzenlendi')
        .setDescription('**`' + role.name + '` adlı rolün yetkileri düzenlendi.**')
				role.guild.channels.get(logCh).send({embed});
        
      }
		}
	})

.on('guildMemberUpdate', function(oldMember, newMember) {
		if (!oldMember.guild) return;
		const enabled = client.provider.get(oldMember.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMember.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMember.guild.channels.get(logCh) === undefined || oldMember.guild.channels.get(logCh) === null) return;
		if (oldMember.guild.channels.get(logCh).type === "text") {
    var Changes = {
        unknown: 0,
        addedRole: 1,
        removedRole: 2,
        username: 3,
        nickname: 4,
        avatar: 5
    };
    var change = Changes.unknown;

    if(newMember.nickname != oldMember.nickname)
        change = Changes.nickname;
      
          if(newMember.user.username != oldMember.user.username)
        change = Changes.username;
      
          var addedRole = '';
    newMember.roles.every(function(value) {
        if(oldMember.roles.find('id', value.id) == null) {
            change = Changes.addedRole;
            addedRole = value.name;
        }
      
    });
      
      if (oldMember.roles !== newMember.roles) {
    let output = ''
    let outputNew = ''

    oldMember.roles.forEach(role => {
      output += '\n' + role.name
    })

    newMember.roles.forEach(role => {
      outputNew += '\n' + role.name
    })

    if (output == outputNew) return

    embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`<@${newMember.id}> Kullanıcın Rolleri Güncellendi!`)
    .addField('Eski Rolleri:', `${output}`, true)
    .addField('Yeni Rolleri:', `឵${outputNew}`, true)
    .setThumbnail(`${oldMember.user.displayAvatarURL}`)
oldMember.guild.channels.get(logCh).send(embed);
}
      
 switch(change) {
      case Changes.username:
        var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(oldMember.user.displayAvatarURL)
				.setTitle('Kullanıcı Adı Değiştirildi')
        .addField('Eski Adı', '`' + oldMember.user.username + '`')
        .addField('Yeni Adı', '`' +  newMember.user.username + '`')
    oldMember.guild.channels.get(logCh).send(embed);
     
           case Changes.nickname:
        var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(oldMember.user.displayAvatarURL)
				.setTitle('Kullanıcı Takma Adı Değiştirildi')
        .addField('Eski Adı', oldMember.nickname != null ? '`' + oldMember.nickname + '`' : '`' + oldMember.user.username + '`')
        .addField('Yeni Adı', newMember.nickname != null ? '`' + newMember.nickname + '`' : '`' + oldMember.user.username + '`')
    oldMember.guild.channels.get(logCh).send(embed);
     
 /*    case Changes.addedRole:
             var embed = new Discord.RichEmbed()
				.setColor('#4CAF50')
				.setThumbnail(oldMember.user.displayAvatarURL)
				.setTitle(oldMember.user.username + ' Rol Verildi')
        .addField('Verilen Rol', '`' + addedRole + '`')
    oldMember.guild.channels.get(logCh).send(embed);
    */
 }
    }
})
/*
.on('presenceUpdate', (oldMember, newMember) => {
if (!oldMember.guild) return;
		const enabled = client.provider.get(oldMember.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMember.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMember.guild.channels.get(logCh) === undefined || oldMember.guild.channels.get(logCh) === null) return;
		if (oldMember.guild.channels.get(logCh).type === "text") {
		let userStatus = [];
		if (oldMember.user.bot || newMember.user.bot) return;
		let username = newMember.user.username;
    let x;
    if (newMember.user.presence.status === 'dnd') x = "Rahatsız Etmeyin"
    if (newMember.user.presence.status === 'online') x = "Çevrim İçi"
    if (newMember.user.presence.status === 'idle') x = "Boşta"
    if (newMember.user.presence.status === 'offline') x = "Çevrim Dışı"
    let x1;
    if (newMember.user.presence.status === 'dnd') x1 = "<:dnd:670174421092270091>"
    if (newMember.user.presence.status === 'online') x1 = "<:online:670174455502340096>"
    if (newMember.user.presence.status === 'idle') x1 = "<:idle:670174433302020096>"
    if (newMember.user.presence.status === 'offline') x1 = "<:offline:670174443603230720>"
    let x2;
    if(newMember.user.presence.status === 'online' === Object.keys(oldMember.user.presence.clientStatus).includes("desktop")) x2 = 'PC'
    if(newMember.user.presence.status === 'online' === Object.keys(oldMember.user.presence.clientStatus).includes("web")) x2 = 'WEB'
    if(newMember.user.presence.status === 'online' === Object.keys(oldMember.user.presence.clientStatus).includes("mobile")) x2 = 'Mobil'
    userStatus.push(username, x);
    if(newMember.user.presence.status === 'online') {
  oldMember.guild.channels.get(logCh).send(`${x1} **${username}** Adlı kullanıcı  **${x2}** üzerinden ${x} oldu.`);
    }else{
      if(newMember.user.presence.status === 'offline') return
       oldMember.guild.channels.get(logCh).send(`${x1} **${username}** Adlı kullanıcı durumunu ${x} olarak güncelledi`)
    }
    }
})
	*/
	client.on("message", async  msg => {

  if (!msg.guild) return;
  
  let cmd = msg.content.slice()
  
  if (db.has(`${msg.guild.id}.ozelkomut`) && db.fetch(`${msg.guild.id}.ozelkomut`).map(k => k.name).includes(cmd)) {
    const desc = db.fetch(`${msg.guild.id}.ozelkomut`).map(k => k.name).indexOf(cmd);
    msg.channel.send(db.fetch(`${msg.guild.id}.ozelkomut`).map(k => k.desc)[desc])
  } else {
    return
  }
  
})

		.on('guildBanAdd', async (guild, member) => {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'KlogsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'KlogsChannel', []);
    let limits = guild.settings.get('banLimit');
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
  const audit = await guild.fetchAuditLogs({limit: limits , type: 'MEMBER_BAN_ADD'});
    const entry = await audit.entries.first();
let bot = '[Bot]';
    if (!entry.executor.bot) bot = '';
  let uyarısayın = await db.fetch(`banlimitsayın.${entry.executor.id}`)
  db.add(`banlimitsayın.${entry.executor.id}` , 1)
  const embed = new Discord.RichEmbed()
        .setTitle('**Kullanıcı Banlandı**')
        .addField('Banlanan Kullanıcı:', `\`\`\`${member.tag}\`\`\``)
        .addField('Banlanan Kullanıcı ID:', `\`\`\`${member.id}\`\`\``)
        .addField('Banlayan Kişi', `\`\`\`${entry.executor.tag} ${bot}\`\`\``)
        .addField('Banlayan Kişi ID', `\`\`\`${entry.executor.id}\`\`\``)
        .setFooter('Banlanma Saati:')
        .setTimestamp(Date.now())
        .setColor("RANDOM");
      guild.channels.get(logCh).send(embed)
if(db.fetch(`banlimitsayın.${entry.executor.id}`) === limits){
db.delete(`banlimitsayın.${entry.executor.id}`)
guild.members.get(entry.executor.id).roles.forEach(r => {
guild.members.get(entry.executor.id).removeRole(r)
})
}
		}
	})

		.on('channelDelete', async channel => {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'KlogsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'KlogsChannel', []);
    let limits = channel.guild.settings.get('kanalLimit');
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
  const guild = channel.guild;
  const audit = await channel.guild.fetchAuditLogs({limit: limits , type: 'CHANNEL_DELETE'});
    const entry = await audit.entries.first();
let bot = '[Bot]';
    if (!entry.executor.bot) bot = '';
  let uyarısayın = await db.fetch(`kanalsilmesayin.${entry.executor.id}`)
  db.add(`kanalsilmesayin.${entry.executor.id}` , 1)
  const embed = await new Discord.RichEmbed()
        .setTitle('**Kanal Silindi**')
        .addField('Silinen Kanal:', `\`\`\`${channel.name}\`\`\``)
        .addField('Silenen Kanal ID:', `\`\`\`${channel.id}\`\`\``)
        .addField('Silen Kişi', `\`\`\`${entry.executor.tag} ${bot}\`\`\``)
        .addField('Silen Kişi ID', `\`\`\`${entry.executor.id}\`\`\``)
        .setFooter('Silinme Saati:')
        .setTimestamp(Date.now())
        .setColor("RANDOM");
      channel.guild.channels.get(logCh).send(embed)
if(db.fetch(`kanalsilmesayin.${entry.executor.id}`) === limits){
db.delete(`kanalsilmesayin.${entry.executor.id}`)
channel.guild.members.get(entry.executor.id).roles.forEach(r => {
channel.guild.members.get(entry.executor.id).removeRole(r)
})
}
    }
	})

client.on("roleDelete", async (role) => {
		if (!role.guild) return;
		const enabled = client.provider.get(role.guild.id, 'KlogsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(role.guild.id, 'KlogsChannel', []);
		if (!logCh) return;
		if (role.guild.channels.get(logCh) === undefined || role.guild.channels.get(logCh) === null) return;
		if (role.guild.channels.get(logCh).type === "text") {  
  const guild = role.guild;
  const audit = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'});
    const entry = await audit.entries.first();
let bot = '[Bot]';
    if (!entry.executor.bot) bot = '';
   const embed = await new Discord.RichEmbed()
        .setTitle('**Rol Silindi**')
        .addField('Silinen Rol:', `\`\`\`${role.name}\`\`\``)
        .addField('Silenen Rol ID:', `\`\`\`${role.id}\`\`\``)
        .addField('Silen Kişi', `\`\`\`${entry.executor.tag} ${bot}\`\`\``)
        .addField('Silen Kişi ID', `\`\`\`${entry.executor.id}\`\`\``)
        .setFooter('Silinme Saati:')
        .setTimestamp(Date.now())
        .setColor("RANDOM");
      role.guild.channels.get(logCh).send(embed)
  let yeniRol = await role.guild.createRole({ name: role.name, color: role.color, hoist: role.hoist, position: role.position, permissions: role.permissions, mentionable: role.mentionable });
  const aaa = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTimestamp()
  .setDescription(`${entry.executor.tag} kişisi bir rol sildi\nRolü tekrar açtım ve üyelerine vermeye başladım!`)
      role.guild.channels.get(logCh).send(aaa);
  const dddd = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(`${role.name} adlı rol verilmeye başlanıyor!`)
  let mesaj = await role.guild.channels.get(logCh).send(dddd);
  setTimeout(() => {
    let veri = roleDefender[role.id];
    let index = 0;
    setInterval(() => {
      veri = roleDefender[role.id];
      if (index >= veri.Üyeler.length){
        delete roleDefender[role.id];
        clearInterval(this);
      };
      let kisi = role.guild.members.get(veri.Üyeler[index]);
      try { kisi.addRole(yeniRol, "Koruma meydana geldi"); } catch(err) { };
      const ccc = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`${kisi.user.tag} adlı üyeye ${yeniRol} rolü verildi!`)
      mesaj.edit(ccc);
      index++;
    }, 2000);
  }, 5000);

role.guild.members.get(entry.executor.id).roles.forEach(r => {
role.guild.members.get(entry.executor.id).removeRole(r)
})

    }
});

const roleDefender = {};
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  oldMember.roles.forEach(async role => {
    if (newMember.roles.some(r => r.id == role.id)) return;
    if (!roleDefender[role.id]) {
      roleDefender[role.id] = {
        Rol: role,
        Üyeler: [newMember.id],
        Silindi: false
      };
    } else {
      roleDefender[role.id].Üyeler.push(newMember.id);
    };
  });
})


.on('message', msg => {
const reason = msg.content.split(" ").slice(1).join(" ");
const veri = client.provider.get(msg.guild.id, "destekkanalK", []);
		if (veri ==! true) return;
		if (veri === true) {
		const kanalveri = client.provider.get(msg.guild.id, "destekkanal", []);  
    let destekkanaliiste = msg.guild.channels.get(client.provider.get(msg.guild.id, "destekkanal")).name  
  if (msg.channel.name== `${destekkanaliiste}`) { 
    const hatay1 = new Discord.RichEmbed()
    .addField("☡ Hata ☡", `Bu Sunucuda \`Destek Ekibi\` Adında Bir Rol Yok!`)
    .setColor("RANDOM")
    
    if (!msg.guild.roles.exists("name", "Destek Ekibi")) return msg.author.send(hatay1) + msg.guild.owner.send(hatay1);
    if(!msg.guild.channels.find('name', 'Destek Talepleri')) {
      msg.guild.createChannel(`Destek Talepleri`, 'category').then(category => {
      category.setPosition(1)
        let every = msg.guild.roles.find("name", "@everyone");
      category.overwritePermissions(every, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
      })
      msg.guild.createChannel(`destek-${msg.author.username}`, "text").then(c => {
      c.setParent(category.id)
      let role = msg.guild.roles.find("name", "Destek Ekibi");
      let role2 = msg.guild.roles.find("name", "@everyone");
      let role3 = msg.guild.roles.find("name", `${client.user.username}`);
      c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
          c.overwritePermissions(role3, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });

      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(`${client.user.username} | Destek Sistemi`)
      .addField(`Merhaba ${msg.author.username}!`, `Destek Ekibi burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`${conf.prefix}kapat\` yazabilirsin.`)
      .addField(`» Talep Konusu/Sebebi:`, `${msg.content}`, true)
      .addField(`» Kullanıcı:`, `<@${msg.author.id}>`, true)
      .setFooter(`${client.user.username} | Destek Sistemi`)
      .setTimestamp();
      c.send(embed);
      c.send(`<@${msg.author.id}> Adlı kullanıcı "\`${msg.content}\`" sebebi ile destek talebi açtı! Lütfen Destek Ekibini bekle, <@&396029009345118213>`)
      msg.delete()
      }).catch(console.error);
    })
  }
}
    }
})

.on("message", message => {
if (message.content.toLowerCase().startsWith(conf.prefix + `kapat`)) {
    if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılablir!`);

    var deneme = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`Destek Talebi Kapatma İşlemi`)
    .setDescription(`Destek talebini kapatmayı onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
    .setFooter(`${client.user.username} | Destek Sistemi`)
    message.channel.send(deneme)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.guild.channels.find('name', 'Destek Talepleri').delete()
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Destek Talebi kapatma isteğin zaman aşımına uğradı!').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}
});


client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.channel.type !== 'text') return;
  if (message.content.startsWith(message.guild.commandPrefix)) return;

  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let süre = await db.fetch(`afk_${kullanıcı.id}_süre`)
  let timeObj = parse(Date.now() - süre);
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${message.guild.commandPrefix}afk`)) return;
  
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`<:check:509661885843505153> **${message.author.tag}** adlı kullanıcı artık AFK degil...`)
      db.delete(`afk_${message.author.id}`)
      db.delete(`afk_${message.author.id}_süre`)
      const member = message.guild.member(kullanıcı.id)
      member.setNickname(kullanıcı.username) 
    }
    if (afkkullanıcı) return message.channel.send(`<:xx:509661885973397504> **${kullanıcı.tag}** ${timeObj.hours}s ${timeObj.minutes}d ${timeObj.seconds} saniyedir AFK.\n Sebep : **${sebep}**`)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`<:check:509661885843505153> **${message.author.tag}** adlı kullanıcı artık AFK değil.`)
      db.delete(`afk_${message.author.id}`)
      db.delete(`afk_${message.author.id}_süre`)
      const member = message.guild.member(kullanıcı.id)
      member.setNickname(kullanıcı.username) 
    }
  }
  })


client.on('messageReactionAdd', async (reaction ,user) => {
  const message = reaction.message;
		const starboardChannel = message.guild.channels.get(message.guild.settings.get('starboardChannel'));
  const veri = client.provider.get(message.guild.id, 'starboardChannelK', []);
  if(veri ==! true) return
  if(veri === true) {
      if (reaction.emoji.name !== '⭐') return;
    if (message.author.id === user.id) return message.channel.send(`${user}, Kendi mesajını oylayamassın.`);
    if (message.author.bot) return message.channel.send(`${user}, Botların mesajını oylayamassın.`);
    if (!starboardChannel) return message.channel.send(`Starboard  kanalı ayarlı değil.`); 
     const fetch = await starboardChannel.fetchMessages({ limit: 100 });
     const starMsg = fetch.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
     const embeds = message.embeds
     const attachments = message.attachments
      let eURL = ''

            if (embeds.length > 0) {
              // attempt to resolve image url; if none exist, ignore it
              if (embeds[0].thumbnail && embeds[0].thumbnail.url) { eURL = embeds[0].thumbnail.url } else if (embeds[0].image && embeds[0].image.url) { eURL = embeds[0].image.url } else { eURL = embeds[0].url }
            } else if (attachments.array().length > 0) {
              const attARR = attachments.array()
              eURL = attARR[0].url
              // no attachments or embeds
            }
  if (starMsg) {
    const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(starMsg.embeds[0].footer.text);
    const foundStar = starMsg.embeds[0];
    var embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag , message.author.displayAvatarURL)
        .setColor(foundStar.color)
        .setDescription(foundStar.description)
        .setTimestamp(new Date(message.createdTimestamp))
        .setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`)
        .setImage(eURL);
       const oldMsg = await starboardChannel.fetchMessage(starMsg.id);
       await oldMsg.edit({ embed });
       
    }
  if(!starMsg){
            const embed = new Discord.RichEmbed()
                .setColor(15844367)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setDescription(`[Mesaja uç](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})\n${message.content}`)
                .setTimestamp(new Date(message.createdTimestamp))
                .setFooter(`⭐ ${message.reactions.get("⭐").count} | ${message.id}`)
                .setImage(eURL);
            await starboardChannel.send({ embed })
        }
  }
}); 



client.on('messageReactionRemove', async (reaction ,user) => {
  
  const message = reaction.message;
		const starboardChannel = message.guild.channels.get(message.guild.settings.get('starboardChannel'));
    const veri = client.provider.get(message.guild.id, 'starboardChannelK', []);
  if(veri ==! true) return
  if(veri === true) {
      if (reaction.emoji.name !== '⭐') return;
    if (message.author.id === user.id)
    if (message.author.bot);
     const fetch = await starboardChannel.fetchMessages({ limit: 100 });
     const starMsg = fetch.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
     const embeds = message.embeds
     const attachments = message.attachments
      let eURL = ''

            if (embeds.length > 0) {
              // attempt to resolve image url; if none exist, ignore it
              if (embeds[0].thumbnail && embeds[0].thumbnail.url) { eURL = embeds[0].thumbnail.url } else if (embeds[0].image && embeds[0].image.url) { eURL = embeds[0].image.url } else { eURL = embeds[0].url }
            } else if (attachments.array().length > 0) {
              const attARR = attachments.array()
              eURL = attARR[0].url
              // no attachments or embeds
            }
  if(starMsg){
     const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(starMsg.embeds[0].footer.text);
            const embed = new Discord.RichEmbed()
                .setColor(15844367)
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setDescription(`[Mesaja uç](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})\n${message.content}`)
                .setTimestamp(new Date(message.createdTimestamp))
                .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
                .setImage(eURL);
                const oldMsg = await starboardChannel.fetchMessage(starMsg.id);
                await oldMsg.edit({ embed });
        }
  }
}); 

client.on("message", async msg => {
  const db = require('quick.db');
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 7) {
    
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 5)
} 

if(msg.content.length > 50) {
db.add(`puancik_${msg.author.id + msg.guild.id}`, 30)
}
 
let gerekenxp = db.fetch(`gerekenxp_${msg.author.id + msg.guild.id}`)

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > `${gerekenxp || 155}`) {
     
    db.add(`gerekenxp_${msg.author.id + msg.guild.id}`, 155+55)
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
    
    msg.channel.send(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`)}** seviye oldun!`)
    
    db.delete(`puancik_${msg.author.id + msg.guild.id}`)
    
  };
 
  if (db.has(`roll_${msg.guild.id}`) === true) {
  if (db.has(`rollss_${msg.guild.id}`) === true) {
    
 var r = db.fetch(`roll_${msg.guild.id}`)
 var s = db.fetch(`rollss_${msg.guild.id}`)
  
  if (db.fetch(`seviye_${msg.author.id + msg.guild.id}`) == s) {
    if (msg.member.roles.has(r.id) === false) {
    msg.channel.send(`<@${msg.author.id}> Başarıyla **${db.fetch(`seviye_${msg.author.id + msg.guild.id}`)}.** seviyeye geçtin ve  **${r.name}** rolünü aldın!`)
    msg.member.addRole(r.id)
    }
  };
}};
  
});

const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyCIn2tUo5vtqwmrwB7orGonnNsS5a3oNSc');
const queue = new Map();
var servers = {};
client.on("message", async message => {
    var args = message.content.substring(message.guild.commandPrefix.length).split(" ");
    if (!message.content.startsWith(message.guild.commandPrefix)) return;
  var searchString = args.slice(1).join(' ');
	var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	var serverQueue = queue.get(message.guild.id);
    switch (args[0].toLowerCase()) {
      case "oynat":
    var voiceChannel = message.member.voiceChannel;
    const voiceChannelAdd = new Discord.RichEmbed()
    .setColor("#e53935")
    .setTitle(`Hata`)
    .setDescription(`Lütfen herhangi bir sesli kanala katılınız.`)
		if (!voiceChannel) return message.channel.send(voiceChannelAdd);
		var permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
      const warningErr = new Discord.RichEmbed()
      .setColor("#e53935")
      .setTitle(`Hata`)
      .setDescription(`Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.`)
			return message.channel.send(warningErr);
		}
		if (!permissions.has('SPEAK')) {
      const musicErr = new Discord.RichEmbed()
      .setColor("#36393E")
      .setTitle(`Hata`)
      .setDescription(`Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`)
			return message.channel.send(musicErr);
		}
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			var playlist = await youtube.getPlaylist(url);
			var videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				var video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      const PlayingListAdd = new Discord.RichEmbed()
      .setColor("#009688")
      .setTitle(`Oynatma Listesi:`)
      .setDescription(`**${playlist.title}** İsimli şarkı oynatma listesine Eklendi.`)
			return message.channel.send(PlayingListAdd);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
          var index = 0;
          const embed = new Discord.RichEmbed()
          .setColor("#009688")
          .setTitle(`Şarkı Seçimi`)
          .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')} \n**Lütfen hangi şarkıyı seçmek istiyorsan \`1\` ile \`10\` arası bir sayı yaz.**`)
          .setFooter(`Şarkı seçimi \`10\` saniye içinde iptal edilecektir.`)
					message.channel.send({embed});
					// eslint-disable-next-line max-depth
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
            console.error(err);
            const NoNumber = new Discord.RichEmbed()
            .setColor("#f44336")
            .setTitle(`Hata`)
            .setDescription(`Şarkı seçimi iptal edildi.`) 
						return message.channel.send(NoNumber);
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
          console.error(err);
          const songNope = new Discord.RichEmbed()
          .setColor("#f44336")
          .setTitle(`Hata`)
          .setDescription(`Aradığınız isimde bir şarkı bulamadım.`) 
					return message.channel.send(songNope);
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
        break;
      case "geç":
      const err0 = new Discord.RichEmbed()
      .setColor("#f44336")
      .setTitle(`Hata`)
      .setDescription(`Bir sesli kanalda değilsin.`) 
    if (!message.member.voiceChannel) return message.channel.send(err0);
    const err05 = new Discord.RichEmbed()
    .setColor("#f44336")
    .setTitle(`Hata`)
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
		if (!serverQueue) return message.channel.send(err05);
    const songSkip = new Discord.RichEmbed()
    .setColor("#009688")
    .setTitle(`Şarkı Geçildi`)
    .setDescription(`Şarkı başarıyla geçildi.`)
    serverQueue.connection.dispatcher.end(songSkip);
		return undefined;
break;
      case "dur":
    const err1 = new Discord.RichEmbed()
    .setColor("#f44336")
    .setTitle(`Hata`)
    .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voiceChannel) return message.channel.send(err1);
    const err2 = new Discord.RichEmbed()
    .setColor("#f44336")
    .setTitle(`Hata`)
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
		if (!serverQueue) return message.channel.send(err2);
		serverQueue.songs = [];
    const songEnd = new Discord.RichEmbed()
    .setColor("#4CAF50")
    .setTitle(`Şarkı Kapatıldı`)
    .setDescription(`Şarkı başarıyla kapatıldı.`)
    serverQueue.connection.dispatcher.end(songEnd); 
		return undefined;
break;
      case "ses":
      const asd1 = new Discord.RichEmbed()
      .setColor("#f44336")
      .setTitle(`Hata`)
      .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voiceChannel) return message.channel.send(asd1);
    const asd2 = new Discord.RichEmbed()
    .setColor("#f44336")
    .setTitle(`Hata`)
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(asd2);
    const volumeLevel = new Discord.RichEmbed()
    .setColor("#FF5722")
    .setTitle(`Ses Seviyesi`)
    .setDescription(`Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    if (!args[1]) return message.channel.send(volumeLevel);
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    const volumeLevelEdit = new Discord.RichEmbed()
    .setColor("#FF5722")
    .setTitle(`Ses Seviyesi`)
    .setDescription(`Yeni Ses Seviyesi: **${args[1]}**`)
    return message.channel.send(volumeLevelEdit);
break;
      case "şarkı-listesi":
    if (!serverQueue) return message.channel.send('Şuanda herhangi bir şarkı çalmıyor.');
    const songList10 = new Discord.RichEmbed()
    .setColor("#009688")
    .setTitle(`Şarkı Listesi`)
    .setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')} \n\n**Şuanda Çalınan Şarkı:** ${serverQueue.songs[0].title}`)
    return message.channel.send(songList10);
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
	var serverQueue = queue.get(message.guild.id);
	console.log(video);
	var song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`,
		thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
	    hours: video.duration.hours,
        minutes: video.duration.minutes,
        seconds: video.duration.seconds,	
	};
	if (!serverQueue) {
		var queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Ses kanalına giremedim HATA: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`Ses kanalına giremedim HATA: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
    if (playlist) return undefined;

    const songListBed = new Discord.RichEmbed()
    .setColor("#00BCD4")
    .setTitle(`Şarkı Listesine Eklendi`)
    .addField('Eklenen Şarkı', `[**${song.title}**](${song.url})`)
    .addField('Süresi', `${song.minutes}:${song.seconds}`)
	.addField('Ekleyen' , `**${message.author.username}**`)
	.setThumbnail(song.thumbnail)
		return message.channel.send(songListBed);
	}
	return undefined;
}
  function play(guild, song) {
	var serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
  }
  console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'İnternetten kaynaklı bir sorun yüzünden şarkılar kapatıldı.');
      else message.channel.send(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
  const playingBed = new Discord.RichEmbed()
  .setColor("#03A9F4")
  .setTitle(`<a:loading:396385483271438347> Şarkı Çalınıyor...`)
  .addField('Çalınan Şarkı', `[**${song.title}**](${song.url})`)
  .addField('Ses Seviyesi', `${serverQueue.volume}%`)
  .addField('Süresi', `${song.minutes}:${song.seconds}`)
  .addField('Şarkıyı İsteyen', `**${message.author.username}**`)
  .setThumbail(song.thumbnail)
	serverQueue.textChannel.send(playingBed);
}
});

 


client.ayar = db
client.config =  require("./config.js");
require("./modules/functions.js")(client);

client.ayarlars = {
        "sahip": ["276829048943149057"],  //kendi ID
};

client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  
  require("./modules/dashboard.js")(client);
});

client.login(conf.token); 