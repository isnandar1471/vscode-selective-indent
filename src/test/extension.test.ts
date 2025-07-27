import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { IndentConverter } from '../IndentConverter';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('IndentConverter:spacesToTabs:should convert spaces at beginning of lines to tabs', () => {
		const input = '        line1\n    line2\n  line3';
		const expected = '\t\tline1\n\tline2\n  line3';
		const result = IndentConverter.spacesToTabs(input, 4);
		assert.strictEqual(expected, result);
	});

	test('IndentConverter:spacesToTabs:should ignore lines that do not match full tabSize spaces', () => {
		const input = '   line1\n        line2';
		const expected = '   line1\n\t\tline2';
		const result = IndentConverter.spacesToTabs(input, 4);
		assert.strictEqual(expected, result);
	});

	test('IndentConverter:tabsToSpaces:should convert tabs at beginning of lines to spaces', () => {
		const input = '\t\tline1\n\tline2\nline3';
		const expected = '        line1\n    line2\nline3';
		const result = IndentConverter.tabsToSpaces(input, 4);
		assert.strictEqual(expected, result);
	});

	test('IndentConverter:tabsToSpaces:should preserve tabs not at the beginning of lines', () => {
		const input = '\tline\twith\ttabs';
		const expected = '    line\twith\ttabs';
		const result = IndentConverter.tabsToSpaces(input, 4);
		assert.strictEqual(expected, result);
	});
});
