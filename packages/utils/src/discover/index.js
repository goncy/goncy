import {createFactory} from "react";

export const requireAll = ctx =>
  ctx
    .keys()
    .map(ctx)
    .map(m => m.default)
    .filter(_ => _);

export const nest = components => ({children, ...props}) =>
  components
    .map(createFactory)
    .reduceRight((child, factory) => factory(props, child), children);