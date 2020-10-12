export const shouldUpdateScroll = (props) => {
    return !props.routerProps.location.hash;
};
