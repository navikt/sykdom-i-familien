const getDecorator = require('./getDecorator');

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }, configOptions) => {
  const { createNode } = actions;
  delete configOptions.plugins;

  const processNavDecorator = (fragments) => {
    const nodeId = createNodeId(`navDecorator`);
    const nodeData = {
      ...fragments,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'navDecorator',
        contentDigest: 'decorator'
      }
    };
    return nodeData;
  };

  return getDecorator().then((decoratorData) => {
    createNode(processNavDecorator(decoratorData));
  });
};
