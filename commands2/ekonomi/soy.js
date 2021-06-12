const { Command } = require('discord.js-commando');
const db = require('quick.db')
const Discord = require('discord.js')

module.exports = class zarCommand extends Command {
    constructor(client){

        super(client, {
            name: 'soy',
            aliases: ['soy','hırsızlık'],
            group: 'ekonomi',
            memberName: 'soy',
            description: 'Banka Soyarsınız.',
	args: [
				{
					key: 'user',
					prompt: 'Kimi soymak istersin?',
					type: 'user',
				},
    ]
        })
    }


async run(message, args) {

    let targetuser = await db.fetch(`money_${message.author.id}`) // fetch mentioned users balance
    let author = await db.fetch(`money_${message.author.id}`) // fetch authors balance


    if (author < 150) { // if the authors balance is less than 150, return this.
        return message.channel.send('<:xx:509661885973397504> Birini Soymamız İçin En Az **150G Coin** Lazım.')
    }

    if (targetuser < 0) { // if mentioned user has 0 or less, it will return this.
        return message.channel.send(`<:xx:509661885973397504> ${message.author.username} Yanlış Kişi Adamın Bizden Az Parası Var :D`)
    }


    let random = Math.floor(Math.random() * 200) + 1; // random number 200-1, you can change 200 to whatever you'd like


    let embed = new Discord.RichEmbed()
    .setDescription(`${message.author} Adamı Soyduk ${args.user} Ve Kaçtık ${random} **D Para** Çaldık`)
    .setColor("RANDOM")
    .setTimestamp()
    message.channel.send(embed)


    db.subtract(`money_${args.user.id}`, random)
    db.add(`money_${message.author.id}`, random)
}
}