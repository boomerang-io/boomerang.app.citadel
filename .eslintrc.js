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
    renderer: true,
    rtlRender: true,
    renderWithProvider: true,
    renderWithRouter: true,
    renderWithRouter: true,
    cy: true
  }
};
