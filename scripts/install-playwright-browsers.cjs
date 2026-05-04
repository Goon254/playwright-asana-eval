'use strict';

const { spawnSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const browsersPath = path.join(root, '.pw-browsers');
const env = { ...process.env, PLAYWRIGHT_BROWSERS_PATH: browsersPath };

const result = spawnSync('npx', ['playwright', 'install', 'chromium'], {
  cwd: root,
  env,
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status === null ? 1 : result.status);
