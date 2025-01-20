const fs = require('fs');

const readline = require('readline');

const fileName = 'output.txt';

const filePath = `${__dirname}/${fileName}`;

fs.open(filePath, 'w', (err, fd) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  fs.close(fd, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter your text: ',
});

rl.prompt();

rl.on('line', (input) => {
  if (input.trim() === 'exit') {
    console.log('Bye!');
    process.exit(0);
  }
  fs.appendFile(filePath, input + '\n', (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
  rl.prompt();
});

rl.on('close', () => {
  console.log('Have a nice day!');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Goodbye!');
  process.exit(0);
});
