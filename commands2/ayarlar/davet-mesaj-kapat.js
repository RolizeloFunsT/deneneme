const { Command } = require('discord.js-commando');
const ayarlar = require('../../ayarlar.json');
module.exports = class SetLogChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'davet-mesaj-kapat',
            aliases: ['davetmesajkapat','davet-mesajkapat'],
            group: 'ayarlar',
            memberName: 'davet-mesaj-kapat',
            description: 'Sunucuya gelen kişiyi kim davet ettiğini gösterir.',
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
            const vt = this.client.provider.get(msg.guild.id, 'davetMesaj', []);
            const db = this.client.provider.get(msg.guild.id, 'davetMesajK', []);
            if (vt === false) {
                this.client.provider.set(msg.guild.id, 'davetMesajK', false);
                msg.channel.send(`${ayarlar.customEmoji.basarisiz} Davet takip mesaj zaten kapalı.`);
            } else {
                this.client.provider.set(msg.guild.id, 'davetMesaj', false);
                this.client.provider.set(msg.guild.id, 'davetMesajK', false);
                return msg.channel.send(`${ayarlar.customEmoji.basarili} Davet takip mesajı başarılı bir şekilde kapandı.`);
            }
    }
};