const url = require("url");
const db = require('quick.db');
const path = require("path");
const { stripIndents, oneLine } = require('common-tags');
const Discord = require("discord.js");
const commando = require('discord.js-commando');
const express = require("express");
const app = express();
const moment = require("moment");
require("moment-duration-format");

const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;

const helmet = require("helmet");

const md = require("marked");

module.exports = (client) => {

  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);

  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);
  
  app.use("/public", express.static(path.resolve(`${dataDir}${path.sep}public`)));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new Strategy({
    clientID: client.user.id,
    clientSecret: client.config.dashboard.oauthSecret,
    callbackURL: client.config.dashboard.callbackURL,
    scope: ["identify", "guilds"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  app.use(session({
    secret: client.config.dashboard.sessionSecret,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());

  app.locals.domain = client.config.dashboard.domain;
  
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  var bodyParser = require("body-parser");
  app.use(bodyParser.json());       
  app.use(bodyParser.urlencoded({   
    extended: true
  })); 

  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/giris");
  }

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      Discord: Discord,
      stripIndents: stripIndents,
      oneLine: oneLine,
      path: req.path,
      db: db,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
    
  };

  app.get("/giris", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), (req, res) => {
    if (req.user.id === client.config.ownerID) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
     //client.channels.get("557775875542614017").send(`**${client.users.get(req.user.id).tag}** adlı kullanıcı Web Paneline Discord hesabıyla giriş yaptı!`)
  });

  app.get("/autherror", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
    
    //client.channels.get("557775875542614017").send("Web Panelinde bağlantı hatası oluştu! Kişi giriş yapamıyor tekrar denemeli! Büyük bir sorun değil.")
  });

  app.get("/cikis", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
    
  });

  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
    
  });

  app.get("/commands", (req, res) => {
    renderTemplate(res, req, "commands.ejs", {md});
  });
  
  app.get("/istatistikler", (req, res) => {
    const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
    const members = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    const channels = client.channels.size;
    const guilds = client.guilds.size;
    renderTemplate(res, req, "istatistikler.ejs", {
      stats: {
        version: '2.0.5',
        servers: guilds,
        members: members,
        channels: channels,
        uptime: duration,
        memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        dVersion: Discord.version,
        nVersion: process.version,
        dcVersion: commando.version
      }
    });
  });

  
  app.get("/panel", checkAuth, (req, res) => {
    const perms = Discord.EvaluatedPermissions;
    renderTemplate(res, req, "panel.ejs", {perms});
  });
  
  app.get("/admin", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/");
    renderTemplate(res, req, "admin.ejs");
  });
  
     app.get("/jscolor ", (req, res) => {
    renderTemplate(res, req, "jscolor.js");
  });
    
  app.get("/kullanicilar/:userID/profil", checkAuth, (req, res) => {
    const user = client.users.get(req.params.userID);
    renderTemplate(res, req, "kullanicilar/profil.ejs", {user});
  });

    app.get("/kullanicilar/:userID/seviyekartiniayarla", checkAuth, (req, res) => {
    const user = client.users.get(req.params.userID);
    if (!user) return res.status(404);
    renderTemplate(res, req, "kullanicilar/seviyekartiniayarla.ejs", {user});
  });

  
    app.post("/kullanicilar/:userID/seviyekartiniayarla", checkAuth, (req, res) => {
    const user = req.params.userID
    if (!user) return res.status(404);
    client.writeSettings(user.id, req.body);
      
       if(req.body['renk']) {
         db.set(`${user}.renk`, req.body['renk'])
       }  
      
             if(req.body['renk']) {
         db.set(`${user}.saydam`, req.body['saydam'])
       }  
      
             if(req.body['resim']) {
         db.set(`${user}.resim`, req.body['resim'])
             }
 res.redirect("/kullanicilar/"+req.params.userID+"/seviyekartiniayarla");
  });
  
      app.get("/kullanicilar/:userID/seviyekartiniayarla/renk/sifirla", checkAuth, async (req, res) => {
   const user = req.params.userID
    if (!user) return res.status(404);
    db.delete(`${user}.renk`)
    res.redirect("/kullanicilar/"+req.params.userID+"/seviyekartiniayarla");
  });
  
        app.get("/kullanicilar/:userID/seviyekartiniayarla/resim/sifirla", checkAuth, async (req, res) => {
   const user = req.params.userID
    if (!user) return res.status(404);
      if(!db.has(`${user}.resim`)) {
        res.json({
          hata: 'Seviye resmi sıfırlanamadı çünkü ayarlı bir resim yok.'
        })
      }
      db.delete(`${user}.resim`)
      
    res.redirect("/kullanicilar/"+req.params.userID+"/seviyekartiniayarla");
  });
  
        app.get("/kullanicilar/:userID/seviyekartiniayarla/saydam/sifirla", checkAuth, async (req, res) => {
   const user = req.params.userID
    if (!user) return res.status(404);
    db.delete(`${user}.saydam`)
    res.redirect("/kullanicilar/"+req.params.userID+"/seviyekartiniayarla");
  });
  
  app.get("/panel/:guildID", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    renderTemplate(res, req, "guild/guild.ejs", {guild});
  });


  app.get("/panel/:guildID/ayarlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/ayarlar.ejs", {guild});
  });


  app.post("/panel/:guildID/ayarlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
    guild.commandPrefix = req.body['prefix']
 
 if(req.body['hosGeldin']) {
  let hosgeldinkanal = guild.channels.find('name',req.body['hosGeldin']).id
	client.provider.set(guild.id, 'hosGeldin', hosgeldinkanal);
	client.provider.set(guild.id, 'hosGeldinK', true);
  }
  
  if(req.body['modLog']) {
  let modlogkanal = guild.channels.find('name',req.body['modLog']).id
	client.provider.set(guild.id, 'modLog', modlogkanal);
	client.provider.set(guild.id, 'modLogK', true);
  }
  
  if(req.body['duyurukanal']) {
  let duyurukanalayar = guild.channels.find('name',req.body['duyurukanal']).id
  guild.settings.set('duyurukanal', duyurukanalayar , true);
  client.provider.set(guild.id, 'duyurukanal', duyurukanalayar);
	client.provider.set(guild.id, 'duyurukanalK', true);
        }
  
  if(req.body['logsChannel']) {
    let logkanal = guild.channels.find('name',req.body['logsChannel']).id
	client.provider.set(guild.id, 'logsChannel', logkanal);
	client.provider.set(guild.id, 'logsEnable', true);
  }
  
  if(req.body['davetKanal']) {
    let davettakip = guild.channels.find('name',req.body['davetKanal']).id
	client.provider.set(guild.id, 'davetKanal', davettakip);
	client.provider.set(guild.id, 'davetKanalK', true);
  }
  
  if(req.body['girisRol']) {
	let otorolayar = guild.roles.find('name',req.body['girisRol']).id
    client.provider.set(guild.id, 'girisRol', otorolayar);
	client.provider.set(guild.id, 'girisRolK', true);
	}
    
   if(req.body['saas']) {
      client.provider.set(guild.id, 'saas', true);
    }else{
    client.provider.set(guild.id, 'saas', false);
    }
    
    
        if(req.body['küfürEngelle']) {
      client.provider.set(guild.id, 'küfürEngelle', true);
    }else{
    client.provider.set(guild.id, 'küfürEngelle', false);
    }
    
        if(req.body['linkEngel']) {
      client.provider.set(guild.id, 'linkEngel', true);
    }else{
    client.provider.set(guild.id, 'linkEngel', false);
    }
    
        if(req.body['mentionEngel']) {
      client.provider.set(guild.id, 'mentionEngel', true);
    }else{
    client.provider.set(guild.id, 'mentionEngel', false);
    }
    
        if(req.body['reklamEngel']) {
      client.provider.set(guild.id, 'reklamEngel', true);
    }else{
    client.provider.set(guild.id, 'reklamEngel', false);
    }
	
 res.redirect("/panel/"+req.params.guildID+"/ayarlar");
  });
  
   app.get("/panel/:guildID", checkAuth, (req, res) => {
    res.redirect(`/panel/${req.params.guildID}/girismesaj`);
  });


  app.get("/panel/:guildID/girismesaj", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/girismesaj.ejs", {guild});
  });


  app.post("/panel/:guildID/girismesaj", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);

  let girismesajkanal = guild.channels.find('name',req.body['girişKanal']).id
   guild.settings.set('girişKanal', girismesajkanal);
  client.provider.set(guild.id, 'girişKanal', girismesajkanal);
	client.provider.set(guild.id, 'girişKanalK', true);

  
  client.provider.set(guild.id, 'girisMesaj', req.body['girisMesaj']);
	client.provider.set(guild.id, 'girisMesajK', true);

    
 res.redirect("/panel/"+req.params.guildID+"/girismesaj");
  });
  
  app.get("/panel/:guildID", checkAuth, (req, res) => {
    res.redirect(`/panel/${req.params.guildID}/cikismesaj`);
  });


  app.get("/panel/:guildID/cikismesaj", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/cikismesaj.ejs", {guild});
  });


  app.post("/panel/:guildID/cikismesaj", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);

  let cikismesajkanal = guild.channels.find('name',req.body['çıkışKanal']).id
  guild.settings.set('çıkışKanal', cikismesajkanal);
  client.provider.set(guild.id, 'çıkışKanal', cikismesajkanal);
	client.provider.set(guild.id, 'çıkışKanalK', true);

  
  client.provider.set(guild.id, 'cikisMesaj', req.body['cikisMesaj']);
	client.provider.set(guild.id, 'cikisMesajK', true);

    
 res.redirect("/panel/"+req.params.guildID+"/cikismesaj");
  });
  
  app.get("/panel/:guildID", checkAuth, (req, res) => {
    res.redirect(`/panel/${req.params.guildID}/sayac`);
  });


  app.get("/panel/:guildID/sayac", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/sayac.ejs", {guild});
  });


  app.post("/panel/:guildID/sayac", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);

  let sayackanal = guild.channels.find('name',req.body['sayaçkanal']).id
  client.provider.set(guild.id, 'sayaçkanal', sayackanal);
  client.provider.set(guild.id, 'sayaçkanalK', true);
  guild.settings.set('sayaçkanal', sayackanal);

  
  client.provider.set(guild.id, 'sayac', req.body['sayac']);
  client.provider.set(guild.id, 'sayacK', true);
    
 res.redirect("/panel/"+req.params.guildID+"/sayac");
  });
  
  app.get("/panel/:guildID", checkAuth, (req, res) => {
    res.redirect(`/panel/${req.params.guildID}/cikismesaj`);
  });

  app.get("/panel/:guildID/ozelkomut", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/ozelkomut.ejs", {guild});
  });
  
    app.post("/panel/:guildID/ozelkomut", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);

