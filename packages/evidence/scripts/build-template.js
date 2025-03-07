// Populate the template that's shipped with the package using a subset of files from the example-project
import path from 'path';
import fsExtra from 'fs-extra';
import fs from 'fs';
const templatePaths = [
	'static/',
	'sources/',
	'src/app.css',
	'src/app.html',
	'src/hooks.client.js',
	'src/hooks.server.js',
	'src/global.d.ts',
	'src/pages/+page.md',
	'src/pages/+layout.svelte',
	'src/pages/+layout.js',
	'src/pages/+error.svelte',
	'src/pages/settings/',
	'src/pages/explore',
	'src/pages/api/',
	'tailwind.config.cjs',
	'postcss.config.cjs'
];
const ignorePaths = ['static/data'];

fsExtra.emptyDirSync('./template/');

templatePaths.forEach((p) => {
	fsExtra.copySync(path.join('../../sites/example-project', p), path.join('./template', p));
});

ignorePaths.forEach((p) => {
	fs.rmSync(path.join('./template', p), {
		force: true,
		recursive: true
	});
});

fsExtra.emptyDirSync('./template/sources');

const configFileLocation = new URL('svelte.config.js', import.meta.url);
// Create a clean SK config (workspace's is modified)
fs.writeFileSync('./template/svelte.config.js', fs.readFileSync(configFileLocation));

fsExtra.outputFileSync(
	'./template/vite.config.js',
	`import { sveltekit } from "@sveltejs/kit/vite"
	import { evidenceVitePlugin } from "@evidence-dev/plugin-connector"
	import { createLogger } from 'vite';

	const logger = createLogger();
	const loggerWarn = logger.warn;
  const loggerOnce = logger.warnOnce
  
  /**
   * @see https://github.com/evidence-dev/evidence/issues/1876
   * Ignore the duckdb-wasm sourcemap warning
   */
  logger.warnOnce = (m, o) => {
  if (m.match(/Sourcemap for ".+\\/node_modules\\/@duckdb\\/duckdb-wasm\\/dist\\/duckdb-browser-eh\\.worker\\.js" points to missing source files/)) return;
  loggerOnce(m, o)
}

	logger.warn = (msg, options) => {
		// ignore fs/promises warning, used in +layout.js behind if (!browser) check
		if (msg.includes('Module "fs/promises" has been externalized for browser compatibility')) return;
		// ignore eval warning, used in duckdb-wasm
		if (msg.includes('Use of eval in') && msg.includes('is strongly discouraged as it poses security risks and may cause issues with minification.')) return;
		loggerWarn(msg, options);
};

    const strictFs = (process.env.NODE_ENV === 'development') ? false : true;
    /** @type {import('vite').UserConfig} */
     const config = 
    {
        plugins: [sveltekit(), evidenceVitePlugin()],
        optimizeDeps: {
            include: ['echarts-stat', 'echarts', 
				// We need these to prevent HMR from doing a full page reload
				...(process.env.EVIDENCE_DISABLE_INCLUDE ? [] : [
					'@evidence-dev/core-components',
					'@evidence-dev/component-utilities/stores',
					'@evidence-dev/component-utilities/formatting',
					'@evidence-dev/component-utilities/globalContexts',
					'@evidence-dev/component-utilities/buildQuery',
					'@evidence-dev/component-utilities/profile',
					'debounce', 
					'@evidence-dev/query-store',
					'@duckdb/duckdb-wasm',
					'apache-arrow'
				])
				
			],
            exclude: ['svelte-icons', '@evidence-dev/universal-sql']
        },
        ssr: {
            external: ['@evidence-dev/db-orchestrator', '@evidence-dev/telemetry', 'blueimp-md5', '@evidence-dev/plugin-connector']
        },
        server: {
            fs: {
                strict: strictFs // allow template to get dependencies outside the .evidence folder
            },
			hmr: {
				overlay: false
			}
        },
		build: {
			rollupOptions: {
				external: [/^@evidence-dev\\/tailwind\\/fonts\\//],
				onwarn(warning, warn) {
					if (warning.code === 'EVAL') return;
					warn(warning);
				}
			}
		},
		customLogger: logger
    }
    export default config`
);

// Create a readme
fsExtra.outputFileSync(
	'./template/README.md',
	`
# Evidence Template Project

Thank you for checking out Evidence. 

## Learning More

- [Docs](https://docs.evidence.dev/)
- [Project Home Page](https://www.evidence.dev)
- [Github](https://github.com/evidence-dev/evidence)

`
);
