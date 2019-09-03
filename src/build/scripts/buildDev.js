const getDecorator = require('./decorator');
const path = require('path');
const createEnvSettingsFile = require('./envSettings');
const fsExtra = require('fs-extra');
const fs = require('fs');
const mustache = require('mustache');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const ReactDOMServer = require('react-dom/server');
const HtmlToReact = require('html-to-react');
const HtmlToReactParser = require('html-to-react').Parser;
const React = require('react');

require('dotenv').config();

const settingsFilePath = path.resolve(`${__dirname}/../../static/settings.js`);

const htmlTemplateFile = path.resolve(`${__dirname}/../../decorator/index.html`);
const nextTemplateFile = path.resolve(`${__dirname}/../../decorator/_document.js`);
const nextDocumentFile = path.resolve(`${__dirname}/../../pages/_document.js`);

createEnvSettingsFile(settingsFilePath);
getDecorator().then(createDocument);

function removeStyleTag(htmlInput) {
  const isValidNode = function() {
    return true;
  };
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  const replaceStyleProcessingInstructions = [
    {
      shouldProcessNode: function(node) {
        return node.parent && node.parent.name && node.parent.name === 'style';
      },
      processNode: function() {
        return '';
      }
    },
    {
      shouldProcessNode: function(node) {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode
    }
  ];

  const htmlToReactParser = new HtmlToReactParser();
  const reactComponent = htmlToReactParser.parseWithInstructions(
    htmlInput,
    isValidNode,
    replaceStyleProcessingInstructions
  );

  return ReactDOMServer.renderToStaticMarkup(reactComponent);
}

function createDocument(decoratorFragments) {
  const serializer = new XMLSerializer();

  const htmlTemplate = fs.readFileSync(htmlTemplateFile, { encoding: 'utf-8' });
  const nextTemplate = fs.readFileSync(nextTemplateFile, { encoding: 'utf-8' });

  const html = serializer.serializeToString(
    new DOMParser().parseFromString(mustache.render(htmlTemplate, decoratorFragments), 'text/html')
  );

  fsExtra.ensureFile(nextDocumentFile).then((f) => {
    let str = removeStyleTag(html);
    str = str.replace('<main></main>', '<Main/>');
    str = str.replace('<nextscript></nextscript>', '<NextScript/>');
    fsExtra.writeFileSync(nextDocumentFile, mustache.render(nextTemplate, { html: str }));
  });
}
module.exports = createEnvSettingsFile;
