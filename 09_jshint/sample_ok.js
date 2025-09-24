'use strict';

function greet(name = 'world') {
  if (!name) {
    throw new Error('name is required');
  }
  console.log(`Hello ${name}`);
}

greet('Codex');
