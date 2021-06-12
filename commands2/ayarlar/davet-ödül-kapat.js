const { Command } = require('discord.js-commando');
const ayarlar = require('../../ayarlar.json');
module.exports = class SetLogChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'davet-ödül-kapat',
            aliases: ['davetödülkapat','davetrolkapat'],
            group: 'ayarlar',
            memberName: 'davet-ödül-kapat',
            description: 'Davet ödül sistemini kapatır.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
    }

    async run(msg, args) {
            const vt = this.client.provider.get(msg.guild.id, 'davetÖdül', []);
            const db = this.client.provider.get(msg.guild.id, 'davetÖdülK', []);
            if (vt === false) {
                this.client.provider.set(msg.guild.id, 'davetÖdülK', false);
                this.client.provider.set(msg.guild.id, 'davetÖdülS', false);
                msg.channel.send(`${ayarlar.customEmoji.basarisiz} Davet ödülü zaten kapalı.`);
            } else {
                this.client.provider.set(msg.guild.id, 'davetÖdül', false);
                this.client.provider.set(msg.guild.id, 'davetÖdülS', false);
                this.client.provider.set(msg.guild.id, 'davetÖdülK', false);
                return msg.channel.send(`${ayarlar.customEmoji.basarili} Davet ödül sistemi başarılı bir şekilde kapatıldı.`);
            }
    }
};