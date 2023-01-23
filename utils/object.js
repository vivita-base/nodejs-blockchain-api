
const isObject = function (o) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const isArray = function (a) {
  return Array.isArray(a);
};

const isDate = function (a) {
  return typeof a.getMonth === 'function';
};

const toCamelCase = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const toSnakeCase = (s) => {  
  return s.split(/(?=[A-Z])/).join('_').toLowerCase();
};

const toCamelCaseKeys = function (o) {
  if(!(isObject(o) && isDate(o))){
    if (isObject(o)) {
      const n = {};
  
      Object.keys(o).forEach((k) => {
        n[toCamelCase(k)] = toCamelCaseKeys(o[k]);
      });
  
      return n;
    } else if (isArray(o)) {
      return o.map((i) => {
        return toCamelCaseKeys(i);
      });
    }
  } 

  return o;
};

const toSnakeCaseKeys = function (o) {
  if(!(isObject(o) && isDate(o))){
    if (isObject(o)) {
      const n = {};

      Object.keys(o).forEach((k) => {
        n[toSnakeCase(k)] = toSnakeCaseKeys(o[k]);
      });

      return n;
    } else if (isArray(o)) {
      return o.map((i) => {
        return toSnakeCaseKeys(i);
      });
    }
  }

  return o;
};

// Arg - Date | Returns "YYYY-MM-DD" 
const formateDateForFrontend = (d) => {
  let year = d.getFullYear()
  let month = d.getMonth()+1
  if(month <= 9) month = "0"+month;
  let day = d.getDate();
  if(day <= 9) day = "0"+day;
  return year+"-"+month+"-"+day
}

const isEmpty = (obj) => {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

// is Undefined, Null or Blank 
const isUndefinedNullOrBlank = (obj) => {
  if(obj === undefined || obj === null || obj === "") return true;
  return false;
}


module.exports = {
  isUndefinedNullOrBlank,
  formateDateForFrontend,
  toCamelCaseKeys,
  toSnakeCaseKeys,
  isEmpty
}