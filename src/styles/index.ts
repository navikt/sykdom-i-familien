const breakpoints = {
    small: '576px',
    medium: '800px',
    large: '1024px'
};

const styles = {
    colors: {
        theme: '#CCDEE6',
        themeDark: '#0C5472',
        text: '#3e3832',
        link: '#0067c5'
    },
    size: {
        maxWidth: '900px'
    },
    breakpoints: {
        ...breakpoints
    },
    media: {
        small: `@media (min-width: ${breakpoints.small})`,
        medium: `@media (min-width: ${breakpoints.medium})`,
        large: `@media (min-width: ${breakpoints.large})`
    }
};

export const boxShadowStyle = `box-shadow: #B7B1A9 0 2px 1px 0;`;
export const boxFocusStyle = `box-shadow: 0 0 0px 3px #254b6d;
outline: none;`;

export default styles;
