import { describe, it, expect, vi } from 'vitest';
import { fetchTodos, API_URL } from '../src/todos.js';

describe('fetchTodos', () => {
  it('récupère la liste des todos depuis l\'API', async () => {
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

    const result = await fetchTodos(fetchMock);

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

    await expect(fetchTodos(fetchMock)).rejects.toThrow('Unable to fetch todos (500)');
  });

  it('rejette lorsque la requête ne peut pas être envoyée', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(fetchTodos(fetchMock)).rejects.toThrow('network error');
  });
});
