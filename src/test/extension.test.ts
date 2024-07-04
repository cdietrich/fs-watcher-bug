import * as assert from 'assert';

import {spawnSync} from 'child_process';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', async () => {

		let counter = 0;
		let f = vscode.workspace.workspaceFolders![0].uri.fsPath ; 
		for (let i = 0; i < 1000; i++) {
			spawnSync('touch', [`${f.toString()}/test_${i}.txt` ]);
		}
		await new Promise((resolve) => setTimeout(resolve, 200));
		const w = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.workspace.workspaceFolders![0],"*.txt"));
		
		// assert.strictEqual(f, '/Users/dietrich/git/fs-watcher-bug/vscode-test-ws');
		console.log(f);
		w.onDidDelete((e) => {
			console.log(e);
			counter++;
		});
		
		spawnSync('sh',[`${f.toString()}/../x.sh`]);
		await new Promise((resolve) => setTimeout(resolve, 5000));
		w.dispose();

		assert.strictEqual(1000, counter);
	});
});
