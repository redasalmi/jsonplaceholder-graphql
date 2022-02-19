require('esbuild').build({
  entryPoints: ['server.ts'],
  bundle: true,
  platform: 'node',
  target: ['node16.14'],
  external: ['./node_modules/*'],
  outdir: './dist',
  minify: true,
});
