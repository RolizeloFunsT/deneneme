const { Command } = require('discord.js-commando');
 const conf = require('../../ayarlar.json')
module.exports = class SetLogChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bot-takip',
            aliases: ['bottakip','bot-takip-kanalı','bot-takip-ayarla'],
            group: 'ayarlar',
            memberName: 'bot-takip',
            description: 'Sunucuya eklenen botu kimin eklediğini gösterir.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },

            args: [
                {
                    key: 'channel',
                    prompt: 'Bot takip kanalı hangi kanal olsun?\n',
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
            const vt = this.client.provider.get(msg.guild.id, 'bottakipKanal', []);
            const db = this.client.provider.get(msg.guild.id, 'bottakipKanalK', []);
            if (vt === args.channel.id) {
                this.client.provider.set(msg.guild.id, 'bottakipKanalK', true);
                msg.channel.send(`${conf.customEmoji.basarisiz} Bot takip kanalı zaten **${args.channel.name}** olarak ayarlı.`);
            } else {
                this.client.provider.set(msg.guild.id, 'bottakipKanal', args.channel.id);
                this.client.provider.set(msg.guild.id, 'bottakipKanalK', true);
                return msg.channel.send(`${conf.customEmoji.basarili} Bot takip kanalı başarılı bir şekilde **${args.channel.name}** olarak ayarlandı`);
            }
        }
    }
};