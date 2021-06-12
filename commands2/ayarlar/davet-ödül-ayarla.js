const { Command } = require('discord.js-commando');
const ayarlar = require('../../ayarlar.json');
module.exports = class SetLogChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'davet-ödül-ayarla',
            aliases: ['davetödülayarla','davet-rol-ayarla','davetrol'],
            group: 'ayarlar',
            memberName: 'davet-ödül-ayarlar',
            description: 'Belirlediğiniz davet sayısına ulaşan kullanıcıya belirlediiniz rolü verir.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },
                      args: [
                {
                    key: 'ödül',
                    prompt: 'Davet ödül ne olsun?\n',
                    type: 'role'
                },
                                {
                    key: 'sayı',
                    prompt: 'Kaç davetten sonra verilsin?\n',
                    type: 'integer'
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
    }

    async run(msg, args) {
            const vt = this.client.provider.get(msg.guild.id, 'davetÖdül', []);
            const db = this.client.provider.get(msg.guild.id, 'davetÖdülK', []);
            if (vt === args.ödül.id) {
                this.client.provider.set(msg.guild.id, 'davetÖdülK', true);
                this.client.provider.set(msg.guild.id, 'davetÖdülS', args.sayı);
                msg.channel.send(`${ayarlar.customEmoji.basarisiz} Davet ödülü **${args.ödül.name}**  olarak ayarlı zaten.`);
            } else {
                this.client.provider.set(msg.guild.id, 'davetÖdül', args.ödül.id);
                this.client.provider.set(msg.guild.id, 'davetÖdülS', args.sayı);
                this.client.provider.set(msg.guild.id, 'davetÖdülK', true);
                return msg.channel.send(`${ayarlar.customEmoji.basarili} Davet ödül rolü **${args.ödül.name}** olarak ayarlandı.\n${ayarlar.customEmoji.basarili} Davet sayısı: ${args.sayı} olarak ayarlandı.`);
            }
    }
};