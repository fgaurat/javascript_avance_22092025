import { describe, it, expect } from 'vitest';
import { calculateTotalWithTax } from '../src/calc.js';

describe('calculateTotalWithTax', () => {
  it('calcule un total TTC arrondi à deux décimales', () => {
    expect(calculateTotalWithTax(10, 0.2)).toBe(12);
    expect(calculateTotalWithTax(19.9, 0.2)).toBe(23.88);
  });

  it('refuse les valeurs négatives', () => {
    expect(() => calculateTotalWithTax(-5, 0.2)).toThrow('amount must be positive');
    expect(() => calculateTotalWithTax(10, -0.2)).toThrow('taxRate must be positive');
  });

  it('refuse les entrées non numériques', () => {
    expect(() => calculateTotalWithTax('10', 0.2)).toThrow(TypeError);
    expect(() => calculateTotalWithTax(10, '0.2')).toThrow(TypeError);
  });
});
