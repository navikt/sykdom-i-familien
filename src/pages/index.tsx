import React from 'react';
import Layout from '../components/Layout';
import Markdown from 'react-markdown';
import matter from 'gray-matter';
import MarkIt from 'markdown-to-jsx';
import Test from '../components/Test';
import visit from 'unist-util-visit';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';

import '../styles.less';

const content = require('../content/pleiepenger/kortFortalt.md').default;
const parsed = matter(content);

const renderers = {
  DatePicker: () => <span>Date</span>
};

interface WhoaProps {}

function linker() {
  function transformer(tree) {
    visit(tree, 'inlineCode', function(node, index, parent) {
      const value = typeof node.value === 'string' ? (node.value as string) : '';
      if (parent.type !== 'link' && /nav [a-z-.]+/.test(node.value as string)) {
        parent.children[index] = {
          type: 'link',
          url: 'https://nav.no/' + value.split(' ')[1],
          children: [
            {
              type: node.type,
              value: 'abcv',
              position: node.position
            }
          ],
          position: node.position
        };
      }
    });
    return tree;
  }

  return transformer;
}

interface Props {}

const Whoa: React.FunctionComponent<Props> = (props) => (
  <Layout>
    <h2>{parsed.data.title}</h2>
    <EkspanderbartPanel tittel="ABC">Dette er panelet</EkspanderbartPanel>
    <hr />
    <Markdown source={parsed.content} astPlugins={[linker()]} includeNodeIndex={true} renderers={renderers} />
    <MarkIt
      children={parsed.content}
      options={{
        overrides: {
          DatePicker: {
            component: Test
          }
        }
      }}
    />

    <hr />
  </Layout>
);

export default Whoa;
