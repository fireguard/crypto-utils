const crypto = require('crypto');
const bcrypt = require('bcrypt');

const defaultWishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';

const genSalt = (salts = 10) => {
  const salt = bcrypt.genSaltSync(salts);
  return salt;
};

const genHash = (userPassword, salt) => {
  return bcrypt.hashSync(userPassword, salt);
};

const genPassword = (length = 16, wishlist = defaultWishlist) => {
  return Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('');
};

const comparePassword = (passwordCandidate, passwordHash) => {
  return bcrypt.compareSync(passwordCandidate, passwordHash);
}

module.exports = {
  genSalt,
  genHash,
  genPassword,
  comparePassword,
}