const svgoProps = {
    plugins: [
        {
            cleanupAttrs: true
        },
        {
            removeDoctype: true
        },
        {
            removeXMLProcInst: true
        },
        {
            removeComments: true
        },
        {
            removeMetadata: false
        },
        {
            removeTitle: false
        },
        {
            removeDesc: true
        },
        {
            removeUselessDefs: true
        },
        {
            removeEditorsNSData: true
        },
        {
            removeEmptyAttrs: true
        },
        {
            removeHiddenElems: true
        },
        {
            removeEmptyText: true
        },
        {
            removeEmptyContainers: true
        },
        {
            removeViewBox: false
        },
        {
            cleanupEnableBackground: false
        },
        {
            convertStyleToAttrs: false
        },
        {
            convertColors: false
        },
        {
            convertPathData: false
        },
        {
            convertTransform: false
        },
        {
            removeUnknownsAndDefaults: true
        },
        {
            removeNonInheritableGroupAttrs: true
        },
        {
            removeUselessStrokeAndFill: true
        },
        {
            removeUnusedNS: true
        },
        {
            cleanupIDs: true
        },
        {
            cleanupNumericValues: true
        },
        {
            moveElemsAttrsToGroup: true
        },
        {
            moveGroupAttrsToElems: true
        },
        {
            collapseGroups: true
        },
        {
            removeRasterImages: false
        },
        {
            mergePaths: true
        },
        {
            convertShapeToPath: false
        },
        {
            sortAttrs: true
        },
        {
            removeDimensions: false
        },
        {
            prefixIds: false
        }
    ]
};

module.exports = svgoProps;
