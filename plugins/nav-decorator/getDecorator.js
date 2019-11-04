const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const requestDecorator = (callback) => {
  const url =
    process.env.NAIS_CLUSTER_NAME === 'dev-sbs'
      ? 'https://www-q0.nav.no/person/nav-dekoratoren/'
      : 'https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true';
  return request(url, callback);
};

const getDecorator = () =>
  new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 400) {
        const { document } = new JSDOM(body).window;
        const data = {
          NAV_SCRIPTS: document.getElementById('scripts').innerHTML,
          NAV_STYLES: document.getElementById('styles').innerHTML,
          NAV_HEADING: document.getElementById('header-withmenu').innerHTML,
          NAV_FOOTER: document.getElementById('footer-withmenu').innerHTML,
          NAV_MENU_RESOURCES: document.getElementById('megamenu-resources').innerHTML
        };

        resolve(data);
      } else {
        reject(new Error(error));
      }
    };
    requestDecorator(callback);
  });

module.exports = getDecorator;
