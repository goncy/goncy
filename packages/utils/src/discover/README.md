# How to

## Providers
```js
// rootProvider.js
import {nest, requireAll} from "goncy/utils/discover";

const providers = requireAll(
  require.context("../../", true, /contexts\/(.*?).js$/),
  "Provider"
);

export default nest(providers);
```

```js
// /candidate/context.js
import React, {createContext, useState} from "react";

const SelectedCandidateContext = createContext();

const SelectedCandidateProvider = ({children}) => {
  const [candidate, setCandidate] = useState({
    name: "Gonzalo Pozzo",
    email: "gonzalo.pozzo4@gmail.com",
    password: "supersecret",
  });

  function handleSetCandidate(newCandidate) {
    setCandidate(newCandidate);
  }

  return (
    <SelectedCandidateContext.Provider
      value={{candidate, setCandidate: handleSetCandidate}}
    >
      {children}
    </SelectedCandidateContext.Provider>
  );
};

export {
  SelectedCandidateContext as default,
  SelectedCandidateProvider as Provider,
};
```

## Reducers
```js
// rootReducer.js
import {requireAll} from "goncy/utils/discover";

const reducers = Object.assign(
  {},
  ...requireAll(require.context("../", true, /reducers\.js$/))
);

export default reducers
```

```js
// joke/reducers.js
const initialState = {
  jokes: {
    list: [],
  },
};

export default {
  jokes: (state = initialState.jokes, action) => {
    switch (action.type) {
      case "JOKE_RESOLVED": {
        return {
          ...state,
          list: state.list.concat(action.payload),
        };
      }
      default:
        return state;
    }
  },
};
```

## Routes
```js
// router/Router.js
import {requireAll} from "goncy/utils/discover";

const routes = Object.assign(
  {},
  ...requireAll(require.context("../../", true, /routes\.js$/))
);

const Router = () => {
  return (
    <Switch>
      {Object.entries(routes).map(([path, _props]) => (
        <Route
          key={path}
          exact
          path={path}
        />
      ))}
      <Redirect to="/oportunidades" />
    </Switch>
  );
```

```js
// user/routes.js
import Profile from "./screens/Profile";

export default {
  "/perfil": {
    component: Profile,
    title: "Perfil",
    description: "Editá tu perfil",
  },
};

import React from "react";
import {Switch, Redirect, Route} from "react-router-dom";
};
```