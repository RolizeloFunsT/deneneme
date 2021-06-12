const { Command } = require('discord.js-commando');
const Jimp = require("jimp");
const Discord = require('discord.js');
const moment = require('moment');
require("moment-duration-format");
const fs = require("fs");
var backups = JSON.parse(fs.readFileSync("./language.json", "utf8"));

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kanalbilgi',
			aliases: [],
			group: 'bilgi',
			memberName: 'kanalbilgi',
			description: 'Avatar Beşiktaş efekti verir.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Hangi kanal hakkında bilgi istersin.',
					type: 'channel',
				}
			]
		});
	}


	async run(message, {channel}) {
        let dilveri = message.guild.settings.get('botDilK');
    let dil = message.guild.settings.get('botDil');
    if(dilveri === true){
     var tarih = ''
    var gün;
    if (moment(channel.createdAt).format('dddd') === 'Monday') gün = "Pazartesi"
    if (moment(channel.createdAt).format('dddd') === 'Tuesday') gün = "Salı"
    if (moment(channel.createdAt).format('dddd') === 'Wednesday') gün = "Çarşamba"
    if (moment(channel.createdAt).format('dddd') === 'Thursday') gün = "Perşembe"
    if (moment(channel.createdAt).format('dddd') === 'Friday') gün = "Cuma"
    if (moment(channel.createdAt).format('dddd') === 'Saturday') gün = "Cumartesi"
    if (moment(channel.createdAt).format('dddd') === 'Sunday') gün = "Pazar"
    
			if(moment(channel.createdAt).format('MM') === '01') {
				var tarih = `${moment(channel.createdAt).format('D')} Ocak ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '02') {
				var tarih = `${moment(channel.createdAt).format('D')} Şubat ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '03') {
				var tarih = `${moment(channel.createdAt).format('D')} Mart ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '04') {
				var tarih = `${moment(channel.createdAt).format('D')} Nisan ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '05') {
				var tarih = `${moment(channel.createdAt).format('D')} Mayıs ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '06') {
				var tarih = `${moment(channel.createdAt).format('D')} Haziran ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '07') {
				var tarih = `${moment(channel.createdAt).format('D')} Temmuz ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '08') {
				var tarih = `${moment(channel.createdAt).format('D')} Ağustos ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '09') {
				var tarih = `${moment(channel.createdAt).format('D')} Eylül ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '10') {
				var tarih = `${moment(channel.createdAt).format('D')} Ekim ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '11') {
				var tarih = `${moment(channel.createdAt).format('D')} Kasım ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '12') {
				var tarih = `${moment(channel.createdAt).format('D')} Aralık ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
      if (channel.type === 'text') {
    await message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        fields: [
          {
            name: 'Kanal adı',
            value: channel.name,
            inline: true
          },
          {
            name: 'Kanal ID',
            value: channel.id,
            inline: true
          },
          {
            name: 'Kanal Başlığı',
            value: (channel.topic === null || channel.topic.length < 2) ? 'Yok' : channel.topic,
            inline: true
          },
              {
            name: 'NFSW',
            value: channel.nsfw ? 'Evet' : 'Hayır',
            inline: true
          },
            {
            name: 'Kanal Tipi',
            value: channel.type ? 'Yazı Kanalı' : 'Yazı Kanalı',
            inline: true
          },
            {
            name: 'Bulunduğu Kategori',
            value: channel.parent ? channel.parent.name : 'Bulunmuyor',
            inline: true
          },
          {
            name: 'Kanalın Sırası',
            value: channel.position,
            inline: true
          },
          {
            name: 'Oluşturulma Tarihi',
            value: tarih,
            inline: true
          },
          {
            name: 'Kanaldaki Kişi Sayısı',
            value: channel.members.size,
            inline: true
          },
          {
          name: 'Slow Mode',
          value: channel.rateLimitPerUser,
          inline: true
          }
        ]
      }
    });
  } 
      if (channel.type === 'category') {
    await message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        fields: [
          {
            name: 'Kanal adı',
            value: channel.name,
            inline: true
          },
          {
            name: 'Kanal ID',
            value: channel.id,
            inline: true
          },
            {
            name: 'Kanal Tipi',
            value: channel.type ? 'Kategori' : 'Kategori',
            inline: true
          },
          {
            name: 'Kanalın Sırası',
            value: channel.position,
            inline: true
          },
          {
            name: 'Oluşturulma Tarihi',
            value: tarih,
            inline: true
          },
        ]
      }
    });
  } 
 if (channel.type === 'voice')  {
    await message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        fields: [
          {
            name: 'Kanal adı',
            value: channel.name,
            inline: true
          },
          {
            name: 'Kanal ID',
            value: channel.id,
            inline: true
          },
              {
            name: 'Kanal Bit Hızı',
            value: channel.bitrate,
            inline: true
          },
          {
            name: 'Kullanıcı Limiti',
            value: channel.userLimit,
            inline: true
          },
            {
            name: 'Kanal Tipi',
            value: channel.type ? 'Sesli Kanal' : 'Sesli Kanal',
            inline: true
          },
            {
            name: 'Bulunduğu Kategori',
            value: channel.parent ? channel.parent.name : 'Bulunmuyor',
            inline: true
          },
          {
            name: 'Kanalın Sırası',
            value: channel.position,
            inline: true
          },
          {
            name: 'Oluşturulma Tarihi',
            value: tarih,
            inline: true
          },
          {
            name: 'Kanaldaki Kişi Sayısı',
            value: channel.members.size,
            inline: true
          }
        ]
      }
    });
  }
    }else{
           var tarih = ''
    var gün;
    if (moment(channel.createdAt).format('dddd') === 'Monday') gün = backups[dil].MONDAY
    if (moment(channel.createdAt).format('dddd') === 'Tuesday') gün = backups[dil].TUESDAY
    if (moment(channel.createdAt).format('dddd') === 'Wednesday') gün = backups[dil].WEDNESDAY
    if (moment(channel.createdAt).format('dddd') === 'Thursday') gün = backups[dil].THURSDAY
    if (moment(channel.createdAt).format('dddd') === 'Friday') gün = backups[dil].FRİDAY
    if (moment(channel.createdAt).format('dddd') === 'Saturday') gün = backups[dil].SATURDAY
    if (moment(channel.createdAt).format('dddd') === 'Sunday') gün = backups[dil].SUNDAY
    
			if(moment(channel.createdAt).format('MM') === '01') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].JANUARY} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '02') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].FEBRUARY} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '03') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].MARCH} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '04') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].APRİL} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '05') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].MAY} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '06') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].JUNE} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '07') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].JULY} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '08') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].AUGUST} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '09') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].SEPTEMBED} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '10') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].OCTOBER} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '11') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].NOVEMBER} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(channel.createdAt).format('MM') === '12') {
				var tarih = `${moment(channel.createdAt).format('D')} ${backups[dil].DECEMBER} ${gün} ${moment(channel.createdAt).format('YYYY HH:mm:ss')} `
			}
      if (channel.type === 'text') {
    await message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        fields: [
          {
            name: 'Kanal adı',
            value: channel.name,
            inline: true
          },
          {
            name: 'Kanal ID',
            value: channel.id,
            inline: true
          },
          {
            name: 'Kanal Başlığı',
            value: (channel.topic === null || channel.topic.length < 2) ? 'Yok' : channel.topic,
            inline: true
          },
              {
            name: 'NFSW',
            value: channel.nsfw ? 'Evet' : 'Hayır',
            inline: true
          },
            {
            name: 'Kanal Tipi',
            value: channel.type ? 'Yazı Kanalı' : 'Yazı Kanalı',
            inline: true
          },
            {
            name: 'Bulunduğu Kategori',
            value: channel.parent ? channel.parent.name : 'Bulunmuyor',
            inline: true
          },
          {
            name: 'Kanalın Sırası',
            value: channel.position,
            inline: true
          },
          {
            name: backups[dil].EMOJI_DATE,
            value: tarih,
            inline: true
          },
          {
            name: 'Kanaldaki Kişi Sayısı',
            value: channel.members.size,
            inline: true
          },
          {
          name: 'Slow Mode',
          value: channel.rateLimitPerUser,
          inline: true
          }
        ]
      }
    });
  } 
      if (channel.type === 'category') {
    await message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        fields: [
          {
            name: 'Kanal adı',
            value: channel.name,
            inline: true
          },
          {
            name: 'Kanal ID',
            value: channel.id,
            inline: true
          },
            {
            name: 'Kanal Tipi',
            value: channel.type ? 'Kategori' : 'Kategori',
            inline: true
          },
          {
            name: 'Kanalın Sırası',
            value: channel.position,
            inline: true
          },
          {
            name: 'Oluşturulma Tarihi',
            value: tarih,
            inline: true
          },
        ]
      }
    });
  } 
 if (channel.type === 'voice')  {
    await message.channel.send({
      embed: {
        color: Math.floor(Math.random() * 16777214) + 1,
        fields: [
          {
            name: 'Kanal adı',
            value: channel.name,
            inline: true
          },
          {
            name: 'Kanal ID',
            value: channel.id,
            inline: true
          },
              {
            name: 'Kanal Bit Hızı',
            value: channel.bitrate,
            inline: true
          },
          {
            name: 'Kullanıcı Limiti',
            value: channel.userLimit,
            inline: true
          },
            {
            name: 'Kanal Tipi',
            value: channel.type ? 'Sesli Kanal' : 'Sesli Kanal',
            inline: true
          },
            {
            name: 'Bulunduğu Kategori',
            value: channel.parent ? channel.parent.name : 'Bulunmuyor',
            inline: true
          },
          {
            name: 'Kanalın Sırası',
            value: channel.position,
            inline: true
          },
          {
            name: 'Oluşturulma Tarihi',
            value: tarih,
            inline: true
          },
          {
            name: 'Kanaldaki Kişi Sayısı',
            value: channel.members.size,
            inline: true
          }
        ]
      }
    });
  }
    }
	}
};