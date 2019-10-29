exports.onCreateWebpackConfig = ({ stage, rules, loaders, plugins, actions }) => {
    actions.setWebpackConfig({
        externals: {
            canvas: 'commonjs canvas'
        }
    });
};
