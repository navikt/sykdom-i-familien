import React from 'react';
import Layout from '../components/Layout';
import Markdown from 'react-markdown';
import matter from 'gray-matter';
import toc from 'remark-toc';

const content = require('../content/intro.md').default;
const parsed = matter(content);

interface WhoaProps {}

const Whoa: React.FunctionComponent<WhoaProps> = (props) => (
  <Layout>
    <h2>{parsed.data.title}</h2>
    <hr />
    <Markdown source={parsed.content} plugins={[toc]} />
  </Layout>
);

export default Whoa;
