const crypto = require('crypto');

const genToken = (args, algorithm) => {
  const value = args.reduce((acc, arg) => acc + ((typeof arg === 'string') ? arg : arg.toString()), '');
  if (value === '') {
    throw new Error('Invalid Params');
  }

  const hash = crypto.createHmac(algorithm, value);
  return Buffer.from(hash.digest('hex')).toString('base64');
};

const isValidToken = (token, args, algorithm) => {
  const decodedToken = Buffer.from(token, 'base64').toString('utf8');

  const correctToken = genToken(args, algorithm);
  const decodedCorrectToken = Buffer.from(correctToken, 'base64').toString('utf8');
  return decodedToken === decodedCorrectToken;
};

module.exports = {
  genToken,
  isValidToken,
};
