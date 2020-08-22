const crypto = require('crypto');
const bcrypt = require('bcrypt');

const numberWishlist = '0123456789';
const uppercaseWishlist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseWishlist = 'abcdefghijklmnopqrstuvwxyz';
const specialWishlist = '!@+%#$&*?';
const defaultWishlist = `${numberWishlist}${uppercaseWishlist}${lowercaseWishlist}${specialWishlist}`;

const genSalt = (salts = 10) => {
  const salt = bcrypt.genSaltSync(salts);
  return salt;
};

const genHash = (userPassword, salt) => {
  return bcrypt.hashSync(userPassword, salt);
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const genPassword = (length = 16, criterias = { n: 1, u: 1, l: 1, s: 1 }) => {
  const minNumbers = criterias.n >= 0 ? parseInt(criterias.n, 10) : 1;
  const minUpper = criterias.u >= 0 ? parseInt(criterias.u, 10) : 1;
  const minLower = criterias.l >= 0 ? parseInt(criterias.l, 10) : 1;
  const minSpecial = criterias.s >= 0 ? parseInt(criterias.s, 10) : 1;
  const totalFixed = minNumbers + minUpper + minLower + minSpecial;

  const rand = crypto.randomFillSync;
  const numbers = Array.from(rand(new Uint32Array(minNumbers))).map((x) => numberWishlist[x % numberWishlist.length]).join('');
  const upper = Array.from(rand(new Uint32Array(minUpper))).map((x) => uppercaseWishlist[x % uppercaseWishlist.length]).join('');
  const lower = Array.from(rand(new Uint32Array(minUpper))).map((x) => lowercaseWishlist[x % lowercaseWishlist.length]).join('');
  const special = Array.from(rand(new Uint32Array(minSpecial))).map((x) => specialWishlist[x % specialWishlist.length]).join('');

  const residual = genRandomPassword(length - totalFixed);

  return shuffleArray([...numbers, ...upper, ...lower, ...special, ...residual]).join('');
};

const genRandomPassword = (length = 16, wishlist = defaultWishlist) => {
  return Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('');
};

const comparePassword = (passwordCandidate, passwordHash) => {
  return bcrypt.compareSync(passwordCandidate, passwordHash);
};

module.exports = {
  numberWishlist,
  uppercaseWishlist,
  lowercaseWishlist,
  specialWishlist,
  defaultWishlist,
  genSalt,
  genHash,
  genPassword,
  genRandomPassword,
  comparePassword,
};
