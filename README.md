# ⚡ Z3US ⚡ 

This [Turborepo](https://turborepo.org/) monorepo is home to the Z3US browser extension wallet for the [Radix](https://www.radixdlt.com/) DLT network.

## Extension quick start

>Make sure you have **Node V15.5.0 ** installed

Clone repo

```
git clone git@github.com:z3us-dapps/z3us.git
```
Go to `z3us` directory run

```
yarn install --ignore-engines
```
Now build the extension using
```
yarn build
```
You will see a `dist` folder generated inside `apps/extension`

## Adding extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

Now click on the `LOAD UNPACKED` and browse to `apps/extension/dist/chrome`, this will install the Z3US wallet chrome extension.

## Adding extension to Firefox
In the Firefox browser navitate to `about:debugging#/runtime/this-firefox`. Click the button `Load temporary Add-on...`, then select compressed zip of the directory  `apps/extension/dist/firefox`.

## Website quick start

Go to `z3us/apps/website` directory run

```
yarn dev
```
Now visit the website running locally at [localhost:4000](http://localhost:4000)

## Apps
- `website`: Z3US [Next.js](https://nextjs.org) website - [localhost:4000](http://localhost:4000)
- `extension`: Z3US wallet browser extension - [Vite](https://vitejs.dev/) and [React](https://reactjs.org/) - [localhost:8003](http://localhost:8003)
 
## Packages
- `ui`: a shared React component library using stiches [stitches](https://stitches.dev) and [radix ui](https://www.radix-ui.com/)
	- `yarn storybook`: [storybook](https://storybook.js.org) - [localhost:6006](http://localhost:6006)
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json` used throughout the monorepo

### Build
To build all apps and packages, run the following command:

```
yarn build
```

📜 [License](LICENSE)
-------

Copyright (c) [Z3US](https://github.com/orgs/z3us-dapps/people?query=role%3Aowner).
