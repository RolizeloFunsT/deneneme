const { Command } = require('discord.js-commando');
const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

module.exports = class zarCommand extends Command {
    constructor(client){

        super(client, {
            name: 'aylık-para',
            aliases: [],
            group: 'ekonomi',
            memberName: 'aylık-para',
            description: 'Bir Eşya Satın Alırsınız.',

        })
    }


async run(message, args) {

    let timeout = 2592000000 // 30 days in milliseconds, change if you'd like.
    let amount = 5000
    // random amount: Math.floor(Math.random() * 1000) + 1;


    let monthly = await db.fetch(`monthly_${message.author.id}`);

    if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
        let time = ms(timeout - (Date.now() - monthly));

        message.channel.send(`<:xx:509661885973397504> Önceden Paranı Zaten Almış Bulunmaktasın, **${time.days}Gün ${time.hours}Saat  ${time.minutes}Dakika ${time.seconds}Saniye** Sonra Tekrar Deneyiniz!`)
    } else {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Aylık Para`, message.author.displayAvatarURL)
    .setColor("RANDOM")
    .setDescription(`**Aylık Hediye**`)
    .addField(`Kazanılan:`, amount)

    message.channel.send(embed)
    db.add(`money_${message.author.id}`, amount)
    db.set(`monthly_${message.author.id}`, Date.now())
        
    }

}
}