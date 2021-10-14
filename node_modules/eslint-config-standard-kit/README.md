# eslint-config-standard-kit

[Standard.js](https://standardjs.com) is a _fantastic_ collection of linter rules, but it can be difficult to integrate with other code-quality tools like Prettier, TypeScript, or Flow.

This package makes it easy to integrate Standard.js with these other tools by breaking its configuration into modular pieces. Just mix & match the bits you need for your particular setup:

- `standard-kit` - Basic Standard.js rules
- Language dialects:
  - `standard-kit/jsx` - [JSX](https://reactjs.org/docs/introducing-jsx.html) language support
  - `standard-kit/typescript` - [TypeScript](https://typescriptlang.org) language support
  - `standard-kit/flow` - [Flow](https://flow.org/) language support
- Runtimes:
  - `standard-kit/node` - [Node.js](https://nodejs.org/) runtime support, including CommonJS features like `require`
  - `standard-kit/react` - [React](https://reactjs.org) runtime support

If you would like to use [Prettier](https://prettier.io/) to format your source code instead of Standard.js, just prefix the configuration names with `standard-kit/prettier` instead of `standard-kit`.

## Easy Setup

Use the [configuration web page](https://www.swansontec.com/eslint-config-standard-kit/) to generate your`.eslintrc.json` file and list of dependencies for `package.json`.

## Manual Setup

First, add `eslint-plugin-standard-kit` as one of your project's `devDependencies`:

```sh
npm install --save-dev eslint-plugin-standard-kit
```

Depending on which configurations you enable, you will need to add several other dependencies as well:

- basic rules:
  - `eslint-plugin-import`
  - `eslint-plugin-promise`
- jsx:
  - `eslint-plugin-react`
- typescript:
  - `@typescript-eslint/parser`
  - `@typescript-eslint/eslint-plugin`
- flow:
  - `babel-eslint`
  - `eslint-plugin-flowtype`
- node:
  - `eslint-plugin-node`
- react:
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
- prettier:
  - `eslint-plugin-prettier`
  - `prettier`

Finally, edit your ESLint configuration file to enable your selected rules, as shown in the example below:

```json
{
  "extends": [
    "standard-kit",
    "standard-kit/jsx",
    "standard-kit/typescript"
  ],
  "parserOptions": {
    "project": "tsconfig.json"
  }
}
```

If you are using JSX or Typescript, you may want to pass the [`--ext`](https://eslint.org/docs/user-guide/command-line-interface#--ext) option to ESlint to tell it about the `.jsx` or `.ts` file extensions:

```js
eslint --ext .js,.jsx,.ts src/
```

The TypeScript rules also need to know where your `tsconfig.json` file is located. You can configure this using the `parserOptions.project` setting, as shown in the example above.

## Rules

This package auto-generate its configuration files based on the official [eslint-config-standard](https://github.com/standard/eslint-config-standard), [eslint-config-standard-jsx](https://github.com/standard/eslint-config-standard-jsx), and [eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript) packages. This means you are getting the exact same rules as the official Standard.js project, just combined & filtered into a more convenient format.

Flow support uses the recommended settings from [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype).

## Contributing

Pull requests are welcome! This library uses its own rules for linting & formatting, so please be sure the pre-commit hooks pass.

The unit tests use a snapshot system to verify that our output doesn't change. If you need to update the snapshots, just run `UPDATE=1 yarn test` to re-generate those.

To test the web interface, just use `yarn prepare` to compile the code, then open / refresh `public/index.html`.
