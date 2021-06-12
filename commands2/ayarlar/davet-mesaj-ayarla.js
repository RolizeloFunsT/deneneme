const { Command } = require('discord.js-commando');
const ayarlar = require('../../ayarlar.json');
module.exports = class SetLogChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'davet-mesaj',
            aliases: ['davetmesaj','davet-mesaj-ayarla'],
            group: 'ayarlar',
            memberName: 'davet-mesaj',
            description: 'Sunucuya gelen kişiyi kim davet ettiğini gösterir.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },

            args: [
                {
                    key: 'mesaj',
                    prompt: 'Davet mesajı ne olsun? Kullanıcıyı göstermek için: {kullanıcı} ,Davet edeni göstermek için: {daveteden} , Daveti kullanan sayısını göstermek için {davetsayı} \n',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
    }

    async run(msg, args) {
            const vt = this.client.provider.get(msg.guild.id, 'davetMesaj', []);
            const db = this.client.provider.get(msg.guild.id, 'davetMesajK', []);
            if (vt === args.mesaj) {
                this.client.provider.set(msg.guild.id, 'davetMesajK', true);
                msg.channel.send(`${ayarlar.customEmoji.basarisiz} Davet takip mesaj zaten **${args.mesaj}** olarak ayarlı.`);
            } else {
                this.client.provider.set(msg.guild.id, 'davetMesaj', args.mesaj);
                this.client.provider.set(msg.guild.id, 'davetMesajK', true);
                return msg.channel.send(`${ayarlar.customEmoji.basarili} Davet takip mesajı başarılı bir şekilde **${args.mesaj}** olarak ayarlandı`);
            }
    }
};