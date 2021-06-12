const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
require("moment-duration-format")
const dateFormat = require("dateformat")

module.exports = class AvatarCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kbilgi',
            aliases: ['kullanıcıbilgim', 'kullanıcı-bilgim','kullanıcı-bilgi'],
            group: 'bilgi',
            memberName: 'kbilgi',
            description: 'Kullanıcı bilginize veya istediğiniz kişinin bilgisine bakarsınız.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 10
			 },
			 args: [
				{
					key: 'member',
          label:'kullanıcı',
					prompt: 'Kimin hakkında bilgi istersin?',
					type: 'member',
					default: ''
				}
			]

        });
    }

  
  async run(msg, args,) {
    // Mesajı yazan kullanıcı
    if (args.member === "") {
			const member = msg.member;
			const u = member.user;
      var Durum = u.presence.status;
      var durm = (Durum == "online" ? ("<:dreambotonline:596631159769792522> Çevrimiçi") : (Durum == "offline" ? ("<:dreambotoffline:596631159870586890> Çevrimdışı") : (Durum == "idle" ? ("<:dreambotidle:596631159530717195> Boşta") : (Durum == "dnd" ? ("<:dreambotdnd:596631159723524096> Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))));
	 var tarih = ''
	 var gün;
	 if (moment(u.createdAt).format('dddd') === 'Monday') gün = "Pazartesi"
	 if (moment(u.createdAt).format('dddd') === 'Tuesday') gün = "Salı"
	 if (moment(u.createdAt).format('dddd') === 'Wednesday') gün = "Çarşamba"
	 if (moment(u.createdAt).format('dddd') === 'Thursday') gün = "Perşembe"
	 if (moment(u.createdAt).format('dddd') === 'Friday') gün = "Cuma"
	 if (moment(u.createdAt).format('dddd') === 'Saturday') gün = "Cumartesi"
	 if (moment(u.createdAt).format('dddd') === 'Sunday') gün = "Pazar"

			if(moment(u.createdAt).format('MM') === '01') {
				var tarih = `${moment(u.createdAt).format('D')} Ocak ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '02') {
				var tarih = `${moment(u.createdAt).format('D')} Şubat ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '03') {
				var tarih = `${moment(u.createdAt).format('D')} Mart ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '04') {
				var tarih = `${moment(u.createdAt).format('D')} Nisan ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '05') {
				var tarih = `${moment(u.createdAt).format('D')} Mayıs ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '06') {
				var tarih = `${moment(u.createdAt).format('D')} Haziran ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '07') {
				var tarih = `${moment(u.createdAt).format('D')} Temmuz ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '08') {
				var tarih = `${moment(u.createdAt).format('D')} Ağustos ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '09') {
				var tarih = `${moment(u.createdAt).format('D')} Eylül ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '10') {
				var tarih = `${moment(u.createdAt).format('D')} Ekim ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '11') {
				var tarih = `${moment(u.createdAt).format('D')} Kasım ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '12') {
				var tarih = `${moment(u.createdAt).format('D')} Aralık ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			
			      var tarih2 = ''
			if(moment.utc(member.joinedAt).format('MM') === '01') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Ocak ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '02') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Şubat ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '03') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Mart ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '04') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Nisan ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '05') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Mayıs ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '06') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Haziran ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '07') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Temmuz ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '08') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Ağustos ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '09') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Eylül ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '10') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Ekim ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '11') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Kasım ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '12') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Aralık ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			
	const millisCreated = new Date().getTime() - u.createdAt.getTime();
    const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
    const millisCreated1 = new Date().getTime() - member.joinedAt
    const daysCreated1 = moment.duration(millisCreated1).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
	  const kullanicibilgimks = new Discord.RichEmbed()
      .setColor('RANDOM')
	  .setAuthor(u.username, u.displayAvatarURL)
      .setDescription(`Tarih Saat: ${moment().format('HH:mm:ss DD-MM-YYYY')}`)
      .addField('Ad:', u.username + '#' + u.discriminator)
      .addField('ID:', u.id)
      .addField('Kayıt tarihi:', tarih + '\n Toplam ' + daysCreated + ' geçmiş vay be')
	  .addField('Sunucuya katılma tarihi:', tarih2 + '\n Toplam ' + daysCreated1 + ' geçmiş vay be')
      .addField('Durum:', durm)
      .addField('Şu an oynadığı oyun:', u.presence.game ? u.presence.game.name : 'Şu an oyun oynamıyor')
      .addField('BOT mu?', u.bot ? '\n <:bot:598626406036930576> Evet' : 'Hayır')
	  .addField('Son gönderdiği mesajın', u.lastMessage || 'Yok')
	  .addField('Rollerin:', `${member.roles.filter(r => r.name !== "@everyone").map(r => r.name).join(' ') ? member.roles.filter(r => r.name !== "@everyone").map(r => `\`${r.name}\``).join('  ') : 'Yok'}`)
      return msg.channel.sendEmbed(kullanicibilgimks);
    }
    
    // Seçilen kullanıcı kısmı
    
    const member = args.member;
			const u = member.user;
      var Durum = u.presence.status;
      var durm = (Durum == "online" ? ("<:dreambotonline:596631159769792522> Çevrimiçi") : (Durum == "offline" ? ("<:dreambotoffline:596631159870586890> Çevrimdışı") : (Durum == "idle" ? ("<:dreambotidle:596631159530717195> Boşta") : (Durum == "dnd" ? ("<:dreambotdnd:596631159723524096> Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))));
	 var tarih = ''
	 var gün;
	 if (moment(u.createdAt).format('dddd') === 'Monday') gün = "Pazartesi"
	 if (moment(u.createdAt).format('dddd') === 'Tuesday') gün = "Salı"
	 if (moment(u.createdAt).format('dddd') === 'Wednesday') gün = "Çarşamba"
	 if (moment(u.createdAt).format('dddd') === 'Thursday') gün = "Perşembe"
	 if (moment(u.createdAt).format('dddd') === 'Friday') gün = "Cuma"
	 if (moment(u.createdAt).format('dddd') === 'Saturday') gün = "Cumartesi"
	 if (moment(u.createdAt).format('dddd') === 'Sunday') gün = "Pazar"

			if(moment(u.createdAt).format('MM') === '01') {
				var tarih = `${moment(u.createdAt).format('D')} Ocak ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '02') {
				var tarih = `${moment(u.createdAt).format('D')} Şubat ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '03') {
				var tarih = `${moment(u.createdAt).format('D')} Mart ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '04') {
				var tarih = `${moment(u.createdAt).format('D')} Nisan ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '05') {
				var tarih = `${moment(u.createdAt).format('D')} Mayıs ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '06') {
				var tarih = `${moment(u.createdAt).format('D')} Haziran ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '07') {
				var tarih = `${moment(u.createdAt).format('D')} Temmuz ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '08') {
				var tarih = `${moment(u.createdAt).format('D')} Ağustos ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '09') {
				var tarih = `${moment(u.createdAt).format('D')} Eylül ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '10') {
				var tarih = `${moment(u.createdAt).format('D')} Ekim ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '11') {
				var tarih = `${moment(u.createdAt).format('D')} Kasım ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(u.createdAt).format('MM') === '12') {
				var tarih = `${moment(u.createdAt).format('D')} Aralık ${gün} ${moment(u.createdAt).format('YYYY HH:mm:ss')} `
			}
			
			      var tarih2 = ''
			if(moment.utc(member.joinedAt).format('MM') === '01') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Ocak ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '02') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Şubat ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '03') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Mart ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '04') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Nisan ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '05') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Mayıs ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '06') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Haziran ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '07') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Temmuz ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '08') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Ağustos ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '09') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Eylül ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '10') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Ekim ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '11') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Kasım ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment.utc(member.joinedAt).format('MM') === '12') {
				var tarih2 = `${moment.utc(member.joinedAt).format('D')} Aralık ${gün} ${moment.utc(member.joinedAt).format('YYYY HH:mm:ss')} `
			}
			
	const millisCreated = new Date().getTime() - u.createdAt.getTime();
    const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
    const millisCreated1 = new Date().getTime() - member.joinedAt
    const daysCreated1 = moment.duration(millisCreated1).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
	  const kullanicibilgimks = new Discord.RichEmbed()
      .setColor('RANDOM')
	  .setAuthor(u.username, u.displayAvatarURL)
      .setDescription(`Tarih Saat: ${moment().format('HH:mm:ss DD-MM-YYYY')}`)
      .addField('Ad:', u.username + '#' + u.discriminator)
      .addField('ID:', u.id)
      .addField('Kayıt tarihi:', tarih + '\n Toplam ' + daysCreated + ' geçmiş vay be')
	  .addField('Sunucuya katılma tarihi:', tarih2 + '\n Toplam ' + daysCreated1 + ' geçmiş vay be')
      .addField('Durum:', durm)
      .addField('Şu an oynadığı oyun:', u.presence.game ? u.presence.game.name : 'Şu an oyun oynamıyor')
      .addField('BOT mu?', u.bot ? '\n <:bot:598626406036930576> Evet' : 'Hayır')
	  .addField('Son gönderdiği mesajın', u.lastMessage || 'Yok')
	  .addField('Rollerin:', `${member.roles.filter(r => r.name !== "@everyone").map(r => r.name).join(' ') ? member.roles.filter(r => r.name !== "@everyone").map(r => `\`${r.name}\``).join('  ') : 'Yok'}`)
      return msg.channel.sendEmbed(kullanicibilgimks);
  }
};
