import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchTodos, API_URL } from '../src/todos_02.js';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('fetchTodos (global fetch)', () => {
  it('utilise fetch global pour retourner la liste des todos', async () => {
    const todos = [
      { id: 1, title: 'Todo 01', completed: false },
      { id: 2, title: 'Todo 02', completed: true },
    ];

    const jsonMock = vi.fn().mockResolvedValue(todos);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jsonMock,
    });

    vi.stubGlobal('fetch', fetchMock);

    const result = await fetchTodos();

    expect(fetchMock).toHaveBeenCalledWith(API_URL, {
      headers: { Accept: 'application/json' },
    });
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(todos);
  });

  it('rejette si la réponse HTTP est en erreur', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn(),
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchTodos()).rejects.toThrow('Unable to fetch todos (500)');
  });

  it('rejette lorsque fetch lève une erreur réseau', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchTodos()).rejects.toThrow('network error');
  });
});
