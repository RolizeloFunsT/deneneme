const db = require("quick.db");

module.exports = (client) => {

  client.writeSettings = (id, newSettings) => {
    
    try {
    
     if (client.guilds.get(id)) {
        client.guilds.get(id).commandPrefix = newSettings['onek']
      }
      
    } catch (err) {
      //console.error(err)
    };
        };

  String.prototype.toProperCase = function() {
    return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };    

  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  client.wait = require("util").promisify(setTimeout);

  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);

    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
  });
};