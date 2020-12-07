const getDecorator = require('./getDecorator');
const path = require('path');
const fsExtra = require('fs-extra');
const sites = require('../../build-utils/sites');

const getFragmentsFilePath = (site) => {
  const sitePart = site && site.key ? `_${site.key}` : '';
  return path.resolve(`${__dirname}/fetched/_fragments${sitePart}.ts`);
};

function createDocumentFragments(fragments, site) {
  const fragmentsFile = getFragmentsFilePath(site);
  fsExtra.ensureFile(fragmentsFile).then((f) => {
    const fileString = `export const decoratorFragments = {
      NAV_SCRIPTS: ${JSON.stringify(fragments.NAV_SCRIPTS)},
      NAV_STYLES: ${JSON.stringify(fragments.NAV_STYLES)},
      NAV_HEADING: ${JSON.stringify(fragments.NAV_HEADING)},
      NAV_FOOTER: ${JSON.stringify(fragments.NAV_FOOTER)},
      NAV_MENU_RESOURCES: ${JSON.stringify(fragments.NAV_MENU_RESOURCES)}
    }; `;
    fsExtra.writeFileSync(fragmentsFile, fileString);
    console.log(`Decorator fragments written to ${fragmentsFile}\n`);
  });
}

getDecorator(sites.privatperson).then((fragments) => createDocumentFragments(fragments, sites.privatperson));
getDecorator(sites.arbeidsgiver).then((fragments) => createDocumentFragments(fragments, sites.arbeidsgiver));
getDecorator(sites.samarbeid).then((fragments) => createDocumentFragments(fragments, sites.samarbeid));