let komut = req.body['komut'];
    let cevap = req.body['cevap'];
      let obj = {name: komut, desc: cevap}
   if (!db.has(`${guild.id}.ozelkomut`)) {
       db.set(`${guild.id}.ozelkomut`, new Array(obj))
    } else {  
        if (db.fetch(`${guild.id}.ozelkomut`) && db.fetch(`${guild.id}.ozelkomut`).map(k => k.name).includes(komut) === true) {
      return;
        } else {
      db.push(`${guild.id}.ozelkomut`, obj)
      
    }  
    }
    
 res.redirect("/panel/"+req.params.guildID+"/ozelkomut");
  });
  
   app.get("/panel/:guildID/ozelkomut/sil/:komutadi", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    var ad = req.params.komutadi
       if (db.has(`${guild.id}.ozelkomut`) && db.fetch(`${guild.id}.ozelkomut`).map(k => k.name === ad)) {
      if (db.fetch(`${guild.id}.ozelkomut`).length === true) {
        db.delete(`${guild.id}.ozelkomut`)
      } else {
          let arr = []
      db.fetch(`${guild.id}.ozelkomut`).forEach(c => {
        if (c.name !== ad) {
          arr.push(c)
      db.set(`${guild.id}.ozelkomut`, arr)
        }
      })
      }
    } 
    res.redirect("/panel/"+req.params.guildID+"/ozelkomut");
  });
  

  app.get("/panel/:guildID/premiumayarlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/premiumayarlar.ejs", {guild});
  });

  app.post("/panel/:guildID/premiumayarlar", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
  
  if(req.body['botgirisRol']) {
	let otorolayar = guild.roles.find('name',req.body['botgirisRol']).id
    client.provider.set(guild.id, 'botgirisRol', otorolayar);
	client.provider.set(guild.id, 'botgirisRolK', true);
	}
    
   if(req.body['sunucupanel']) {
     		const vt = client.provider.get(guild.id, 'sunucuPanel', []);
				client.provider.set(guild.id, 'sunucuPanel', true);
      var sunucupanel = guild.createChannel("» Sunucu Panel", "category").then(sp => {
	var toplamkullanıcı =  guild.createChannel(`Toplam Kullanıcı Sayısı: ${guild.memberCount}`, "voice").then(ss => {
        ss.setParent(sp)
     				this.client.provider.set(guild.id, 'toplamKullanici', ss.id);
                   let role = guild.roles.find(a => a.name ===  "@everyone");
        ss.overwritePermissions(role, {
            CONNECT: false,
        });
})
var toplamkişi =  guild.createChannel(`Toplam Kişi Sayısı: ${guild.members.filter(m => !m.user.bot).size}`, "voice").then(ss => {
	ss.setParent(sp)
				 this.client.provider.set(guild.id, 'toplamKişi', ss.id);
			   let role = guild.roles.find(a => a.name ===  "@everyone");
	ss.overwritePermissions(role, {
		CONNECT: false,
	});
})
var toplambot =  guild.createChannel(`Toplam Bot Sayısı: ${guild.members.filter(m => m.user.bot).size}`, "voice").then(ss => {
	ss.setParent(sp)
				 this.client.provider.set(guild.id, 'toplamBot', ss.id);
			   let role = guild.roles.find(a => a.name ===  "@everyone");
	ss.overwritePermissions(role, {
		CONNECT: false,
	});
})
var banlı = guild.fetchBans().then(bans => guild.createChannel(`Toplam Banlı Sayısı: ${bans.size}`, "voice")).then(ss => {
	ss.setParent(sp)
				 this.client.provider.set(guild.id, 'toplamBanli', ss.id);
			   let role = guild.roles.find(a => a.name ===  "@everyone");
	ss.overwritePermissions(role, {
		CONNECT: false,
	});
})
  })
    }else{
    client.provider.set(guild.id, 'sunucuPanel', false);
    }
    	
 res.redirect("/panel/"+req.params.guildID+"/premiumayarlar");
  });
  
  app.get("/panel/:guildID/ozeltag", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/ozeltag.ejs", {guild});
  });
  
  app.post("/panel/:guildID/ozeltag", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);

  let sayackanal = guild.channels.find('name',req.body['ozeltagKanal']).id
  client.provider.set(guild.id, 'ozeltagKanal', sayackanal);
  client.provider.set(guild.id, 'ozeltagKanalK', true);
  guild.settings.set('ozeltagKanal', sayackanal);

  
  client.provider.set(guild.id, 'tag', req.body['tag']);
  client.provider.set(guild.id, 'tagK', true);
    
 res.redirect("/panel/"+req.params.guildID+"/ozeltag");
  });
  
   app.get("/panel/:guildID", checkAuth, (req, res) => {
    res.redirect(`/panel/${req.params.guildID}/girismesaj`);
  });


  app.get("/panel/:guildID/uyeler", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    renderTemplate(res, req, "guild/uyeler.ejs", {
      guild: guild,
      members: guild.members.array()
    });
  });

  // This JSON endpoint retrieves a partial list of members. This list can
  // be filtered, sorted, and limited to a partial count (for pagination).
  // NOTE: This is the most complex endpoint simply because of this filtering
  // otherwise it would be on the client side and that would be horribly slow.
  app.get("/panel/:guildID/uyeler/list", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    if (req.query.fetch) {
      await guild.fetchMembers();
    }
    const totals = guild.members.size;
    const start = parseInt(req.query.start, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 50;
    let members = guild.members;
    
    if (req.query.filter && req.query.filter !== "null") {
    
      members = members.filter(m=> {
        m = req.query.filterUser ? m.user : m;
        return m["displayName"].toLowerCase().includes(req.query.filter.toLowerCase());
      });
    }
    
    if (req.query.sortby) {
      members = members.sort((a, b) => a[req.query.sortby] > b[req.query.sortby]);
    }
    const memberArray = members.array().slice(start, start+limit);
    
    const returnObject = [];
    for (let i = 0; i < memberArray.length; i++) {
      const m = memberArray[i];
      returnObject.push({
        id: m.id,
        status: m.user.presence.status,
        bot: m.user.bot,
        username: m.user.username,
        displayName: m.displayName,
        tag: m.user.tag,
        discriminator: m.user.discriminator,
        joinedAt: m.joinedTimestamp,
        createdAt: m.user.createdTimestamp,
        highestRole: {
          hexColor: m.highestRole.hexColor
        },
        memberFor: moment.duration(Date.now() - m.joinedAt).format(" D [gün], H [saat], m [dakika], s [saniye]"),
        roles: m.roles.map(r=>({
          name: r.name,
          id: r.id,
          hexColor: r.hexColor
        }))
      });
    }
    res.json({
      total: totals,
      page: (start/limit)+1,
      pageof: Math.ceil(members.size / limit),
      members: returnObject
    });
  });

  app.get("/panel/:guildID/istatistikler", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/istatistikler.ejs", {guild});
  });
  
  app.get("/panel/:guildID/leave", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    await guild.leave();
    res.redirect("/panel");
  });
  
  /* OKU!
  ayar silme kısmı bot.js de client.ayar ı db olarak tanımlamıştık yani quick.db burada db.delete kullandıgımızı varsayın 
  kendi ayarlarınızıda ekleyin*/
  app.get("/panel/:guildID/reset", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    
    if(guild) { 
      guild.commandPrefix = client.commandPrefix
    }
				client.provider.set(guild.id, 'logsChannel', false);
				client.provider.set(guild.id, 'logsEnable', false);
				guild.settings.set('logsChannel', false);
				guild.settings.set('logsEnable', false);
				
				client.provider.set(guild.id, 'modLog', false);
				client.provider.set(guild.id, 'modLogK', false);
				guild.settings.set('modLog', false);
				guild.settings.set('modLogK', false);
				
				client.provider.set(guild.id, 'hosGeldin', false);
				client.provider.set(guild.id, 'hosGeldinK', false);
				guild.settings.set('hosGeldin', false);
				guild.settings.set('hosGeldinK', false);
				
				client.provider.set(guild.id, 'davetKanal', false);
				client.provider.set(guild.id, 'davetKanalK', false);
				guild.settings.set('davetKanal', false);
				guild.settings.set('davetKanalK', false);
				
				
				guild.settings.set('duyurukanal', false);
                guild.settings.set('duyurukanalK' , false);     
				client.provider.set(guild.id, 'duyurukanal', false);
				client.provider.set(guild.id, 'duyurukanalK', false);
    
				client.provider.set(guild.id, 'girisRol', false);
				client.provider.set(guild.id, 'girisRolK', false);
    
        client.provider.set(guild.id, 'saas', false);
        
        client.provider.set(guild.id, 'küfürEngelle', false);
    
        client.provider.set(guild.id, 'linkEngel', false);
    
        client.provider.set(guild.id, 'mentionEngel', false);
    
        client.provider.set(guild.id, 'reklamEngel', false);
    
    res.redirect("/panel/"+req.params.guildID);
  });
  
  app.get("/panel/:guildID/girismesajreset", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
        
  guild.settings.set('girişKanal', false);
  client.provider.set(guild.id, 'girişKanal' , false);
	client.provider.set(guild.id, 'girişKanalK', false);
  
  client.provider.set(guild.id, 'girisMesaj',false);
	client.provider.set(guild.id, 'girisMesajK', false);
    
    res.redirect("/panel/"+req.params.guildID+"/girismesaj");
  });
  
    app.get("/panel/:guildID/sayacreset", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
        
  guild.settings.set('sayaçkanal', false);
  client.provider.set(guild.id, 'sayaçkanal' , false);
  client.provider.set(guild.id, 'sayaçkanalK' , false);
      
  client.provider.set(guild.id, 'sayac',false);
  client.provider.set(guild.id, 'sayacK',false);
    
    res.redirect("/panel/"+req.params.guildID+"/sayac");
  });
  
    app.get("/panel/:guildID/resettt", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
        
  guild.settings.set('çıkışKanal', false);
  client.provider.set(guild.id, 'çıkışKanal' , false);
	client.provider.set(guild.id, 'çıkışKanalK', false);
  
  client.provider.set(guild.id, 'cikisMesaj',false);
	client.provider.set(guild.id, 'cikisMesajK', false);
    
    res.redirect("/panel/"+req.params.guildID+"/cikismesaj");
  });
  
      app.get("/panel/:guildID/ozeltagreset", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
        
  guild.settings.set('ozeltagKanal', false);
  client.provider.set(guild.id, 'ozeltagKanal' , false);
  client.provider.set(guild.id, 'ozeltagKanalK' , false);
      
  client.provider.set(guild.id, 'tag',false);
  client.provider.set(guild.id, 'tagK',false);
    
    res.redirect("/panel/"+req.params.guildID+"/ozeltag");
  });
  
  client.site = app.listen(process.env.PORT);
  
};