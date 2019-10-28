import React from 'react';
import styles from '../../styles';
import styled, { css } from 'styled-components';
import { Sidetittel } from 'nav-frontend-typografi';

// @ts-ignore
import * as types from 'styled-components/cssprop';

const Background = styled.div`
    display: block;
    border-bottom: 0.25rem solid ${styles.colors.themeDark};
    background-color: ${styles.colors.theme};
    padding-top: 2rem;
`;

const ContentWrapper = styled.div`
    display: flex;
    position: relative;
    max-width: ${styles.size.maxWidth};
    min-height: 180px;
    margin: 0 auto;
    align-items: baseline;
    flex-direction: column;
    svg {
        max-height: 10rem;
        width: auto;
    }
    @media (min-width: ${styles.breakpoints.medium}) {
        flex-direction: row;
        svg {
            max-height: initial;
        }
    }
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem 1.4rem;
    line-height: 1.45rem;
    z-index: 1;
    width: 100%;
    min-height: 5rem;
    @media (min-width: 576px) {
        max-width: 55%;
    }
`;

const Illustration = styled.div`
    align-self: flex-end;
    justify-self: bottom;
    margin: 0 auto;
    line-height: 0;
    @media (min-width: 576px) {
        position: absolute;
        bottom: 0;
        right: 1rem;
    }
`;

const Title = css`
    font-size: 2.25rem;
    margin-bottom: 0.5rem;
`;

const Content = styled.div``;

interface Props {
    title: string;
    illustration: React.ReactNode;
}

const FrontpagePoster: React.FunctionComponent<Props> = ({ title, illustration, children }) => {
    return (
        <Background>
            <ContentWrapper>
                <Text>
                    <Sidetittel css={Title}>{title}</Sidetittel>
                    <Content>{children}</Content>
                </Text>
                <Illustration role="presentation">{illustration}</Illustration>
            </ContentWrapper>
        </Background>
    );
};

export default FrontpagePoster;
