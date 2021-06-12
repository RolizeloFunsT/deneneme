const { Command } = require('discord.js-commando');
const db = require('quick.db')
const Discord = require('discord.js')

module.exports = class zarCommand extends Command {
    constructor(client){

        super(client, {
            name: 'görevler',
            aliases: ['meslek','para-kazan','money-reword','çalış'],
            group: 'ekonomi',
            memberName: 'görevler',
            description: 'Meslek Olarak Çalışıp Para Kazanırsınız.',
          args: [
				{
					key: 'string',
					prompt: 'Bir Görev Seçmelisin (tasarımcı , programcı , inşaatçı)',
					type: 'string',
					validate: string => {
						if (string === 'tasarımcı' || string === 'inşaatçı' || string === 'programcı') return true;
						else return 'Lütfen `tasarımcı` , `inşaatçı` , `programcı` birini yazın.';
					}
				}
			]

        })
    }


async run(message, args) {

    if (args.string === "tasarımcı") {

        let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number. whatever you'd like

        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`:palm_tree: ${message.author} Tasarımcı Olarak Çalıştın, Ve ${amount}D Para Kazandın.`)
        .setColor("RANDOM")
        
    
        message.channel.send(embed)
        db.add(`money_${message.author.id}`, amount)
    }  
  
  if (args.string === "inşaatçı") {
        let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number. whatever you'd like

        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`:construction_worker: ${message.author}, İnşaatçı Olarak Çalışmaya Başladın ${amount}D Para Kazandın.`)
        .setColor("RANDOM")
        
    
        message.channel.send(embed)
        db.add(`money_${message.author.id}`, amount)
    } 
  
  if(args.string === 'programcı') {
        let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number. change to whatever you'd like

        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`:necktie: ${message.author}, Programcılıkta Çalıştın Ve, Bug/Hata Düzeltiğin İçin ${amount}D Para Kazandın!`)
        .setColor("RANDOM")
        
    
        message.channel.send(embed)
        db.add(`money_${message.author.id}`, amount)
    }






    // simple work command
    /*
    let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number.
    let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}, it payed off!`, message.author.displayAvatarURL) 
    .setDescription(`${message.author}, you've worked and earned ${amount}$ !`)
    .setColor("RANDOM")
    
    message.channel.send(embed)
    db.add(`money_${message.author.id}`, amount)
    */


}
}