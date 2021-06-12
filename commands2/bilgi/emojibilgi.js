const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
require("moment-duration-format");
const dateFormat = require("dateformat");
const fs = require("fs");
var backups = JSON.parse(fs.readFileSync("./language.json", "utf8"));
module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'emojibilgi',
			aliases: ['emojobilgisi'],
			group: 'bilgi',
			memberName: 'emojibilgi',
			description: 'Emoji bilgi.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'emoji',
					prompt: 'Bilgisine bakmak istediğiniz emoji adı nedir?',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(message, args) {
    let dilveri = message.guild.settings.get('botDilK');
    let dil = message.guild.settings.get('botDil');
    if(dilveri === true){
    let emojiinfo;
    if (args.emoji) emojiinfo = this.client.emojis.find(e => e.name === `${args.emoji}`)
    else emojiinfo = this.client.emojis.get(`${args.emoji}.id`)
        
    var tarih = ''
    var gün;
    if (moment(emojiinfo.createdAt).format('dddd') === 'Monday') gün = backups[dil].MONDAY
    if (moment(emojiinfo.createdAt).format('dddd') === 'Tuesday') gün = backups[dil].TUESDAY
    if (moment(emojiinfo.createdAt).format('dddd') === 'Wednesday') gün = backups[dil].WEDNESDAY
    if (moment(emojiinfo.createdAt).format('dddd') === 'Thursday') gün = backups[dil].THURSDAY
    if (moment(emojiinfo.createdAt).format('dddd') === 'Friday') gün = backups[dil].FRİDAY
    if (moment(emojiinfo.createdAt).format('dddd') === 'Saturday') gün = backups[dil].SATURDAY
    if (moment(emojiinfo.createdAt).format('dddd') === 'Sunday') gün = backups[dil].SUNDAY
			if(moment(emojiinfo.createdAt).format('MM') === '01') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].JANUARY} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '02') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].FEBRUARY} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '03') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].MARCH} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '04') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].APRİL} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '05') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].MAY} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '06') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].JUNE} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '07') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].JULY} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '08') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].AUGUST} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '09') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].SEPTEMBED} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '10') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].OCTOBER} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '11') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].NOVEMBER} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '12') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} ${backups[dil].DECEMBER} ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
    const emojibilgi = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(backups[dil].EMOJI_INFO)
    .addField('❯ ' + backups[dil].EMOJI_NAME , emojiinfo.name , true)
    .addField('❯ ' + backups[dil].EMOJI_ID ,   emojiinfo.id , true)
    .addField('❯ ' + backups[dil].EMOJI_DATE, tarih , true)
    .addField('❯ ' + backups[dil].EMOJI_GUILD , emojiinfo.guild , true)
    .addField('❯ ' + backups[dil].EMOJI_ANIMATED , emojiinfo.animated ? backups[dil].EMOJI_YES : backups[dil].EMOJI_NO , true)
    .setThumbnail(`https://cdn.discordapp.com/emojis/${emojiinfo.id}`)
    return message.channel.sendEmbed(emojibilgi);
    }else{
       let emojiinfo;
    if (args.emoji) emojiinfo = this.client.emojis.find(e => e.name === `${args.emoji}`)
        else emojiinfo = this.client.emojis.get(`${emojiinfo.id}`)
        
    var tarih = ''
    var gün;
    if (moment(emojiinfo.createdAt).format('dddd') === 'Monday') gün = "Pazartesi"
    if (moment(emojiinfo.createdAt).format('dddd') === 'Tuesday') gün = "Salı"
    if (moment(emojiinfo.createdAt).format('dddd') === 'Wednesday') gün = "Çarşamba"
    if (moment(emojiinfo.createdAt).format('dddd') === 'Thursday') gün = "Perşembe"
    if (moment(emojiinfo.createdAt).format('dddd') === 'Friday') gün = "Cuma"
    if (moment(emojiinfo.createdAt).format('dddd') === 'Saturday') gün = "Cumartesi"
    if (moment(emojiinfo.createdAt).format('dddd') === 'Sunday') gün = "Pazar"
    
			if(moment(emojiinfo.createdAt).format('MM') === '01') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Ocak ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '02') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Şubat ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '03') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Mart ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '04') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Nisan ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '05') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Mayıs ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '06') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Haziran ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '07') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Temmuz ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '08') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Ağustos ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '09') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Eylül ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '10') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Ekim ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '11') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Kasım ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(emojiinfo.createdAt).format('MM') === '12') {
				var tarih = `${moment(emojiinfo.createdAt).format('D')} Aralık ${gün} ${moment(emojiinfo.createdAt).format('YYYY HH:mm:ss')} `
			}
			
    const emojibilgi = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Emoji Bilgi')
    .addField('❯ İsmi' , emojiinfo.name , true)
    .addField('❯ ID' , emojiinfo.id , true)
    .addField('❯ Oluşturulma Tarihi' , tarih , true)
    .addField('❯ Bulunduğu Sunucu' , emojiinfo.guild , true)
    .addField('❯ Gif Emojimi' , emojiinfo.animated ? 'Evet' : 'Hayır' , true)
    .setThumbnail(`https://cdn.discordapp.com/emojis/${emojiinfo.id}`)
    return message.channel.sendEmbed(emojibilgi);
    }
  }
  
}