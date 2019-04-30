export const imports = {
  'lib/components/introduction.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-components-introduction" */ 'lib/components/introduction.mdx'
    ),
  'lib/components/controls/Button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-components-controls-button" */ 'lib/components/controls/Button.mdx'
    ),
  'lib/components/controls/Form.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-components-controls-form" */ 'lib/components/controls/Form.mdx'
    ),
  'lib/components/inputs/TextField.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-components-inputs-text-field" */ 'lib/components/inputs/TextField.mdx'
    ),
  'lib/components/structure/Card.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-components-structure-card" */ 'lib/components/structure/Card.mdx'
    ),
  'lib/components/structure/Element.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-components-structure-element" */ 'lib/components/structure/Element.mdx'
    ),
  'lib/hooks/state/useStateReducer.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-hooks-state-use-state-reducer" */ 'lib/hooks/state/useStateReducer.mdx'
    ),
}
