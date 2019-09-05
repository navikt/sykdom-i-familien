import React from 'react';
import Layout from '../components/Layout';
import Markdown from 'react-markdown';
import matter from 'gray-matter';
import toc from 'remark-toc';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';

import '../styles.less';

const content = require('../content/intro.md').default;
const parsed = matter(content);

interface Props {}

const Whoa: React.FunctionComponent<Props> = (props) => (
  <Layout>
    <h2>{parsed.data.title}</h2>
    <EkspanderbartPanel tittel="ABC">Dette er panelet</EkspanderbartPanel>
    <hr />
    <Markdown source={parsed.content} plugins={[toc]} />
  </Layout>
);

export default Whoa;
