const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'davet-takip',
            aliases: ['davettakip','davet-takip-kanalı','davet-takip-ayarla'],
            group: 'ayarlar',
            memberName: 'davet-takip',
            description: 'Sunucuya gelen kişiyi kim davet ettiğini gösterir.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },

            args: [
                {
                    key: 'channel',
                    prompt: 'Davet takip kanalı hangi kanal olsun?\n',
                    type: 'channel'
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
    }

    async run(msg, args) {
        var ch = await args.channel;
        if (ch.type == 'voice') return msg.reply('Sesli kanallar kullanılamaz!');
        if (args.channel) {
            const vt = this.client.provider.get(msg.guild.id, 'davetKanal', []);
            const db = this.client.provider.get(msg.guild.id, 'davetKanalK', []);
            if (vt === args.channel.id) {
                this.client.provider.set(msg.guild.id, 'davetKanalK', true);
                msg.channel.send(`<:xx:509661885973397504> Davet takip kanalı zaten **${args.channel.name}** olarak ayarlı.`);
            } else {
                this.client.provider.set(msg.guild.id, 'davetKanal', args.channel.id);
                this.client.provider.set(msg.guild.id, 'davetKanalK', true);
                return msg.channel.send(`<:check:509661885843505153> Davet takip kanalı başarılı bir şekilde **${args.channel.name}** olarak ayarlandı`);
            }
        }
    }
};