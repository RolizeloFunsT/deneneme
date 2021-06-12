const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
const os = require('os');
const { stripIndents } = require('common-tags');
require('moment-duration-format');
const fs = require("fs");
var backups = JSON.parse(fs.readFileSync("./language.json", "utf8"));

module.exports = class StatsCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'istatistik',
			aliases: ['bot durum', 'i', 'bi', 'istatistikler', 'kullanımlar', 'botdurum', 'bd', 'istatisik', 'stats', 'stat'],
			group: 'bilgi',
			memberName: 'istatistikler',
			description: 'Botun istatistiklerini gösterir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
        let dilveri = msg.guild.settings.get('botDilK');
    let dil = msg.guild.settings.get('botDil');
    if(dilveri === true){
		var message = await msg.channel.send(backups[dil].STATISTICSMSG)

		var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();

    const conf = require('../../ayarlar.json')
		var embed = {
			color: 3447003,
			description: backups[dil].STATISTICS,
			fields: [
				{
					name: '❯ ' + backups[dil].UPTIME,
					value: moment.duration(this.client.uptime)
						.format(`D [${backups[dil].UPTIMEDAY}], H [${backups[dil].UPTIMEHOUR}], m [${backups[dil].UPTIMEMINUTE}], s [${backups[dil].UPTIMESECONDS}]`),
					inline: false
				},
				{
					name: '❯ ' + backups[dil].SYSTEM,
					value: `${osType}`,
					inline: false
				},
				{
					name: '❯ ' + backups[dil].MEMORYUSAGE,
					value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
					inline: false
				},
        				{
					name: '❯ ' + backups[dil].CPUMODEL,
					value: `• ${os.cpus().map(i => `${i.model}`)[0]} `,
					inline: false
				},
                				{
					name: '❯ ' + backups[dil].CPUUSAGE,
					value: `• ${Math.round(require('os').loadavg()[0] * 100) / 100}%`,
					inline: false
				},
				{
					name: ' ❯ ' + backups[dil].GENERALSTATISTICS,
					value: stripIndents`
					• ${backups[dil].BGUILD}: ${this.client.guilds.size}
					• ${backups[dil].BCHANNEL}: ${this.client.channels.size}
					• ${backups[dil].BMEMBER}: ${this.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
					• ${backups[dil].MUSICGUILDSIZE}: ${this.client.voiceConnections.size}
				  • ${backups[dil].BCOMMANDSIZE}: ${this.client.registry.commands.size}
					`,
					inline: false
				},
        
        
				{
					name: '❯ ' + backups[dil].VERSIONS,
					value: stripIndents`
          • Bot: v${conf.surumler.botsurum}
					• Discord.js: v${Discord.version}
					• Discord.js-commando: v${commando.version}
					• Node: ${process.version}
					`,
					inline: false
				}
			],
      thumbnail: { url: message.author.avatarURL }
		};
		return message.edit('', {embed});
    }else{
      
      		var message = await msg.channel.send('İstatikler alınıyor...')
const conf = require('../../ayarlar.json')
		var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();
    
    

		var embed = {
			color: 3447003,
			description: '**İstatistikler**',
			fields: [
				{
					name: '❯ Çalışma süresi',
					value: moment.duration(this.client.uptime)
						.format('D [gün], H [saat], m [dakika], s [saniye]'),
					inline: false
				},
				{
					name: '❯ Sunucu işletim sistemi',
					value: `${osType}`,
					inline: false
				},
				{
					name: '❯ Bellek kullanımı',
					value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
					inline: false
				},
            {
					name: '❯ CPU Modeli',
					value: `• ${os.cpus().map(i => `${i.model}`)[0]} `,
					inline: false
				},
                				{
					name: '❯ CPU Kullanımı',
					value: `• ${Math.round(require('os').loadavg()[0] * 100) / 100}%`,
					inline: false
				},
				{
					name: ' ❯ Genel istatistikler',
					value: stripIndents`
         
					• Sunucu: ${this.client.guilds.size}
					• Kanal: ${this.client.channels.size}
					• Kullanıcı: ${this.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
					• Müzik Dinleyen Sunucu: ${this.client.voiceConnections.size}
				  • Komut Sayısı: ${this.client.registry.commands.size}
					`,
					inline: false
				},
        
        
				{
					name: '❯ Sürümler',
					value: stripIndents`
          • Bot: v${conf.surumler.botsurum}
					• Discord.js: v${Discord.version}
					• Discord.js-commando: v${commando.version}
					• Node: ${process.version}
					`,
					inline: false
				}
			],
      thumbnail: { url: message.author.avatarURL }
		};
    
		return message.edit('', {embed});
    }
	}
};
