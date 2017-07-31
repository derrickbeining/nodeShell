const commands = require('./commands.js');
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  data = data.toString().split(' ');
  var cmd = data[0].toString().trim();
  const args = data.slice(1);
  commands[cmd](args);
});
