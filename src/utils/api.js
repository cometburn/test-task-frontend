// var url = document.URL.split(":");
// var port = parseInt(url[2].slice(0, -1)) + 1;
// const apiUrl = `${url[0]}://${url[1].slice(2)}:${port}/api/`;

const apiUrl = process.env.VUE_APP_API_URL;

module.exports = {
  apiUrl,
};
