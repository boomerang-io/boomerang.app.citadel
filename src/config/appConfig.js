// Look for the data injected into the HTML file from the Express app
// See server/app.js for implementation
export const APP_ROOT =
  window._SERVER_DATA && window._SERVER_DATA.APP_ROOT
    ? window._SERVER_DATA.APP_ROOT
    : '';
