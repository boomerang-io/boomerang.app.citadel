import React from "react";
import { render } from "react-dom";
import configureStore, { history } from "./store/configureStore";
import Root from "./Root";
import "Config/axiosGlobalConfig";
import "Styles/index.scss";

const store = configureStore();

// Setup hot module reloading to improve dev experience
render(<Root store={store} history={history} />, document.getElementById("app"));

// if (module.hot) {
//   module.hot.accept("./Root", () => {
//     const NewRoot = require("./Root").default;
//     render(
//       <AppContainer>
//         <NewRoot store={store} history={history} />
//       </AppContainer>,
//       document.getElementById("app")
//     );
//   });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
