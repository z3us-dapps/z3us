import '@src/helpers/polyfills'
import '@radixdlt/connector-extension/src/chrome/offscreen/offscreen'

// eslint-disable-next-line no-underscore-dangle
window.__dirname = '/'
window.global = window

setInterval(async () => {
    (await navigator.serviceWorker.ready).active.postMessage('keepAlive');
  }, 20e3);

export {}
