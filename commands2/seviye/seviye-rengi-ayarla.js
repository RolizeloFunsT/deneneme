const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');
const snekfetch = require("snekfetch");
const { Command } = require('discord.js-commando');


module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'seviye-rengi-ayarla',
            aliases: ['seviyerenk','seviyerengiayarla','levelcolor','seviyerenkayarla'],
            group: 'seviye',
            memberName: 'seviye-rengi-ayarla',
            description: 'Rank rengini değiştirir.',
            example : 'seviye-renk renkkodu',
          			args: [
				{
					key: 'renk',
					prompt: 'Bir renk kodu girin. (# olmadan yazın)',
					type: 'string'
				}
			]
        });
      
    }

async run(msg, args) {
                              if(args.renk.startsWith('#')) {
                        const embed = new Discord.RichEmbed()
                                .setDescription("Renk kodu başına # eklemeden yazın.")
                                .setColor("RANDOM")
                        msg.channel.send({embed})
                        return
                }
  
     db.set(`${msg.author.id}.renk`, args.renk)
    
    var Canvas = require('canvas')
                var canvas = Canvas.createCanvas(150, 150)
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = `#${args.renk}`;
                ctx.fill()
                ctx.fillRect(0, 0, 150, 150)
                const embed = new Discord.RichEmbed()
                        .setAuthor("Ayarlanan Renk: #{renk}".replace("{renk}", args.renk.toUpperCase()))
                        .setImage(`attachment://renk.png`)
                        .setColor("RANDOM")
                msg.channel.send({embed, files:[{attachment:canvas.toBuffer(),name:"renk.png"}]})
                return
        
        
  
};
}