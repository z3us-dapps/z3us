# ⚡ Z3US ⚡

## Extension

### Quick start

> Make sure you have **Node V20.5.0 ** installed

```
nvm install 20.5.0
nvm use 20.5.0
```

Clone repo

```
git clone git@github.com:z3us-dapps/z3us.git
```

Go to inside repository directory and run

```
yarn install
```

Now build packages and other dependencies

```
yarn build
```

Now build the extension using

```
cd apps/extension && build:radix
```

You will see a `dist` folder generated inside `apps/extension`

#### Adding extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

Now click on the `LOAD UNPACKED` and browse to `apps/extension/dist`, this will install the Z3US wallet chrome extension.

#### Adding extension to Firefox

Create archive by compressing all the files `inside` the directory `apps/extension/dist-firefox`.

In the Firefox browser navigate to `about:debugging#/runtime/this-firefox`.

Now click the button `Load temporary Add-on...`, then select an archive file you prepared.

## dApps

#### Wallet events

In case user changes selected wallet you might want to reset connect button state, you can do it simply like this:

```typescript
const rdt = RadixDappToolkit(options)

window.z3us.onWalletChange(() => {
	rdt.disconnect()
})
```

Reload page on z3us wallet change to update Radix Connector underlying state

```typescript
z3us.onWalletChange(() => {
	window.location.reload()
})
```
