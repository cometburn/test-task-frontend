var url = document.URL.split(":");
var port = parseInt(url[2].slice(0, -1)) + 1;
const apiUrl = `${url[0]}://${url[1].slice(2)}:${port}/api/`;

module.exports = {
  apiUrl,
};
