import {requireAll} from "./utils"

// const initialState = {
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
const reducers = Object.assign(
  {},
  ...requireAll(require.context("../", true, /reducers\.js$/))
);

export default reducers