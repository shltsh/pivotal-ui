---
title: SVG
reactPath: pivotal-ui/react/svg
reactComponents:
- Svg
deprecationMessage: This component has been deprecated and we are planning to remove it in the next major version of Pivotal UI. Please reach out to the Pivotal UI team if this will cause problems for your team.
---

The `Svg` component makes it easier to transform SVG files into React components so they can be rendered just like any other component. It uses Webpack's [`react-svg-loader`](https://www.npmjs.com/package/react-svg-loader) and [`babel-loader`](https://www.npmjs.com/package/babel-loader) to do this transformation, so you must have these installed to use this component.

By default, `Svg` looks for SVG files located in the `app/svgs` folder at the root of your project
(defined here as the location of your `package.json`). For example, the following will render the file `app/svgs/my-logo.svg`:

```jsx
<Svg src="my-logo" width="20" height="20"/>
```

## Changing SVG file location

If you have SVG files in other folders, you can extend the `Svg` component and override the `svgPathLoader` method, as follows:

```jsx
class MySvg extends Svg {
  svgPathLoader(src) {
    return require(`!!babel-loader!react-svg-loader!./path/to/svgs/${src}.svg`);
  }
}

<MySvg src="fileName"/>
```

The path is relative to the file where you extend the `Svg` component.

## Disabling optimizations

Note that `react-svg-loader` will internally optimize your SVGs using [svgo](https://github.com/svg/svgo).
This optimization will sometimes change your SVG in undesirable ways. You can turn off parts of the optimization with loader params. For example, the `Svg` component itself uses:

```jsx
require(`!!babel-loader!react-svg-loader?{"svgo":{"plugins":[{"removeUnknownsAndDefaults":false},{"cleanupNumericValues":false},{"removeUselessStrokeAndFill":false}]}}!../../../../app/svgs/${src}.svg`);
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
`src`    | yes | String | | Name of the svg (excluding the `.svg` extension)