module.exports = {
  extends: ["react-app", "plugin:jest/recommended", "plugin:jsx-a11y/recommended"],
  plugins: ["jest", "jsx-a11y"],
  env: {
    "jest/globals": true
  },
  globals: {
    shallow: true,
    render: true,
    mount: true,
    rtlReduxRender: true,
    rtlRouterRender: true,
    rtlReduxRouterRender: true
  }
};
