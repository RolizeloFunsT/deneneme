const { Command } = require('discord.js-commando');
const conf = require('../../ayarlar.json')

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'anti-raid-bot-sistemi',
			aliases: ['antiraidbotsistemi','antiraidsistemi','botkoruma'],
			group: 'ayarlar',
			memberName: 'anti-raid-bot-sistemi',
			description: 'anti-raid-bot-sistemini açıp/kapat manızı sağlar..',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},
      			args: [
				{
					key: 'string',
					prompt: 'Anti raid bot sistemi açılsın mı?\n Açmak için `aç` Kapatmak için `kapat` yazınız.',
					type: 'string',
					validate: string => {
						if (string === 'aç' || string === 'kapat') return true;
						else return 'Lütfen açmak için  `aç` yada kapatmak için `kapat` yazın.';
					}
				},
        {
					key: 'channel',
					prompt: 'Hangi kanala gönderilsin mesajlar?',
					type: 'channel',
          default: ''
				}
			]
		});
	}
  
    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.guild.owner.id
    }

	async run(msg, args) {
			if (args.string === "aç") {
				const vt = this.client.provider.get(msg.guild.id, 'botkoruması', []);
				this.client.provider.set(msg.guild.id, 'botkoruması', true);
				msg.channel.send(`${conf.customEmoji.basarili} Anti raid bot sistemi: **açıldı**\n${conf.customEmoji.basarili} Log kanalı ${args.channel} olarak ayarlandı.`);
        var ch = await args.channel;
        if (ch.type == 'voice') return msg.reply('Sesli kanallar kullanılamaz!');
        msg.guild.settings.set('botkorumakanal', args.channel.id , true);
			}
			if (args.string === "kapat") {
				const vt = this.client.provider.get(msg.guild.id, 'botkoruması', []);
				this.client.provider.set(msg.guild.id, 'botkoruması', false);
        msg.guild.settings.set('botkorumakanal', false);
				return msg.channel.send(`${conf.customEmoji.basarili} Anti raid bot sistemi: **kapatıldı**.`);
			}
    }
};