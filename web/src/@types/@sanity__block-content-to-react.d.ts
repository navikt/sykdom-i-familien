declare module '@sanity/block-content-to-react' {
    interface Serializers {
        types?: object;
        marks?: object;
        list?: Function;
        listItem?: Function;
        block?: Function;
        span?: Function;
    }
    interface BlockContentProps {
        blocks: string | string[];
        renderContainerOnSingleChild?: boolean;
        // className?: string; // FH: Not working
        projectId?: string;
        dataset?: string;
        imageOptions?: object;
        serializers?: Serializers;
    }

    class BlockContent extends React.Component<BlockContentProps> {}

    export = BlockContent;
}
