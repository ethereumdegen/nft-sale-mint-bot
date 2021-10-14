# eslint-config-standard-kit

## 0.15.1 (2020-12-16)

- Fix Flow rules not not affect Typescript files. This solves an issue in the previous release, where enabling both Flow & Typescript in the same project would cause errors in Typescript files.
- Handful of internal code cleanups.

## 0.15.0 (2020-12-15)

- Upgrade all dependencies, including:
  - ESLint 7
  - Standard.js 16
  - typescript-eslint 4
- Add a React configuration based on eslint-config-standard-react and eslint-plugin-react-hooks.

## 0.14.6 (2020-12-09)

- web: Fix the missing `lint-staged` dependency in the generated output.

## 0.14.5 (2020-11-24)

- Update documentation.
- Improve unit-testing & other internal code-quality tooling.
- Update the configuration web page:
  - Require compatible dependency versions (using `^`) in the generated `package.json`.
  - Add a `fix` script to the generated `package.json`.
  - Add a `typescript` dependency when necessary.
  - Show the current `eslint-config-standard-kit` version number.
  - Add a visual shadow the the buttons.

## 0.14.4 (2019-10-17)

- Fix the NPM package to include the newly-added files.

## 0.14.3 (2019-10-17)

- Add a web page to help generate configurations for new projects.
- Add a set of `standard-kit/prettier` rules with Prettier pre-integrated.
- Deprecate the `standard-kit/lint` rules.

## 0.14.2 (2019-10-07)

- Include `setTimeout` & friends in the core list of globals.
- Update the readme & generated files to give credit to the upstream rule sets.

## 0.14.1 (2019-09-30)

- Only use the TypeScript parser for `.ts` and `.tsx` files, which allows TypeScript and Flow to coexist in the same project now.

## 0.14.0 (2019-09-25)

- Upgrade to Standard.js 14.
- Base TypeScript support on `eslint-config-standard-with-typescript`.

## 0.13.0 (2019-07-30)

- Upgrade to Standard.js 13.

## 0.12.2 (2019-07-30)

- Bring more typescript rules in line with Standard.js:
  - Remove `@typescript-eslint/explicit-member-accessibility`.
  - Adjust `@typescript-eslint/no-use-before-define`.

## 0.12.1 (2019-04-24)

- Add missing files to NPM package.

## 0.12.0 (2019-04-24)

- Initial release based on Standard.js 12.
