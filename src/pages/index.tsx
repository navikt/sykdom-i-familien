import React from 'react';
import Layout from '../components/Layout';
import matter from 'gray-matter';
import MarkIt from 'markdown-to-jsx';
import Test from '../components/Test';
import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel';
import styled from 'styled-components';

const content = require('../content/pleiepenger/kortFortalt.md').default;
const parsed = matter(content);

import '../styles.less';

const StyledButton = styled.div({
  padding: '20px',
  color: 'blue'
});

interface Props {}

const Whoa: React.FunctionComponent<Props> = (props) => (
  <Layout>
    <h2>{parsed.data.title}</h2>
    <EkspanderbartPanel tittel="ABC">Dette er panelet</EkspanderbartPanel>
    <StyledButton>sdf</StyledButton>
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
  </Layout>
);

export default Whoa;
