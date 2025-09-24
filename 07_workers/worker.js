
self.addEventListener('message', (event) => {
  const fromMainThread = event.data;
  self.postMessage(`Hello World ! Reçu : "${fromMainThread}"`);
});
