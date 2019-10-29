import React, { Children } from 'react';
import styled from 'styled-components';
import styles from '../../styles';

interface Props {}

const StyledWrapper = styled.div`
    display: block;

    @media (min-width: ${styles.breakpoints.medium}) {
        display: flex;
        align-items: stretch;
        justify-items: stretch;
    }
`;

const StyledItem = styled.div`
    margin-bottom: 1rem;
    @media (min-width: ${styles.breakpoints.medium}) {
        margin-bottom: 0;
        flex: 1 1 33.3334%;
        &:nth-child(2) {
            margin: 0 2rem;
        }
        > * {
            height: 100%;
        }
    }
    &:last-child {
        margin-bottom: 0;
    }
`;

const FrontpagePanelWrapper: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <StyledWrapper>
            {Children.map(children, (child) => (
                <StyledItem>{child}</StyledItem>
            ))}
        </StyledWrapper>
    );
};
export default FrontpagePanelWrapper;
