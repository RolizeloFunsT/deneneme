const { Command } = require('discord.js-commando');
const db = require('quick.db')
const ms = require('parse-ms')
const Discord = require('discord.js')

module.exports = class haftalıkCommand extends Command {
    constructor(client){

        super(client, {
            name: 'haftalık-para',
            aliases: ['haftalık'],
            group: 'ekonomi',
            memberName: 'haftalık-para',
            description: 'Haftalık Para Kazanırsınız.',

        })
    }


async run(message, args) {

    let timeout = 604800000 // 7 days in milliseconds, change if you'd like.
    let amount = 1000
    // random amount: Math.floor(Math.random() * 1000) + 1;


    let weekly = await db.fetch(`weekly_${message.author.id}`);

    if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
        let time = ms(timeout - (Date.now() - weekly));

        message.channel.send(`<:xx:509661885973397504> Önceden Paranı Zaten Almış Bulunmaktasın, **${time.days} Gün ${time.hours} Saat  ${time.minutes} Dakika ${time.seconds} Saniye** Sonra Tekrar Deneyiniz!`)
    } else {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Haftalık`, message.author.displayAvatarURL)
    .setColor("RANDOM")
    .setDescription(`**Haftalık Hediye**`)
    .addField(`Kazanılan:`, amount)

    message.channel.send(embed)
    db.add(`money_${message.author.id}`, amount)
    db.set(`weekly_${message.author.id}`, Date.now())
        
    }

}
}