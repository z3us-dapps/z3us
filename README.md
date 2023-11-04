# ⚡ Z3US ⚡

This [Turborepo](https://turborepo.org/) monorepo is home to the Z3US browser extension wallet for the [Radix](https://www.radixdlt.com/) DLT network.

### 🗒️ Note

- Z3US wallet is in beta and in active development.
- Z3US wallet extension code is unaudited, no audit is planned at this stage.

### 📱 Apps

## 🔌 [Extension](apps/extension/README.md) 
- `website`: Z3US [Next.js](https://nextjs.org) website - [localhost:4000](http://localhost:4000)

## 🌐 [Website](apps/website/README.md) 
- `extension`: Z3US wallet browser extension - [Vite](https://vitejs.dev/) and [React](https://reactjs.org/) - [localhost:8003](http://localhost:8003)

### 📦 Packages

- `ui`: a shared React component library using [stitches](https://stitches.dev) and [radix ui](https://www.radix-ui.com/)
- `yarn storybook`: [storybook](https://storybook.js.org) - [localhost:6006](http://localhost:6006)
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json` used throughout the monorepo

### 🚧 Build

To build all apps and packages, run the following command:

```
yarn build
```

## 📜 [License](LICENSE)

Copyright (c) [Z3US](https://github.com/orgs/z3us-dapps/people?query=role%3Aowner).
