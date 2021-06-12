const { Command } = require('discord.js-commando');
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = class ödemeCommand extends Command {
    constructor(client){

        super(client, {
            name: 'ödeme',
            aliases: ['maaş'],
            group: 'ekonomi',
            memberName: 'ödeme',
            description: 'Bir Eşya Satın Alırsınız.',
          			args: [
				{
					key: 'user',
					prompt: 'Kime maşş vermek istersin?',
					type: 'user'
				},
          {
					key: 'miktar',
					prompt: 'Ne kadar vermek istersin?',
					type: 'string'
				}
			]
        })
    }


async run(message, args) {

    let member = db.fetch(`money_${message.author.id}`)


    if (message.content.includes('-')) { // if the message includes "-" do this.
        return message.channel.send('<:xx:509661885973397504> **Negatif** Para Verilemez!')
    }

    if (member < args.miktar) {
        return message.channel.send(`<:xx:509661885973397504> Bakiyenizin Aşağında Miktar Yazınız!`)
    }

    message.channel.send(`<:check:509661885843505153> ${message.author.username}, Başarıyla Belirtiğiniz Miktarda **D Para** Ödendi!`)
    db.add(`money_${args.user.id}`, args.miktar)
    db.subtract(`money_${message.author.id}`, args.miktar)




}
}