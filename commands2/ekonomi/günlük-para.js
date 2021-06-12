const { Command } = require('discord.js-commando');
const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = class günlükCommand extends Command {
    constructor(client){

        super(client, {
            name: 'günlük-para',
            aliases: ['günlük','para'],
            group: 'ekonomi',
            memberName: 'günlük-para',
            description: 'Bir Eşya Satın Alırsınız.',

        })
    }


async run(message, args) {

    let timeout = 86400000 // 24 hours in milliseconds, change if you'd like.
    let amount = 500
    // random amount: Math.floor(Math.random() * 1000) + 1;


    let daily = await db.fetch(`daily_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        message.channel.send(`<:xx:509661885973397504> Önceden Paranı Zaten Almış Bulunmaktasın, **${time.days} Gün ${time.hours} Saat  ${time.minutes} Dakika ${time.seconds} Saniye** Sonra Tekrar Deneyiniz!`)
    } else {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Günlük Para`, message.author.displayAvatarURL)
    .setColor("GREEN")
    .setDescription(`**Günlük Hediye**`)
    .addField(`Kazanılan:`, amount)

    message.channel.send(embed)
    db.add(`money_${message.author.id}`, amount)
    db.set(`daily_${message.author.id}`, Date.now())
        
    }

}
}