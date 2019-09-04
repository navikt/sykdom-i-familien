const getDecorator = require('./decorator');
const path = require('path');
const createEnvSettingsFile = require('./envSettings');
const fsExtra = require('fs-extra');

require('dotenv').config();

const settingsFilePath = path.resolve(`${__dirname}/../../static/settings.js`);
const fragmentsFile = path.resolve(`${__dirname}/../../decorator/_fragments.ts`);

createEnvSettingsFile(settingsFilePath);
getDecorator().then(createDocumentFragments);

function createDocumentFragments(fragments) {
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

module.exports = createEnvSettingsFile;
