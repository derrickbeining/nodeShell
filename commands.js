
const fs = require('fs');
const request = require('request');
// const out = process.stdout;

module.exports = {
  cat: function(stdin, file, done, pipedCmdList){
    fs.readFile(file, function(err, data){
      if (err) { throw console.error(err) }
      else {
        done(data.toString(), pipedCmdList);
      }
    });
  },

  curl: function(stdin, url, done, pipedCmdList){
    request(url, function (err, response, body) {
      if (err) { throw console.error(err) }
      else { done(body, pipedCmdList) }
    });
  },

  date: function(stdin, file, done, pipedCmdList) {
    done(new Date().toString(), pipedCmdList);
  },

  echo: function(stdin, args, done, pipedCmdList) {
    Array.isArray(args) ? args : args = args.split();
    const argsv = args.map(function(el) {
      if (el[0] === '$') {
        return process.env[el.slice(1).toUpperCase()];
      } else {
        return el;
      }
    });
    done(argsv.join(' '), pipedCmdList);
  },

  grep: function(stdin, args, done, pipedCmdList) {
    const matchStr = Array.isArray(args) ? args[0] : args;
    const fileName = args[1] ? args[1] : null;
    function grepper(text) {
      return text.split('\n')
              .filter( el => el.toLowerCase().search(matchStr) >= 0 )
              .join('\n');
    }
    if (stdin) {
      done(grepper(stdin), pipedCmdList);
    } else {
      fs.readFile(fileName, function(err, data) {
        if (err) {
          done(err);
        } else {
          done(grepper(data.toString()), pipedCmdList);
        }
      });
    }
  },

  head: function(stdin, file, done, pipedCmdList){
    if (stdin) {
      done(stdin.split('\n').slice(0, 2).join('\n'), pipedCmdList);
    } else {
      fs.readFile(file, function(err, data){
        if (err) {
          throw console.error(err)
        } else {
          done(data.toString().split('\n').slice(0, 2).join('\n'), pipedCmdList);
        }
      });
    }
  },

  ls: function(stdin, path, done, pipedCmdList) {
    path = path || '.';
    fs.readdir(path, function(err, files) {
      if (err) { throw console.error(err); }
      else {
        const output = files.reduce(function(accum, file) {
          return accum + file.toString() + '\n';
        }, '');
        done(output, pipedCmdList);
      }
    });
  },

  pwd: function(stdin, file, done, pipedCmdList) {
    done(process.cwd(), pipedCmdList);
  },

  tail: function(stdin, file, done, pipedCmdList){
    if (stdin) {
      done(stdin.toString().trim().split('\n').slice(-2).join('\n'), pipedCmdList)
    } else {
      fs.readFile(file, function(err, data){
        if (err) { throw console.error(err) }
        else {
          done(data.toString().trim().split('\n').slice(-2).join('\n'), pipedCmdList);
        }
      });
    }

  }
}

