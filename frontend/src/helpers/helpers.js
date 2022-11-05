// Odczytywanie wartości z cookie
const getCookie = (name) => {
  const str = document.cookie.split('; ');
  const result = {};
  str.forEach(el => {
    const cur = el.split('=');
    result[cur[0]] = cur[1];
  })
  return result[name] ? result[name] : ''
}

export { 
    getCookie,
}