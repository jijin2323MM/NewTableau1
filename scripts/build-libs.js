#!/usr/bin/env node
const { spawnSync } = require('node:child_process');

const commands = [
  ['node', ['./node_modules/vite/bin/vite.js', 'build', '--config', 'vite.lib.config.ts']],
  ['node', ['./node_modules/vite/bin/vite.js', 'build', '--config', 'vite.newbridge.config.ts']],
];

for (const [cmd, args] of commands) {
  const result = spawnSync(cmd, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
