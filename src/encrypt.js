const crypto = require('crypto');

const ALGORITHM = 'aes-256-ctr';
const IV_LENGTH = Buffer.alloc(16);
const NONCE_LENGTH = 5;

const encrypt = (text, key) => {
  const nonce = crypto.randomBytes(NONCE_LENGTH);
  nonce.copy(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, IV_LENGTH);
  const encrypted = cipher.update(text.toString());
  const message = Buffer.concat([nonce, encrypted, cipher.final()]);
  return message.toString('base64');
};

const decrypt = (text, key) => {
  const message = Buffer.from(text, 'base64');
  message.copy(IV_LENGTH, 0, 0, NONCE_LENGTH);
  const encryptedText = message.slice(NONCE_LENGTH);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, IV_LENGTH);
  let decrypted = decipher.update(encryptedText);
  try {
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (Err) {
    return null;
  }
};

const generateEncryptKey = () => {
  const salt = 'foobar';
  const hash = crypto.createHash('sha1');

  hash.update(salt);

  return hash.digest().slice(0, 16).toString('hex');
};

module.exports = {
  encrypt,
  decrypt,
  generateEncryptKey,
};
