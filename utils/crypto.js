'use strict'
const crypto = require('crypto');

const encrypt = (text,password,algorithmOpt) => {
  const algorithm = (algorithmOpt)?algorithmOpt:'aes-192-cbc';
  const iv = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, 'salt', 24); //create key
  const cipher = crypto.createCipheriv(algorithm, key, iv); 
  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  return {encrypted,iv};
}

const decrypt = (text,password,iv,algorithmOpt) => {
  const algorithm = (algorithmOpt)?algorithmOpt:'aes-192-cbc';
  const key = crypto.scryptSync(password, 'salt', 24); //create key
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
  return decrypted;
}

// let password = 'passwordman';
// let text = 'I love kittens';
// let {encrypted,iv} = CryptoUtil.encrypt(text,password);
// let decrypted = CryptoUtil.decrypt(encrypted,password,iv);

module.exports = {
  encrypt,
  decrypt,
}