import * as vscode from 'vscode';
import { IndentConverter } from './IndentConverter';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "vscode-selective-indent" is now active!');

	const convertSelectedLinesIndentationToSpaces = vscode.commands.registerTextEditorCommand('vscode-selective-indent.convertSelectedLinesIndentationToSpaces', (textEditor, edit) => {
		const selections = textEditor.selections;
		const tabSize = Number(textEditor.options.tabSize ?? 4);

		for (const selection of selections) {
			const positionStart = new vscode.Position(selection.start.line, 0);
			const positionEnd = new vscode.Position(selection.end.line, textEditor.document.lineAt(selection.end.line).text.length);
			const range = new vscode.Range(positionStart, positionEnd);

			const text = textEditor.document.getText(range);

			const newText = IndentConverter.tabsToSpaces(text, tabSize);

			edit.delete(range);
			edit.insert(positionStart, newText);
		}
	});

	const convertSelectedLinesIndentationToTabs = vscode.commands.registerTextEditorCommand('vscode-selective-indent.convertSelectedLinesIndentationToTabs', (textEditor, edit) => {
		const selections = textEditor.selections;
		const tabSize = Number(textEditor.options.tabSize ?? 4);

		for (const selection of selections) {
			const positionStart = new vscode.Position(selection.start.line, 0);
			const positionEnd = new vscode.Position(selection.end.line, textEditor.document.lineAt(selection.end.line).text.length);
			const range = new vscode.Range(positionStart, positionEnd);

			const text = textEditor.document.getText(range);

			const newText = IndentConverter.spacesToTabs(text, tabSize);

			edit.delete(range);
			edit.insert(positionStart, newText);
		}
	});

	const convertAllLinesIndentationToSpaces = vscode.commands.registerTextEditorCommand('vscode-selective-indent.convertAllLinesIndentationToSpaces', (textEditor, edit) => {
		const tabSize = Number(textEditor.options.tabSize ?? 4);

		const positionStart = new vscode.Position(0, 0);
		const positionEnd = new vscode.Position(textEditor.document.lineCount - 1, textEditor.document.lineAt(textEditor.document.lineCount - 1).text.length);
		const range = new vscode.Range(positionStart, positionEnd);

		const text = textEditor.document.getText(range);

		const newText = IndentConverter.tabsToSpaces(text, tabSize);

		edit.delete(range);
		edit.insert(positionStart, newText);
	});

	const convertAllLinesIndentationToTabs = vscode.commands.registerTextEditorCommand('vscode-selective-indent.convertAllLinesIndentationToTabs', (textEditor, edit) => {
		const tabSize = Number(textEditor.options.tabSize ?? 4);

		const positionStart = new vscode.Position(0, 0);
		const positionEnd = new vscode.Position(textEditor.document.lineCount - 1, textEditor.document.lineAt(textEditor.document.lineCount - 1).text.length);
		const range = new vscode.Range(positionStart, positionEnd);

		const text = textEditor.document.getText(range);

		const newText = IndentConverter.spacesToTabs(text, tabSize);

		edit.delete(range);
		edit.insert(positionStart, newText);
	});

	context.subscriptions.push(convertSelectedLinesIndentationToSpaces);
	context.subscriptions.push(convertSelectedLinesIndentationToTabs);
	context.subscriptions.push(convertAllLinesIndentationToSpaces);
	context.subscriptions.push(convertAllLinesIndentationToTabs);
}

// This method is called when your extension is deactivated
export function deactivate() { }
