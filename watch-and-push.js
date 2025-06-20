#!/usr/bin/env node
import { watch } from 'chokidar';
import { exec } from 'child_process';

const paths = [
  'src/**/*',
  'pages/**/*',
  'components/**/*',
  'public/**/*',
  'package.json',
  'vite.config.*',
];

console.log('🚀 Watching for changes… will auto-commit & push to origin/main');

watch(paths, { ignored: /node_modules|\.git/, ignoreInitial: true })
  .on('all', (event, file) => {
    console.log(`🔄 ${event} detected in ${file}`);
    exec(
      `git add -A && git commit -m "Auto-commit: ${new Date().toISOString()}" && git push`,
      (err, stdout, stderr) => {
        if (err) {
          console.error('❌ Git error:', stderr.trim());
        } else {
          console.log('✅ Pushed to origin/main');
        }
      }
    );
  });
