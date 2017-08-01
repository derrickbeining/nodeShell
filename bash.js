const commands = require('./commands.js');
const stdout = process.stdout;
const stdin = process.stdin;

// const exec = function(prevOutput, cmd, args, handleDone, cmdList) {

// }

const handleDone = function(output, pipedCmdList) {
  if (pipedCmdList.length) {
    let cmdTokens = pipedCmdList.shift().split(' ');
      let cmd = cmdTokens[0];
      let args = cmdTokens.length > 2 ? cmdTokens.slice(1) : cmdTokens[1];
      if (commands[cmd]) {
        commands[cmd](output, args, handleDone, pipedCmdList);
      } else {
        handleDone('Error: No such command. Try again.')
      }
  } else {
    stdout.write(output);
    stdout.write('\nprompt >');
  }
}

stdout.write('prompt > ');

stdin.on('data', function (data) {
  const cmdList = data.toString().trim().split(/\s*\|\s*/g);
  let cmdTokens = cmdList.shift().split(' ');
  let cmd = cmdTokens[0];
  let args = cmdTokens.length > 2 ? cmdTokens.slice(1) : cmdTokens[1];
  if (commands[cmd]) {
    commands[cmd](null, args, handleDone, cmdList);
  } else {
    handleDone('Error: No such command. Try again.')
  }
  // var cmd = data[0].toString().trim();
  // const args = data.length > 2 ? data.slice(1) : data[1];
  // if (commands[cmd]) {
  //   commands[cmd](args, done);
  // } else {
  //   done('Error: No such command. Try again.')
  // }
});
