const appVersion = '1.0.0';

document.addEventListener('DOMContentLoaded', () => {
  console.info(`[PWA] Hello World! Version ${appVersion}`);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((registration) => {
        console.info('[PWA] Service worker enregistré', registration.scope);
      })
      .catch((error) => {
        console.error('[PWA] Échec de l\'enregistrement du service worker', error);
      });
  });
} else {
  console.warn('[PWA] Service worker non supporté dans ce navigateur');
}
