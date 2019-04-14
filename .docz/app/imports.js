export const imports = {
  'lib/components/components.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-components-components" */ 'lib/components/components.mdx'
    ),
  'lib/components/controls/Button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-components-controls-button" */ 'lib/components/controls/Button.mdx'
    ),
  'lib/components/controls/Form.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "lib-components-controls-form" */ 'lib/components/controls/Form.mdx'
    ),
}
