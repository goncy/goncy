import { useReducer, useCallback } from 'react';

const useStateReducer = (initialState, actions) => {
  const reducer = useCallback(
    (state, action) =>
      actions[action.type]
        ? { ...state, ...actions[action.type](state, action) }
        : state,
    [actions]
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  return [
    state,
    (type, payload, ...rest) => dispatch({ type, payload, ...rest }),
  ];
};

export default useStateReducer;
