import React from 'react';
import Layout from '../components/Layout';
import matter, { GrayMatterFile } from 'gray-matter';
import MarkIt from 'markdown-to-jsx';

const pleiepenger = require('../content/pleiepenger/pleiepenger.md').default;

import '../styles.less';

import { DocumentContext } from 'next/document';

interface Props {
  sections: {
    content: GrayMatterFile<any>;
  };
}

class Whoa extends React.Component<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const glob = require('glob');

    const keys = glob.sync('./src/content/pleiepenger/**.*');
    var sections = {};
    for (let entry in keys) {
      const filename = keys[entry].split('/').pop();
      const fileContent = require('../content/pleiepenger/' + filename).default;
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
    // const { sections } = this.props;
    // const content: GrayMatterFile<any>[] = Object.keys(sections).map((key) => sections[key]);
    return (
      <Layout>
        <MarkIt children={matter(pleiepenger).content} />
        {/* {content.map((c) => (
          <>
            {c.data.title}
            <MarkIt children={c.content} />
          </>
        ))} */}
      </Layout>
    );
  }
}

export default Whoa;
