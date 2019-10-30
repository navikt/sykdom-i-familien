import React from 'react';
import styled, { css } from 'styled-components';
import styles, { boxShadowStyle, boxFocusStyle } from '../../../../../styles';
import { Undertittel } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';

// @ts-ignore
import * as types from 'styled-components/cssprop';
import { Link } from 'gatsby-plugin-intl';

type LinkPanelLayout = 'frontpageImageAbove' | 'wideWithImage' | 'plain';

interface Props {
    image?: React.ReactNode;
    title: string;
    url: string;
    layout?: LinkPanelLayout;
}

const ImageContainer = styled.div`
    display: block;
    background-color: ${styles.colors.theme};
    border-bottom: 0.25rem solid ${styles.colors.themeDark};
    line-height: 0;
    padding: 0.5rem 0;
    text-align: center;
`;
const Content = styled.div`
    padding: 1rem;
    color: ${styles.colors.text};
`;

const ChevronContainer = styled.div`
    text-align: center;
    position: absolute;
    bottom: 1.5rem;
    width: 100%;
    > * {
        color: ${styles.colors.text};
    }
`;

const LinkPanel: React.FunctionComponent<Props> = ({ title, url, image, layout = 'frontpageImageAbove', children }) => {
    const includeChevron = layout === 'plain' || layout === 'wideWithImage';
    return (
        <Link
            tabIndex={0}
            to={url}
            css={css`
                position: relative;
                display: block;
                background-color: white;
                border-radius: 0.25rem;
                overflow: hidden;
                padding-bottom: ${includeChevron ? '3rem' : undefined};
                h2 {
                    font-size: ${layout === 'plain' ? '1.125rem' : undefined};
                }
                .title {
                    margin-bottom: 0.5rem;
                }
                &:focus {
                    ${boxFocusStyle}
                    background-color: white;
                }
                &:hover {
                    ${boxShadowStyle}
                    .content {
                        color: ${styles.colors.link};
                    }
                    .title {
                        text-decoration: underline;
                    }
                    ${ChevronContainer} {
                        > * {
                            color: ${styles.colors.link};
                            transform: translateX(0.25rem) rotate(-90deg);
                            transition: all 0.2s ease-in-out;
                        }
                    }
                }
            `}>
            {image && <ImageContainer>{image}</ImageContainer>}
            <Content className="content">
                <Undertittel className="title">{title}</Undertittel>
                <div>{children}</div>
            </Content>
            {includeChevron && (
                <ChevronContainer>
                    <HoyreChevron />
                </ChevronContainer>
            )}
        </Link>
    );
};

export default LinkPanel;
