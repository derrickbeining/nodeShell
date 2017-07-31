
const fs = require('fs');
const out = process.stdout;

module.exports = {

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


}

