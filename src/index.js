const { Command } = require('commander');
const { genPassword, genSalt, genHash } = require('./password');

const program = new Command();
program.version('0.0.1', '-v, --version', 'output the current version');

const defaultPasswordLength = 16;

const parseInteger = (value, dummyPrevious) => {
  return parseInt(value, 10);
} 

program.command('pass [length]')
  .option('-s, --salts [length]', 'Define number of salts  (Default: 10)', parseInteger, 10)
  .option('-n, --number [length]', 'Define number repeat operation  (Default: 1)', parseInteger, 1)
  .option('-r, --recovery', 'Print hash for recovery password')
  .action((length = defaultPasswordLength, cmd = {}) => {
    const repeats = cmd.number || 1;
    for (let i = 0; i < repeats; i++) {
      const pass = genPassword(length);
      console.info(`Password ${i + 1}: ${pass}`);

      if (cmd.recovery) {
        const salt = genSalt(cmd.salts || 10);
        const hash = genHash(pass, salt);
        console.info(`Salt: ${salt}`);
        console.info(`Hash: ${hash}`);
      }
      if (repeats > 1) {
        console.info('---------------------------');
      }
    }
  });


program.parse(process.argv);