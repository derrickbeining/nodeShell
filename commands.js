
const fs = require('fs');
const request = require('request');
const out = process.stdout;

module.exports = {
  cat: function(file){
    fs.readFile(file[0].trim(), function(err, data){
      if(err) throw err
      else {out.write(data.toString());
        out.write("\nprompt > ")
      }
    });
  },

  curl: function(url){
    request(url[0].trim(), function (error, response, body) {
      if(error) throw error;
      out.write(body);
      out.write("\nprompt > ");
});

  },

  date: function() {
   out.write(new Date().toString());
   out.write('\nprompt > ')
  },

  echo: function(args) {
    const argsv = args.map(function(el) {
      if (el[0] === "$") {
        const envVar = el.slice(1).toUpperCase();
        console.log('process.env: ', process.env['PATH'])
        return process.env[envVar];
      } else {
        return el;
      }
    });
    out.write(argsv.join(' '));
    out.write('\nprompt >');
  },

  head: function(file){
    fs.readFile(file[0].trim(), function(err, data){
      if(err) throw err
      else {
        const doc = data.toString().split("\n").slice(0,5).join("\n");
        out.write(doc);
        out.write("\nprompt > ")
      }
    });
  },

  ls: function() {
    fs.readdir('.', function(err, files) {
      if (err) throw console.error('Error: check yo self');
      files.forEach(function(file) {
        out.write(file.toString() + "\n");
      });
      out.write('\nprompt >');
    });
  },

  pwd: function () {
    out.write(process.cwd());
    out.write('\nprompt > ');
  },

  tail: function(file){
        fs.readFile(file[0].trim(), function(err, data){
      if(err) throw err
      else {
        const doc = data.toString().split("\n").slice(-6).join("\n");
        out.write(doc);
        out.write("\nprompt > ")
      }
    });

  },


}

