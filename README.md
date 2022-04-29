h# ⚡ z3us ⚡ 

This [Turborepo](https://turborepo.org/) monorepo is home to the z3us browser extension wallet for the [Radix](https://www.radixdlt.com/) DLT network.

## Quick Start

```bash
yarn install --ignore-engines
yarn dev
```

## apps
- `website`: z3us [Next.js](https://nextjs.org) website - [localhost:4000](http://localhost:4000)
- `extension`: z3us wallet browser extension - [Vite](https://vitejs.dev/) and [React](https://reactjs.org/) - [localhost:8003](http://localhost:8003)
 
## packages
- `ui`: a shared React component library using stiches [stitches](https://stitches.dev) and [radix ui](https://www.radix-ui.com/)
	- `yarn storybook`: [storybook](https://storybook.js.org) - [localhost:6006](http://localhost:6006)
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json` used throughout the monorepo

### Build
To build all apps and packages, run the following command:

```
yarn build
```

## Roadmap
- [ ] Launch browser extension
- [ ] Launch website and socials
- [ ] Mobile apps
- [ ] Swaps
- [ ] Nfts
