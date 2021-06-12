const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'davet-takip-kapat',
            aliases: ['davettakipkapat'],
            group: 'ayarlar',
            memberName: 'davet-takip-kapat',
            description: 'Davet takip kanalını kapatmanızı sağlar.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 60
            }
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
    }

    async run(msg, args) {
           const vt = this.client.provider.get(msg.guild.id, 'davetKanal', []);
			const db = this.client.provider.get(msg.guild.id, 'davetKanalK', []);
			if (vt === false) {
				this.client.provider.set(msg.guild.id, 'davetKanalK', false);
				msg.channel.send(`<:xx:509661885973397504> Davet takip zaten devre dışı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'davetKanal', false);
				this.client.provider.set(msg.guild.id, 'davetKanalK', false);
				msg.guild.settings.set('davetKanal', false);
				msg.guild.settings.set('davetKanalK', false);
				return msg.channel.send(`<:check:509661885843505153> Davet takip devre dışı bırakıldı`);
    }
	}
};