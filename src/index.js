#! /usr/bin/env node
const { Command } = require('commander');
const { genPassword, genSalt, genHash } = require('./password');
const { genToken, isValidToken } = require('./token');
const { checkTOtpCode, genTOtpCode, checkAuthenticatorCode, genAuthenticatorCode, genAuthenticatorSecret } = require('./otp');

const program = new Command();
program.version('1.0.1', '-v, --version', 'output the current version');

const defaultPasswordLength = 16;
const defaultSecretOtpBytes = 16;

const parseInteger = (value, _) => {
  return parseInt(value, 10);
};

program.command('pass [length] ')
  .option('-n, --numbers <length>', 'Define min numbers character (Default: 1)', parseInteger, 1)
  .option('-s, --symbols <length>', 'Define min symbols character (Default: 1)', parseInteger, 1)
  .option('-l, --lowers <length>', 'Define min lowercase character (Default: 1)', parseInteger, 1)
  .option('-u, --uppers <length>', 'Define min uppercase character (Default: 1)', parseInteger, 1)
  .option('-r, --repeats <repeats>', 'Define number repeat operation (Default: 1)', parseInteger, 1)
  .option('--salts [length]', 'Define number of salts (Default: 10)', parseInteger, 10)
  .option('--recovery', 'Generate bcrypt salt and hash')
  .action((length = defaultPasswordLength, cmd = {}) => {
    const repeats = cmd.repeats || 1;
    const criterias = {
      n: cmd.numbers || 1,
      s: cmd.symbols || 1,
      u: cmd.uppers || 1,
      l: cmd.lowers || 1,
    };

    for (let i = 0; i < repeats; i++) {
      const pass = genPassword(length, criterias);
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

program.command('token [args]')
  .option('-t, --token <token>', 'Validate deterministic token')
  .option('-a, --algorithm <algorithm>', 'Set algorithm used for gen token (Default: sha-256)', 'sha256')
  .action((firstParam, cmd, othersParams = []) => {
    if (!firstParam) {
      throw new Error('Invalid required param');
    }
    const args = [firstParam, ...othersParams];
    if (cmd.token) {
      const algorithm = cmd.algorithm || 'sha256';
      const result = isValidToken(cmd.token, args, algorithm);
      console.info(`Result: ${result ? 'VALID' : 'INVALID'}`);
      return;
    }

    const algorithm = cmd.algorithm || 'sha256';
    const token = genToken(args, algorithm);
    console.info(`Token: ${token}`);
  });

program.command('authenticator [secret]')
  .option('-b, --bytes <bytes>', `Set secret number of bytes (Default: ${defaultSecretOtpBytes})`, parseInteger, defaultSecretOtpBytes)
  .option('-c, --check <code>', 'Check is valid Code')
  .option('-d, --digits <digits>', 'Number of digits for generate authenticator code (Default: 6)', parseInteger, 6)
  .action((secret, cmd) => {
    if (!secret) {
      const bytes = cmd.bytes || defaultSecretOtpBytes;
      const secret = genAuthenticatorSecret(bytes);
      console.info(`Secret: ${secret}`);
      return;
    }
    const digits = cmd.digits || 6;
    const options = { digits };

    if (cmd.check) {
      const result = checkAuthenticatorCode(secret, cmd.check, options);
      console.info(`Result: ${result ? 'VALID' : 'INVALID'}`);
      return;
    }

    const code = genAuthenticatorCode(secret, options);
    console.info(`Code: ${code}`);
  });

program.command('totp <secret>')
  .option('-c, --check <code>', 'Check is valid Code')
  .option('-d, --digits <digits>', 'Number of digits for generate totp code (Default: 6)', parseInteger, 6)
  .action((secret, cmd) => {
    if (!secret) {
      throw new Error('Invalid required param');
    }
    const digits = cmd.digits || 6;
    const options = { digits };

    if (cmd.check) {
      const result = checkTOtpCode(secret, cmd.check, options);
      console.info(`Result: ${result ? 'VALID' : 'INVALID'}`);
      return;
    }

    const code = genTOtpCode(secret, options);
    console.info(`Code: ${code}`);
  });

program.parse(process.argv);
