const { totp, hotp, authenticator } = require('otplib');

const genAuthenticatorCode = (secret, options = {}) => {
  authenticator.resetOptions();
  authenticator.options = {...authenticator.allOptions(), ...options};
  return authenticator.generate(secret);
}

const genAuthenticatorSecret = (bytes, options = {}) => {
  authenticator.resetOptions();
  authenticator.options = {...authenticator.allOptions(), ...options};
  return authenticator.generateSecret(bytes);
}

const checkAuthenticatorCode = (secret, code, options = {}) => {
  authenticator.resetOptions();
  authenticator.options = {...authenticator.allOptions(), ...options};
  return authenticator.check(code, secret);
}

const genTOtpCode = (secret, options = {}) => {
  totp.resetOptions();
  totp.options = {...totp.allOptions(), ...options};
  return totp.generate(secret);
}

const checkTOtpCode = (secret, code, options = {}) => {
  totp.resetOptions();
  totp.options = {...totp.allOptions(), ...options};
  return totp.check(code, secret);
}

const genHOtpCode = (secret, counter, options = {}) => {
  hotp.resetOptions();
  hotp.options = {...htop.allOptions(), ...options};
  return hotp.generate(secret, counter);
}

const checkHtpCode = (secret, counter, code, options = {}) => {
  hotp.resetOptions();
  hotp.options = {...htop.allOptions(), ...options};
  return hotp.check(code, secret, counter);
}

module.exports = {
  genAuthenticatorCode,
  checkAuthenticatorCode,
  genAuthenticatorSecret,
  genTOtpCode,
  checkTOtpCode,
  genHOtpCode,
  checkHtpCode,
};