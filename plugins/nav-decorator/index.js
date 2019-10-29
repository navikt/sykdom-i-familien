const getDecorator = require('./getDecorator');
const path = require('path');
const fsExtra = require('fs-extra');

function createDocumentFragments(fragments) {
  const fragmentsFile = path.resolve(`${__dirname}/fetched/_fragments.ts`);
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

getDecorator().then(createDocumentFragments);
