const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');
const conf = require('../../ayarlar.json')

module.exports = class channelinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayarlar',
			group: 'ayarlar',
			memberName: 'ayarlar',
			description: 'Sunucudaki ayarları gösterir.',
			guildOnly: true,
		});
	}
	
	    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_MESSAGES');
    }
	
	async run(msg) {
        
    const modlog = msg.guild.channels.get(msg.guild.settings.get('modLog'))
    const duyuru = msg.guild.channels.get(msg.guild.settings.get('duyurukanal'))
    const hosGeldinK = msg.guild.channels.get(msg.guild.settings.get('hosGeldin'))
    const logsChannel = msg.guild.channels.get(msg.guild.settings.get('logsChannel'))
    const sayaçkanal = msg.guild.channels.get(msg.guild.settings.get('sayaçkanal'))
		const başvuruKanal = msg.guild.channels.get(msg.guild.settings.get('başvuruKanal'))
		const davetKanal = msg.guild.channels.get(msg.guild.settings.get('davetKanal'))
		const girisRol = msg.guild.roles.get(this.client.provider.get(msg.guild.id, 'girisRol'))
		const reklamEngel = this.client.provider.get(msg.guild.id, 'reklamEngel')
		const linkEngel = this.client.provider.get(msg.guild.id, 'linkEngel')
		const mentionEngel = this.client.provider.get(msg.guild.id, 'mentionEngel')
		const küfürEngelle = this.client.provider.get(msg.guild.id, 'küfürEngelle')
		const saas = this.client.provider.get(msg.guild.id, 'saas')
		const girişMesaj = this.client.provider.get(msg.guild.id, 'girisMesaj')
		const çıkışMesaj = this.client.provider.get(msg.guild.id, 'cikisMesaj')
    const dil = this.client.provider.get(msg.guild.id, 'botDil')
    const bottakip = msg.guild.channels.get(msg.guild.settings.get('bottakipKanal'))
    const starboard = msg.guild.channels.get(msg.guild.settings.get('starboardChannel'))
		const güvenlik = msg.guild.channels.get(msg.guild.settings.get('güvenlikKanal'))
    const selfbotkoruma = this.client.provider.get(msg.guild.id, 'selfbotkoruma')
    
		if(girisRol) {
		const girisRol = msg.guild.roles.get(this.client.provider.get(msg.guild.id, 'girisRol')).name
    const embed = new RichEmbed()
    .setAuthor(`${msg.guild.name} | Sunucusu ayarları`, msg.guild.iconURL)
		.setColor('RANDOM')
    .addField('Sunucu Prefix', msg.guild.commandPrefix , true)
    .addField('Bot dili', dil ? dil : 'TR' , true)
		.addField('Hoş geldin kanalı', hosGeldinK ? hosGeldinK : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'hoşgeldinayarla`' , true)
		.addField('Duyuru kanalı', duyuru ? duyuru : conf.customEmoji.kapali + ' `' +  msg.guild.commandPrefix + 'duyurukanalayarla`' , true)
    .addField('Mod-Log kanalı', modlog ? modlog : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'modlogayarla`' , true)
    .addField('Log kanalı', logsChannel ? logsChannel : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'logayarla`' , true)
    .addField('Sayaç kanalı', sayaçkanal ? sayaçkanal :conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'sayaçkanalayarla`' , true)
		.addField('Başvuru kanalı', başvuruKanal ? başvuruKanal : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'başvurukanalayarla`' , true)
		.addField('Davet Takip', davetKanal ? davetKanal : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'davettakip`' , true)
    .addField('Bot takip kanalı', bottakip ? güvenlik : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'bottakip`' , true)
    .addField('Güvenlik kanalı', güvenlik ? bottakip : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'güvenlikkanalayarla`' , true)
    .addField('Starboard kanalı', starboard ? starboard : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'starboardkanalayarla`' , true)
		.addField("Giriş rolü", girisRol ? "`@"+girisRol+"`" : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'girişrolüayarla`' , true)
		.addField("Reklam Engel", reklamEngel ? conf.customEmoji.acik : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'reklamengelle`' , true)
		.addField("Link Engel", linkEngel ? conf.customEmoji.acik  : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'linkengelle`' , true)
		.addField("Mention Engel", mentionEngel ? conf.customEmoji.acik : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'mentionengelle`' , true)
		.addField("Küfür Engel", küfürEngelle ? conf.customEmoji.acik : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'küfürengelle`' , true)
		.addField("Sa-As", saas ? conf.customEmoji.acik  : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'sa-as`' , true)
    .addField("Self Bot Koruma", selfbotkoruma ? conf.customEmoji.acik  : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'selfbotkoruması`' , true)
		.addField("Giriş Mesaj", girişMesaj ? conf.customEmoji.acik  : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'giriş-mesaj`' , true)
		.addField("Çıkış Mesaj", çıkışMesaj ? conf.customEmoji.acik : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'çıkışmesaj`' , true)
		return msg.embed(embed)
}else{
    const embed = new RichEmbed()
    .setAuthor(`${msg.guild.name} | Sunucusu ayarları`, msg.guild.iconURL)
		.setColor('RANDOM')
    .addField('Sunucu Prefix', msg.guild.commandPrefix , true)
    .addField('Bot dili', dil ? dil : 'TR' , true)
		.addField('Hoş geldin kanalı', hosGeldinK ? hosGeldinK : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'hoşgeldinayarla`' , true)
		.addField('Duyuru kanalı', duyuru ? duyuru : conf.customEmoji.kapali + ' `' +  msg.guild.commandPrefix + 'duyurukanalayarla`' , true)
    .addField('Mod-Log kanalı', modlog ? modlog : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'modlogayarla`' , true)
    .addField('Log kanalı', logsChannel ? logsChannel : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'logayarla`' , true)
    .addField('Sayaç kanalı', sayaçkanal ? sayaçkanal :conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'sayaçkanalayarla`' , true)
		.addField('Başvuru kanalı', başvuruKanal ? başvuruKanal : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'başvurukanalayarla`' , true)
		.addField('Davet Takip', davetKanal ? davetKanal : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'davettakip`' , true)
    .addField('Bot takip kanalı', bottakip ? bottakip : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'bottakip`' , true)
    .addField('Güvenlik kanalı', güvenlik ? bottakip : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'güvenlikkanalayarla`' , true)
    .addField('Starboard kanalı', starboard ? starboard : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'starboardkanalayarla`' , true)
		.addField("Giriş rolü", girisRol ? "`@"+girisRol+"`" : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'girişrolüayarla`' , true)
		.addField("Reklam Engel", reklamEngel ? conf.customEmoji.acik : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'reklamengelle`' , true)
		.addField("Link Engel", linkEngel ? conf.customEmoji.acik  : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'linkengelle`' , true)
		.addField("Mention Engel", mentionEngel ? conf.customEmoji.acik : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'mentionengelle`' , true)
		.addField("Küfür Engel", küfürEngelle ? conf.customEmoji.acik : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'küfürengelle`' , true)
		.addField("Sa-As", saas ? conf.customEmoji.acik  : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'sa-as`' , true)
    .addField("Self Bot Koruma", selfbotkoruma ? conf.customEmoji.acik  : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'selfbotkoruması`' , true)
		.addField("Giriş Mesaj", girişMesaj ? conf.customEmoji.acik  : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'giriş-mesaj`' , true)
		.addField("Çıkış Mesaj", çıkışMesaj ? conf.customEmoji.acik : conf.customEmoji.kapali + ' `' + msg.guild.commandPrefix + 'çıkışmesaj`' , true)
		return msg.embed(embed)
      }
	}
}