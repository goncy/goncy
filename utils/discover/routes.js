function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { requireAll } from "./utils"; // import Profile from "./screens/Profile";
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

var routes = Object.assign.apply(Object, [{}].concat(_toConsumableArray(requireAll(require.context("../../", true, /routes\.js$/)))));
export default routes;