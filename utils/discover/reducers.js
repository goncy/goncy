function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import { requireAll } from "./utils"; // const initialState = {
//   jokes: {
//     list: [],
//   },
// };
// export default {
//   jokes: (state = initialState.jokes, action) => {
//     switch (action.type) {
//       case "JOKE_RESOLVED": {
//         return {
//           ...state,
//           list: state.list.concat(action.payload),
//         };
//       }
//       default:
//         return state;
//     }
//   },
// };

var reducers = Object.assign.apply(Object, [{}].concat(_toConsumableArray(requireAll(require.context("../", true, /reducers\.js$/)))));
export default reducers;