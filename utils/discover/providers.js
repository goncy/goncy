import { requireAll } from "./utils"; // import React, {createContext, useState} from "react";
// const SelectedCandidateContext = createContext();
// const SelectedCandidateProvider = ({children}) => {
//   const [candidate, setCandidate] = useState({
//     name: "Gonzalo Pozzo",
//     email: "gonzalo.pozzo4@gmail.com",
//     password: "supersecret",
//   });
//   function handleSetCandidate(newCandidate) {
//     setCandidate(newCandidate);
//   }
//   return (
//     <SelectedCandidateContext.Provider
//       value={{candidate, setCandidate: handleSetCandidate}}
//     >
//       {children}
//     </SelectedCandidateContext.Provider>
//   );
// };
// export {
//   SelectedCandidateContext as default,
//   SelectedCandidateProvider as Provider,
// };
//
// const RootProvider = nest(providers)

var providers = requireAll(require.context("../../", true, /contexts\/(.*?).js$/), "Provider");
export default providers;