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

Now build the extension using

```
yarn build
```

You will see a `dist` folder generated inside `apps/extension`

#### Adding extension to Chrome

In Chrome browser, go to chrome://extensions page and switch on developer mode. This enables the ability to locally install a Chrome extension.

Now click on the `LOAD UNPACKED` and browse to `apps/extension/dist/chrome`, this will install the Z3US wallet chrome extension.

#### Adding extension to Firefox

Before building:

1. Fix `connector extension` dependency events dispatching by updating `chromeDAppClient.sendMessage` at `@radixdlt/connector-extension/src/chrome/dapp/dapp-client.ts:14`

```diff
export const ChromeDAppClient = (logger: AppLogger) => {
  const sendMessage = (message: Record<string, any>) => {
+	const clonedDetail = (globalThis as any).cloneInto ? (globalThis as any).cloneInto(message, document.defaultView) : message
    window.dispatchEvent(
      new CustomEvent(dAppEvent.receive, {
        detail: clonedDetail,
      }),
    )
    return ok(true)
  }
```

Before adding to firefox some changes to manifest file must be made:

1. Remove all `use_dynamic_url` keys from all entries in `web_accessible_resources`

```diff
  "web_accessible_resources": [
    {
      "matches": [
        "https://*/*"
      ],
      "resources": [
        "popup-theme-dark.html",
        "popup-theme-light.html",
        "popup-theme-system.html",
        "assets/*"
      ],
-      "use_dynamic_url": false
    },
    {
      "matches": [
        "*://*.z3us.com/*"
      ],
      "resources": [
        "assets/browser-polyfill.js",
        "assets/messanger.js",
        "assets/inpage.js",
        "assets/events.js",
        "assets/content-script.ts.js"
      ],
-      "use_dynamic_url": true
    }
  ]
```

2. Change `service_worker` to `scripts` and wrap value in array paranthesis `[]`

```diff
  "background": {
-    "service_worker": "service-worker-loader.js",
+    "scripts": ["service-worker-loader.js"],
    "type": "module"
  },
```

3. Add `extension id` to `manifest`
```diff
+  "browser_specific_settings": {
+    "gecko": {
+      "id": "webextension@z3us.com",
+      "strict_min_version": "42.0"
+    }
+  },  
```

4. Remove `offscreen` from `permissions`
```diff
const permissions = [
	'storage',
-	'offscreen',
	'unlimitedStorage',
	'notifications',
	'activeTab',
	'scripting',
	'contextMenus',
] 
```

- Create archive by compresing all the files `inside` the directory `apps/extension/dist`.
- In the Firefox browser navigate to `about:debugging#/runtime/this-firefox`.
- Click the button `Load temporary Add-on...`, then select an archive file you prepared.

## dApps

#### Wallet events

In case user changes selected wallet you might want to reset connect button state, you can do it simply like this:

```typescript
const rdt = RadixDappToolkit(options)

window.z3us.onWalletChange(() => { rdt.disconnect() })
```
