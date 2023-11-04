const getProxy = () => {
    const isProduction = 0 // changed from bool to int
    // const target = 'https://starfish-app-f3lxg.ondigitalocean.app'
    const target = 'https://www.moblibrary.net'
    const serviceTarget = 'https://www.moblibrary.net'
    if (isProduction) {
      return {
        target: target,
        serviceTarget: serviceTarget
      }
    } else {
      return {
        target: 'http://localhost:7000',
        serviceTarget: serviceTarget // 'http://localhost:8000'
      }
    }
  }
  // .replace('-', '83888')
  // .replace('_', '86695')
  // .replace('.', '47520') // TODO: not compatible with file extensions
  const getFixedFileName = (str) => {
    return str
      .replace(' ', '63701')
      .replace('!', '46063')
      .replace('~', '33374')
      .replace('*', '81195')
      .replace('\'', '42934')
      .replace('(', '13788')
      .replace(')', '56140')
      .replace(';', '56140')
      .replace('/', '26825')
      .replace('?', '66074')
      .replace(':', '29721')
      .replace('@', '95344')
      .replace('&', '65979')
      .replace('=', '42718')
      .replace('+', '04687')
      .replace('$', '61070')
      .replace(',', '98832')
      .replace('#', '85553')
  }
  
  const crypt = (salt, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  
    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };
  
  const auth = {
    crypt: crypt,
  }
  
  function compareTimestampDESC(a, b) {
    if (a.timeStamp < b.timeStamp) {
      return 1;
    }
    if (a.timeStamp > b.timeStamp) {
      return -1;
    }
    return 0;
  }
  function compareTimestampASC(a, b) {
    if (a.timeStamp < b.timeStamp) {
      return -1;
    }
    if (a.timeStamp > b.timeStamp) {
      return 1;
    }
    return 0;
  }
  
  const compareByTimestamp = {
    ASC: compareTimestampASC,
    DESC: compareTimestampDESC
  }
  
  const proxy = getProxy().target
  const srv_proxy = getProxy().serviceTarget
  
  module.exports = { getFixedFileName, proxy, srv_proxy, auth, compareByTimestamp }