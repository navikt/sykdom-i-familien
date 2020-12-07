const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const createBreadcrumbsParam = (site) => {
  if (site.breadcrumbs) {
    return `&breadcrumbs=${JSON.stringify(site.breadcrumbs)}`;
  }
  return '';
};

const createContextParam = (site) => {
  if (site && site.context) {
    return `&context=${site.context}`;
  }
  return '';
};

const requestDecorator = (callback, site) => {
  let breadcrumbsParam = createBreadcrumbsParam(site);
  let contextParam = createContextParam(site);
  const url =
    process.env.NAIS_CLUSTER_NAME === 'dev-sbs'
      ? `https://www.nav.no/dekoratoren/?feedback=false${breadcrumbsParam}${contextParam}`
      : `https://www.nav.no/dekoratoren/?feedback=false${breadcrumbsParam}${contextParam}`;
  console.log(`Fetching decorator with url ${url}`);
  return request(url, callback);
};

const getDecorator = (site) =>
  new Promise((resolve, reject) => {
    const callback = (error, response, body) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 400) {
        const { document } = new JSDOM(body).window;
        const data = {
          NAV_SCRIPTS: document.getElementById('scripts').innerHTML,
          NAV_STYLES: document.getElementById('styles').innerHTML,
          NAV_HEADING: document.getElementById('header-withmenu').innerHTML,
          NAV_FOOTER: document.getElementById('footer-withmenu').innerHTML,
          NAV_MENU_RESOURCES: document.getElementById('megamenu-resources').innerHTML,
        };

        resolve(data);
      } else {
        reject(new Error(error));
      }
    };
    requestDecorator(callback, site);
  });

module.exports = getDecorator;
