
const fs = require('fs');
const out = process.stdout;

module.exports = {

  date: function() {
   out.write(new Date().toString());
   out.write('\nprompt > ')
  },

  ls: function() {
    fs.readdir('.', function(err, files) {
      if (err) throw console.error('Error: check yo self');
      files.forEach(function(file) {
        out.write(file.toString() + "\n");
      });
      out.write('prompt >');
    });
  },

  pwd: function () {
    out.write(process.cwd());
    out.write('\nprompt > ');
  },


}

