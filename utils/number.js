const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ipToNumber = (ip) => {
  var d = (ip === "::1") ? "127.0.0.1" :ip;
  d = d.split('.');
  return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}

const numberToIp = (num) => {
  var d = num%256;
  for (var i = 3; i > 0; i--) { 
    num = Math.floor(num/256);
    d = num%256 + '.' + d;
  }
  return d;
}


const satsToVal = (num) => {
  if(isNaN(parseInt(num))){
    return null;
  }
  let round = Math.round(parseInt(num));
  let foo = parseFloat(round) / 100000000;
  let bar = parseFloat(foo).toFixed(8);
  let baz = parseFloat(bar);
  return baz;
}

const valToSats = (num) => {
  if(isNaN(parseInt(num))){
    return null;
  }
  return Math.round(parseFloat(num) * 100000000);
}

const gweiToSats = (num) => {
  if(isNaN(parseInt(num))){
    return null;
  }
  let round = Math.floor(parseInt(num));
  let foo = parseFloat(round) / 10000000000;
  return parseInt(Math.floor(foo));
}

const gweiToVal = (num) => {
  let sats = gweiToSats(num);
  return satsToVal(sats);
}

const valToGwei = (num) => {
  if(isNaN(parseInt(num))){
    return null;
  }
  let sats = valToSats(num);
  return satsToGwei(sats);
}

const satsToGwei = (num) => {
  if(isNaN(parseInt(num))){
    return null;
  }
  return Math.round(parseFloat(num) * 10000000000);
}


const multiplySats = (sat1,sat2) => {
  let val1 = satsToVal(sat1);
  let val2 = satsToVal(sat2);
  let foo = val1 * val2;
  let bar = valToSats(foo);
  return bar;
}

const valFloatPointFix = (val) => {
  let foo = Math.round(parseFloat(val) * 100000000)/100000000;
  let bar = parseFloat(foo).toFixed(8);
  let baz = parseFloat(bar);
  return baz
}

module.exports = {
  satsToVal,
  valToSats,
  multiplySats,
  valFloatPointFix,
  ipToNumber,
  numberToIp,
  getRandomInt,

  gweiToSats,
  gweiToVal,
  valToGwei,
  satsToGwei,
}