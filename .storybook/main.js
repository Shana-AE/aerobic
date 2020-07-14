const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx', '../src/**/*.stories.mdx'],
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: {
        useTsDocgenLoader: true,
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        },
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  typescript: {
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  }
};
