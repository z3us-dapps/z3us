# ⚡ Z3US ⚡

## extension

### handle wallet change events

In case user changes selected wallet you might want to reset connect button state, you can do it simply like this:

```typescript
const rdt = RadixDappToolkit(options)

window.z3us.onWalletChange(() => { rdt.disconnect() })
```