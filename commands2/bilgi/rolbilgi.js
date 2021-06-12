const { Command  } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rolbilgi',
			aliases: ['rolbilgisi'],
			group: 'bilgi',
			memberName: 'rolbilgi',
			description: 'Rol Hakkında Bilgi Almanızı Sağlar..',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'Hangi rol hakkında bilgi istersin? (rol ismini yazınız)',
					type: 'role',
        }
			]
		});
	}


	async run(msg, args) {
			const {rol} = args;
   var tarih = ''
			if(moment(rol.createdAt).format('MM') === '01') {
				var tarih = `${moment(rol.createdAt).format('DD')} Ocak ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '02') {
				var tarih = `${moment(rol.createdAt).format('DD')} Şubat ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '03') {
				var tarih = `${moment(rol.createdAt).format('DD')} Mart ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '04') {
				var tarih = `${moment(rol.createdAt).format('DD')} Nisan ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '05') {
				var tarih = `${moment(rol.createdAt).format('DD')} Mayıs ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '06') {
				var tarih = `${moment(rol.createdAt).format('DD')} Haziran ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '07') {
				var tarih = `${moment(rol.createdAt).format('DD')} Temmuz ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '08') {
				var tarih = `${moment(rol.createdAt).format('DD')} Ağustos ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '09') {
				var tarih = `${moment(rol.createdAt).format('DD')} Eylül ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '10') {
				var tarih = `${moment(rol.createdAt).format('DD')} Ekim ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '11') {
				var tarih = `${moment(rol.createdAt).format('DD')} Kasım ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(rol.createdAt).format('MM') === '12') {
				var tarih = `${moment(rol.createdAt).format('DD')} Aralık ${moment(rol.createdAt).format('YYYY HH:mm:ss')} `
			}
    
			    var Canvas = require('canvas')
                var canvas = Canvas.createCanvas(150, 150)
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = `${rol.hexColor}`;
                ctx.fill()
                ctx.fillRect(0, 0, 150, 150)
       const embed = new RichEmbed()
  .setColor(rol.hexColor)
  .addField('Rol İsmi', rol.name , true)
  .addField('ID', rol.id , true)
  .addField('Role Sahip Kullanıcılar', rol.members.size , true)
  .addField('Renk', rol.hexColor, true) 
  .addField('Etiketleme?', rol.mentionable ? '\nEvet' : 'Hayır' , true)
  .addField('Ayrı Gösterme?', rol.hoist ? '\nEvet' : 'Hayır' , true)   
  .addField('Rolün Sırası?', rol.position , true)
  .addField('Oluşturulduğu Zaman', tarih , true)
  .setThumbnail(`attachment://rolbilgi.png`)
    return msg.channel.send({embed, files:[{attachment:canvas.toBuffer(),name:"rolbilgi.png"}]})
	}
};