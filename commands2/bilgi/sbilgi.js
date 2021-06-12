const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment')
const fs = require("fs");
var backups = JSON.parse(fs.readFileSync("./language.json", "utf8"));
module.exports = class AvatarCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sbilgi',
            aliases: ['sunucubilgisi', 'sunucu-bilgi', 'sunucu bilgi'],
            group: 'bilgi',
            memberName: 'sbilgi',
            description: 'Sunucu bilgisini atar.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
             },

        });
    }

  
  async run(msg, args) {
        let dilveri = msg.guild.settings.get('botDilK');
    let dil = msg.guild.settings.get('botDil');
    if(dilveri === true){
	         var konum = ''
        if(msg.guild.region === "russia") {
            var konum = 'Rusya :flag_ru:'
        }
                    if(msg.guild.region === "europe") {
            var konum = 'Avrupa :flag_eu:'
        }
        if(msg.guild.region === "us-west") {
            var konum = 'Batı Amerika :flag_us: '
        }
        if(msg.guild.region === "us-south") {
            var konum = 'Güney Amerika :flag_us: '
        }
        if(msg.guild.region === "us-east") {
            var konum = 'Doğu Amerika :flag_us: '
        }
        if(msg.guild.region === "us-central") {
            var konum = 'Amerika :flag_us: '
        }
        if(msg.guild.region === "brazil") {
            var konum = 'Brezilya :flag_br:'
        }
        if(msg.guild.region === "singapore") {
            var konum = 'Singapur :flag_sg:'
        }
        if(msg.guild.region === "sydney") {
            var konum = 'Sidney :flag_sh:'
        }
        if(msg.guild.region === "eu-west") {
            var konum = 'Batı Avrupa :flag_eu:'
        }
        if(msg.guild.region === "eu-south") {
            var konum = 'Güney Avrupa :flag_eu:'
        }
        if(msg.guild.region === "eu-east") {
            var konum = 'Doğu Avrupa :flag_eu:'
        }
        if(msg.guild.region === "eu-central") {
            var konum = 'Avrupa :flag_eu:'
        }
        if(msg.guild.region === "hongkong") {
            var konum = 'Hong Kong :flag_hk: '
        }
        if(msg.guild.region === "japan") {
            var konum = 'Japonya :flag_jp:'
        }
        var tarih = ''
        var gün;
    if (moment(msg.guild.createdAt).format('dddd') === 'Monday') gün = backups[dil].MONDAY
    if (moment(msg.guild.createdAt).format('dddd') === 'Tuesday') gün = backups[dil].TUESDAY
    if (moment(msg.guild.createdAt).format('dddd') === 'Wednesday') gün = backups[dil].WEDNESDAY
    if (moment(msg.guild.createdAt).format('dddd') === 'Thursday') gün = backups[dil].THURSDAY
    if (moment(msg.guild.createdAt).format('dddd') === 'Friday') gün = backups[dil].FRİDAY
    if (moment(msg.guild.createdAt).format('dddd') === 'Saturday') gün = backups[dil].SATURDAY
    if (moment(msg.guild.createdAt).format('dddd') === 'Sunday') gün = backups[dil].SUNDAY
        if(moment(msg.guild.createdAt).format('MM') === '01') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].JANUARY}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '02') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].FEBRUARY}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '03') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].MARCH}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '04') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].APRİL}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '05') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].MAY}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '06') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].JUNE}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '07') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].JULY}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '08') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].AUGUST}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '09') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].SEPTEMBER}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '10') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].OCTOBER}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '11') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} **${backups[dil].NOVEMBER}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**)`
        }
        if(moment(msg.guild.createdAt).format('MM') === '12') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** ${backups[dil].YEARS} ${moment(msg.guild.createdAt).format('DD')} **${backups[dil].DECEMBER}** ${backups[dil].MOUNTS} **${gün}** ${backups[dil].DAYS} (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
  const verificationLevels = [backups[dil].SERVER_VERIFICATINSLEVELS1, backups[dil].SERVER_VERIFICATINSLEVELS2 , backups[dil].SERVER_VERIFICATINSLEVELS3 , backups[dil].SERVER_VERIFICATINSLEVELS4 , backups[dil].SERVER_VERIFICATINSLEVELS5];
  const filterLevels = [backups[dil].SERVER_FILTERLEVELS1 , backups[dil].SERVER_FILTERLEVELS2 , backups[dil].SERVER_FILTERLEVELS3 ];
   var bans = await msg.guild.fetchBans()
	const sbilgi = new Discord.RichEmbed()
  .setColor('RANDOM')
	.setThumbnail(msg.guild.iconURL)
  .setAuthor(`${msg.guild.name} | ${backups[dil].SERVER_INFO}`, msg.guild.iconURL)
	.addField(backups[dil].SERVER_OWNER, `${msg.guild.owner} - ${msg.guild.owner.id}`)
  .addField(backups[dil].SERVER_ID , msg.guild.id)
  .addField(backups[dil].SERVER_DATE, tarih)
	.addField(backups[dil].SERVER_REGION, konum)
  .addField(backups[dil].SERVER_VERIFICATIONSLEVELS,`${verificationLevels[msg.guild.verificationLevel]}`)
  .addField(backups[dil].SERVER_CHANNELS,`**${msg.guild.channels.filter(c => c.type === "text").size}** ${backups[dil].SERVER_TEXTC}\n**${msg.guild.channels.filter(c => c.type === "voice").size}** ${backups[dil].SERVER_VOICEC}\n**${msg.guild.channels.filter(c => c.type === "category").size}** ${backups[dil].SERVER_CATEGORYC}\n**${backups[dil].SERVER_TOTAL} ${msg.guild.channels.size} ${backups[dil].SERVER_CHANNELTEXT}**`)
	.addField(backups[dil].SERVER_MEMBERS, '<:bot:419411082466295823> **' + msg.guild.members.filter(mem => mem.user.bot).size + '**\n<:dreambotonline:596631159769792522> **' + msg.guild.members.filter(m => m.user.presence.status == "online").size + '**\n<:dreambotdnd:596631159723524096> **' + msg.guild.members.filter(m => m.user.presence.status == "dnd").size + '**\n<:dreambotidle:596631159530717195> **' + msg.guild.members.filter(m => m.user.presence.status == "idle").size + '**\n<:dreambotoffline:596631159870586890> **' + msg.guild.members.filter(m => m.user.presence.status == "offline").size + '**\n<:banhammerdreambot:535538858142466059> **' + bans.size  + `**\n**${backups[dil].SERVER_TOTAL} ${msg.guild.memberCount} ${backups[dil].SERVER_MEMBERTEXT}**`)
	.addField(backups[dil].SERVER_MEMBER_STATUS, `${backups[dil].SERVER_CONNECTPC} **: ${msg.guild.members.filter(m => !m.user.bot && (m.user.presence.status !== "offline")).filter(m => Object.keys(m.user.presence.clientStatus).includes("desktop")).size} ${backups[dil].SERVER_PERSON}**\n${backups[dil].SERVER_CONNECTWEB} : **${msg.guild.members.filter(m => !m.user.bot && (m.user.presence.status !== "offline")).filter(m => Object.keys(m.user.presence.clientStatus).includes("web")).size} ${backups[dil].SERVER_PERSON} **\n${backups[dil].SERVER_CONNECTMOBIL} : **${msg.guild.members.filter(m => !m.user.bot && (m.user.presence.status !== "offline")).filter(m => Object.keys(m.user.presence.clientStatus).includes("mobile")).size} ${backups[dil].SERVER_PERSON}**`)
	.addField(backups[dil].SERVER_EMOJİ_SIZE,msg.guild.emojis.size)
  .addField(backups[dil].SERVER_FILTERLEVELS ,`${filterLevels[msg.guild.explicitContentFilter]}`)
	.addField(`${backups[dil].SERVER_ROLE_SIZE} (${msg.guild.roles.size})`, `${msg.guild.roles.map(roles => `\`${roles.name}\``).join(' ')}`)
   return msg.channel.sendEmbed(sbilgi)
    }else{
      	         var konum = ''
        if(msg.guild.region === "russia") {
            var konum = 'Rusya :flag_ru:'
        }
              if(msg.guild.region === "europe") {
            var konum = 'Avrupa :flag_eu:'
        }
        if(msg.guild.region === "us-west") {
            var konum = 'Batı Amerika :flag_us: '
        }
        if(msg.guild.region === "us-south") {
            var konum = 'Güney Amerika :flag_us: '
        }
        if(msg.guild.region === "us-east") {
            var konum = 'Doğu Amerika :flag_us: '
        }
        if(msg.guild.region === "us-central") {
            var konum = 'Amerika :flag_us: '
        }
        if(msg.guild.region === "brazil") {
            var konum = 'Brezilya :flag_br:'
        }
        if(msg.guild.region === "singapore") {
            var konum = 'Singapur :flag_sg:'
        }
        if(msg.guild.region === "sydney") {
            var konum = 'Sidney :flag_sh:'
        }
        if(msg.guild.region === "eu-west") {
            var konum = 'Batı Avrupa :flag_eu:'
        }
        if(msg.guild.region === "eu-south") {
            var konum = 'Güney Avrupa :flag_eu:'
        }
        if(msg.guild.region === "eu-east") {
            var konum = 'Doğu Avrupa :flag_eu:'
        }
        if(msg.guild.region === "eu-central") {
            var konum = 'Avrupa :flag_eu:'
        }
        if(msg.guild.region === "hongkong") {
            var konum = 'Hong Kong :flag_hk: '
        }
        if(msg.guild.region === "japan") {
            var konum = 'Japonya :flag_jp:'
        }
        var tarih = ''
    var gün;
    if (moment(msg.guild.createdAt).format('dddd') === 'Monday') gün = 'Pazartesi'
    if (moment(msg.guild.createdAt).format('dddd') === 'Tuesday') gün = 'Salı'
    if (moment(msg.guild.createdAt).format('dddd') === 'Wednesday') gün = 'Çarşamba'
    if (moment(msg.guild.createdAt).format('dddd') === 'Thursday') gün = 'Perşembe'
    if (moment(msg.guild.createdAt).format('dddd') === 'Friday') gün = 'Cuma'
    if (moment(msg.guild.createdAt).format('dddd') === 'Saturday') gün = 'Cumartesi'
    if (moment(msg.guild.createdAt).format('dddd') === 'Sunday') gün = 'Pazar'
        if(moment(msg.guild.createdAt).format('MM') === '01') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Ocak** Ayında **${gün}** Gününde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '02') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Şubat** Ayında **${gün}** Gününde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '03') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında${moment(msg.guild.createdAt).format('DD')} **Mart** Ayında **${gün}** Günüde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '04') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Nisan** Ayında **${gün}** Gününde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '05') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Mayıs** Ayında **${gün}** Günüde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '06') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Harizan** Ayında **${gün}** Gündünde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '07') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Temmuz** Ayında **${gün}** Gününde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '08') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Ağutos** Ayında **${gün}** Günüde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '09') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Eylül** Ayında **${gün}** Gününde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '10') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Ekim** Ayında **${gün}** Gününde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
        if(moment(msg.guild.createdAt).format('MM') === '11') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında **Kasım** Ayında **${gün}** Gününde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**)`
        }
        if(moment(msg.guild.createdAt).format('MM') === '12') {
            var tarih = `**${moment(msg.guild.createdAt).format('YYYY')}** Yılında ${moment(msg.guild.createdAt).format('DD')} **Aralık** Ayında **${gün}** Gününde (**${moment(msg.guild.createdAt).format('DD')}/${moment(msg.guild.createdAt).format('MM')}/${moment(msg.guild.createdAt).format('YYYY')}**) `
        }
  const verificationLevels = ['Yok', 'Düşük', 'Orta', '(╯°□°）╯︵ ┻━┻', '(╯°□°）╯︵ ┻━┻', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'];
  const filterLevels = ['Hiçbir mesajı tarama' , 'Bu role sahip olmayan kullanıcılardan gelen mesajları tara' , 'Tüm üyeler tarafından gönderilen mesajları tara.'];
  var bans = await msg.guild.fetchBans()
  const sbilgi = new Discord.RichEmbed()
  .setColor('RANDOM')
	.setThumbnail(msg.guild.iconURL)
  .setAuthor(`${msg.guild.name} | Sunucu Bilgi`, msg.guild.iconURL)
	.addField('Sunucu Sahibi', `${msg.guild.owner} - ${msg.guild.owner.id}`)
  .addField('Sunucu ID' , msg.guild.id)
  .addField('Oluşturulma Tarihi', tarih)
  .addField('Bölge', konum)
	.addField('Emoji Sayısı',msg.guild.emojis.size)
  .addField(`Toplam Üyeler (Total ${msg.guild.memberCount})`, '<:bot:419411082466295823>' + msg.guild.members.filter(mem => mem.user.bot).size + '\n<:online:419260335694807042>' + msg.guild.members.filter(m => m.user.presence.status == "online").size + '\n<:dnd:419260334868791306>' + msg.guild.members.filter(m => m.user.presence.status == "dnd").size + '\n<:away:419260334935900171>' + msg.guild.members.filter(m => m.user.presence.status == "idle").size + '\n<:offline:419260821168717824>' + msg.guild.members.filter(m => m.user.presence.status == "offline").size + '\n<:banhammerdreambot:535538858142466059> ' + bans.size)
 	.addField('Şuanda Kullanıcıların Statusları', `Bilgisayardan Bağlanan **: ${msg.guild.members.filter(m => !m.user.bot && (m.user.presence.status !== "offline")).filter(m => Object.keys(m.user.presence.clientStatus).includes("desktop")).size} Kişi**\nWEBDEN Bağlanan : **${msg.guild.members.filter(m => !m.user.bot && (m.user.presence.status !== "offline")).filter(m => Object.keys(m.user.presence.clientStatus).includes("web")).size} Kişi **\nMobilden Bağlanan : **${msg.guild.members.filter(m => !m.user.bot && (m.user.presence.status !== "offline")).filter(m => Object.keys(m.user.presence.clientStatus).includes("mobile")).size} Kişi**`)
  .addField(`Kanallar (Total ${msg.guild.channels.size})`,`Yazı: ${msg.guild.channels.filter(c => c.type === "text").size}\nSesli: ${msg.guild.channels.filter(c => c.type === "voice").size}\nKategori: ${msg.guild.channels.filter(c => c.type === "category").size}`)
	.addField('Doğrulama seviyesi',`${verificationLevels[msg.guild.verificationLevel]}`)
	.addField('Sakıncalı İçerik Filtresi:', `${filterLevels[msg.guild.explicitContentFilter]}`)
	.addField('Roller', `${msg.guild.roles.map(roles => `\`${roles.name}\``).join(' ')}`)
   return msg.channel.sendEmbed(sbilgi)
    }
    }
};