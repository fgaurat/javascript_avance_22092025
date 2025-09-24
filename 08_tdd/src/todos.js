const API_URL = 'http://localhost:3000/todos';

export async function fetchTodos(fetcher = fetch) {
  if (typeof fetcher !== 'function') {
    throw new TypeError('fetcher must be a function');
  }

  let response;
  try {
    response = await fetcher(API_URL, {
      headers: {
        Accept: 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Unable to fetch todos (network error)', {
      cause: error instanceof Error ? error : undefined,
    });
  }

  if (!response?.ok) {
    throw new Error(`Unable to fetch todos (${response?.status ?? 'no response'})`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid todos payload');
  }

  return data;
}

export { API_URL };
