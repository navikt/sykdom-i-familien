import React from 'react';
import Layout from '../components/Layout';
import Markdown from 'react-markdown';
import matter from 'gray-matter';
import toc from 'remark-toc';
import MarkIt from 'markdown-to-jsx';
import Test from '../components/Test';
import visit from 'unist-util-visit';

const content = require('../content/pleiepenger/kortFortalt.md').default;
const parsed = matter(content);

const renderers = {
  // text: () => <span>Data</span>,
  DatePicker: () => <span>Date</span>
};

interface WhoaProps {}

function linker() {
  function transformer(tree) {
    console.log(tree);
    visit(tree, 'inlineCode', function(node, index, parent) {
      const value = typeof node.value === 'string' ? (node.value as string) : '';
      console.log(node.type);
      if (parent.type !== 'link' && /nav [a-z-.]+/.test(node.value as string)) {
        console.log('match');

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

const Whoa: React.FunctionComponent<WhoaProps> = (props) => (
  <Layout>
    <h2>{parsed.data.title}</h2>
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
