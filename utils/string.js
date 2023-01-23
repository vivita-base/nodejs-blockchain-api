
const NumberUtil = require('./number');

const isValidEmail = (emailAddress) => {
  if(!emailAddress) return false;

  const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  const sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  const sQuotedPair = '\\x5c[\\x00-\\x7f]';
  const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  const sDomain_ref = sAtom;
  const sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
  const sWord = '(' + sAtom + '|' + sQuotedString + ')';
  const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  const sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  const sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
  const sValidEmail = '^' + sAddrSpec + '$'; // as whole string
  const reValidEmail = new RegExp(sValidEmail);

  return reValidEmail.test(emailAddress);

  // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
}

const generateTokenRange = (min,max) => {
  return generateToken(NumberUtil.getRandomInt(min,max));
}

const generateToken = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < parseInt(length); i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const scientificNotationToNumber = (s) => {
  let b = Number(s).toPrecision()
  if(isNaN(b) || b <= 0) b = 0;
  return parseFloat(b);
}

const stripHtml = (s) => {
  return s.replace(/<[^>]*>?/gm, '');
}

const atob = (b64Encoded) => {
  return Buffer.from(b64Encoded, 'base64').toString();
}

const btoa = (s) => {
  return Buffer.from(s).toString('base64');
}

const toCamelCase = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const toSnakeCase = (s) => {  
  return s.split(/(?=[A-Z])/).join('_').toLowerCase();
};

module.exports = {
  atob,
  btoa,
  stripHtml,
  isValidEmail,
  generateTokenRange,
  generateToken,
  scientificNotationToNumber,
  toCamelCase,
  toSnakeCase,
}
