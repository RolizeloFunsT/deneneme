const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const formatUptime = time => moment.duration(time).format('G [gün], S [saat], D [dakika], S [saniye]');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shardbilgi',
            aliases: ["shardinfo","shard-bilgi","shard","shard-info"],
            group: 'bilgi',
            memberName: 'shardbilgi',
            description: 'Shardların bilgilerini atar.',
            examples: ['shardbilgi'],
        });    
    }

  async run(msg, args) {
    if(this.client.shard) {
    this.client.shard.fetchClientValues('users.size').then(users => {
        this.client.shard.fetchClientValues('guilds.size').then(guilds => {
            this.client.shard.fetchClientValues('uptime').then(uptime => {
                this.client.shard.fetchClientValues('ping').then(ping => {
                    let averageUptime = (uptime[0] + uptime[1]) / 2;
                    const embed = new RichEmbed()
                        .setColor('RANDOM')
                        .setAuthor(this.client.user.username, this.client.user.avatarURL)
                    for(var i = 0; i < this.client.shard.count; i++) {
                            embed.setDescription(`Bu sunucu toplam ${this.client.shard.count} sharddan ` + (i+1) + ` numaralı shard bulunuyor`)
                            embed.addField((ping[i] >= 150) ? 'Shard '+(i+1)+' <:botonline:592998573097091088>' : 'Shard '+(i+1)+' <:botonline:592998573097091088>',  guilds[i].toLocaleString() +  ' sunucu\n' +  users[i].toLocaleString()+' kullanıcı,\n'+Math.round(ping[i])+'ms!', true)
                    }
                    embed.addField('Gecikme', `${this.client.ping}ms!`)
                    embed.addField(`Toplam` , `${guilds.reduce((prev, val) => prev + val, 0)} sunucu,\n${users.reduce((prev, val) => prev + val, 0)} kullanıcı`)
                    embed.setFooter(`${msg.author.tag} tarafından istendi.` , msg.author.displayAvatarURL)
                    msg.channel.send({embed: embed});
                })
            })
        });
    }); 
    }else msg.channel.send('Shard bulunmuyor.')
  }
}