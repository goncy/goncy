import {requireAll} from "./utils"

// import Profile from "./screens/Profile";

// export default {
//   "/perfil": {
//     component: Profile,
//     title: "Perfil",
//     description: "Editá tu perfil",
//   },
// };

// import React from "react";
// import {Switch, Redirect, Route} from "react-router-dom";

// import routes from "../routes";

// const Routes = () => {
//   return (
//     <Switch>
//       {Object.entries(routes).map(([path, _props]) => (
//         <Route
//           key={path}
//           exact
//           path={path}
//         />
//       ))}
//       <Redirect to="/oportunidades" />
//     </Switch>
//   );
// };

// export default Routes;
const routes = Object.assign(
  {},
  ...requireAll(require.context("../../", true, /routes\.js$/))
);

export default routes