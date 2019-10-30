import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';

interface Props {}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.25rem;
    text-align: center;

    &:before {
        content: '';
        flex: 1;
        height: 1px;
        background-color: lightgray;
    }
    &:after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: lightgray;
    }
    h2 {
        flex-shrink: 0;
        margin: 0 1rem;
    }
`;

const StrokeHeader: React.FunctionComponent<Props> = ({ children }) => (
    <Wrapper>
        <Undertittel>{children}</Undertittel>
    </Wrapper>
);

export default StrokeHeader;
