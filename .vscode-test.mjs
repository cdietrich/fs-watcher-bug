import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
	files: 'out/test/**/*.test.js',
	workspaceFolder: './vscode-test-ws',
	mocha: {
		timeout: 20000
	}
});
