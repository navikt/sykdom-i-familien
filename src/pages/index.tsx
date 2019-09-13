import React from 'react';
import Layout from '../components/Layout';
import matter, { GrayMatterFile } from 'gray-matter';
import MarkdownToJsx from 'markdown-to-jsx';
import { DocumentContext } from 'next/document';
import remark from 'remark';
import visit from 'unist-util-visit';
import MedInnholdsfortegnelse from '../components/infosider/MedInnholdsfortegnelse';
import slugify from 'slugify';
import { IntlProvider } from 'react-intl';

import '../styles/styles.less';
import { Panel } from 'nav-frontend-paneler';

interface Props {
  sections: {
    content: GrayMatterFile<any>;
  };
}

class App extends React.Component<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const glob = require('glob');

    const keys = glob.sync('./src/content/pleiepenger/parts/*.md');
    var sections = {};
    for (let entry in keys) {
      const filename = keys[entry].split('/').pop();
      const fileContent = require('../content/pleiepenger/parts/' + filename).default;
      const slug = filename
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.');

      sections[slug] = matter(fileContent);
    }

    return { sections };
  }

  render() {
    const { sections } = this.props;
    const content: GrayMatterFile<any>[] = Object.keys(sections).map((key) => sections[key]);
    let allContent = '';
    content.forEach((c) => {
      allContent += c.content;
    });

    const tree = remark().parse(allContent);
    const headers: { slug: string; title: string }[] = [];

    visit(tree, 'heading', (node) => {
      if (node.depth === 2) {
        const title = (node.children as any)[0].value;
        headers.push({
          slug: slugify(title, { lower: true, remove: /\?/ }),
          title
        });
      }
    });

    return (
      <IntlProvider locale={'no'}>
        <Layout>
          <MedInnholdsfortegnelse sections={headers.map((h) => h.title)}>
            <div className="infosider__article">
              <Panel>
                <MarkdownToJsx>{allContent}</MarkdownToJsx>
              </Panel>
            </div>
          </MedInnholdsfortegnelse>
        </Layout>
      </IntlProvider>
    );
  }
}

export default App;
