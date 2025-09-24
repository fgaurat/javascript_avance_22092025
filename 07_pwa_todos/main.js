const APP_VERSION = '2.0.0';
const API_URL = 'http://localhost:3000/todos';
const API_CACHE_NAME = 'pwa-todos-api-cache-v1';

const statusElement = document.getElementById('status');
const listElement = document.getElementById('todos-list');
const refreshButton = document.getElementById('refresh-btn');

const setStatus = (message, { offline = !navigator.onLine, fromCache = false } = {}) => {
  if (!statusElement) {
    return;
  }
  const suffix = fromCache ? ' (cache)' : '';
  statusElement.textContent = `${message}${suffix}`;
  statusElement.classList.toggle('offline', offline);
};

const renderTodos = (todos) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    listElement.innerHTML = '<li class="empty">Aucune tâche disponible</li>';
    return;
  }

  const fragment = document.createDocumentFragment();
  todos.forEach((todo) => {
    const item = document.createElement('li');
    item.classList.toggle('completed', Boolean(todo.completed));

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = todo.title ?? `Todo #${todo.id}`;

    const status = document.createElement('span');
    status.className = 'completed';
    status.textContent = todo.completed ? 'Terminé' : 'À faire';

    item.append(title, status);
    fragment.append(item);
  });

  listElement.innerHTML = '';
  listElement.append(fragment);
};

const readTodosFromCache = async () => {
  if (!('caches' in window)) {
    return null;
  }

  try {
    const cache = await caches.open(API_CACHE_NAME);
    const response = await cache.match(API_URL);
    if (!response) {
      return null;
    }
    return response.clone().json();
  } catch (error) {
    console.warn('[PWA] Lecture du cache impossible', error);
    return null;
  }
};

const fetchTodos = async ({ showLoader = true } = {}) => {
  if (showLoader) {
    setStatus('Chargement des tâches…');
  }

  try {
    const response = await fetch(API_URL, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Réponse API invalide (${response.status})`);
    }

    const cacheSource = response.headers.get('X-Cache-Source') ?? 'network';
    const todos = await response.json();

    if (cacheSource === 'fallback-empty') {
      renderTodos([]);
      setStatus('Pas de connexion et aucune donnée en cache', { offline: true });
      return;
    }

    const fromCache = cacheSource === 'cache';
    renderTodos(todos);

    if (fromCache) {
      setStatus('Mode hors connexion : données affichées', { offline: true, fromCache: true });
    } else {
      setStatus(`Dernière mise à jour à ${new Date().toLocaleTimeString()}`, { offline: false });
    }
  } catch (error) {
    console.error('[PWA] Impossible de joindre l\'API', error);
    const cachedTodos = await readTodosFromCache();
    if (cachedTodos) {
      renderTodos(cachedTodos);
      setStatus('Mode hors connexion : données affichées', { offline: true, fromCache: true });
    } else {
      renderTodos([]);
      setStatus('Pas de connexion et aucune donnée en cache', { offline: true });
    }
  }
};

const init = async () => {
  console.info(`[PWA] Todos App Version ${APP_VERSION}`);

  const cachedTodos = await readTodosFromCache();
  if (cachedTodos) {
    renderTodos(cachedTodos);
    setStatus('Données chargées depuis le cache', { fromCache: true, offline: !navigator.onLine });
  }

  await fetchTodos({ showLoader: !cachedTodos });
};

refreshButton?.addEventListener('click', () => {
  fetchTodos();
});

window.addEventListener('online', () => {
  setStatus('Connexion rétablie, rafraîchissement…', { offline: false });
  fetchTodos({ showLoader: false });
});

window.addEventListener('offline', () => {
  setStatus('Mode hors connexion', { offline: true, fromCache: Boolean(listElement.childElementCount) });
});

document.addEventListener('DOMContentLoaded', init);

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
