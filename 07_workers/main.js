const startButton = document.getElementById('start-worker');
const statusLine = document.getElementById('status');
let workerInstance = null;

if (!window.Worker) {
  startButton.disabled = true;
  statusLine.textContent = 'Les Web Workers ne sont pas pris en charge par ce navigateur.';
}

startButton.addEventListener('click', () => {
  if (!window.Worker) {
    return;
  }

  if (!workerInstance) {
    workerInstance = new Worker('./worker.js');

    workerInstance.addEventListener('message', (event) => {
      statusLine.textContent = `Réponse du worker : ${event.data}`;
    });

    workerInstance.addEventListener('error', (error) => {
      statusLine.textContent = `Erreur du worker : ${error.message}`;
    });
  }

  statusLine.textContent = 'Message envoyé au worker...';
  workerInstance.postMessage('Bonjour du thread principal');
});