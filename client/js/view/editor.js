import { a7 } from '/lib/altseven/dist/a7.js';
import { lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, keymap } from '@codemirror/view';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap } from '@codemirror/language';
import { history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import * as utils from '/js/app.utils.js';

export var Editor = function Editor(props) {
	const editor = a7.components.Constructor(a7.components.View, [props], true);

	editor.state = {
		mode: props.mode,
		indentWithTabs: true
	};

	editor.on("rendered", function () {

		var minimalSetup = (() => [
			lineNumbers(),
			highlightActiveLineGutter(),
			highlightSpecialChars(),
			history(),
			foldGutter(),
			drawSelection(),
			dropCursor(),
			indentOnInput(),
			syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
			bracketMatching(),
			closeBrackets(),
			autocompletion(),
			rectangularSelection(),
			crosshairCursor(),
			highlightActiveLine(),
			highlightSelectionMatches(),
			keymap.of([
				...closeBracketsKeymap,
				...defaultKeymap,
				...searchKeymap,
				...historyKeymap,
				...foldKeymap,
				...completionKeymap,
				...lintKeymap
			])
		])();

		switch (editor.props.id) {
			case "jseditor":
				minimalSetup.push(javascript());
				break;
			case "htmleditor":
				minimalSetup.push(html());
				break;
			case "csseditor":
				minimalSetup.push(css());
				break;
		}

		const debouncedUpdate = utils.debounce( function(update){
			// update the model
			let app = a7.model.get("app");
			app[props.modelKey] = update.state.doc.toString();
			a7.model.set( "app", app );
		}, 3000 );

		let extensions = [minimalSetup,
			EditorView.updateListener.of((viewUpdate) => {
				if (viewUpdate.docChanged) {
					debouncedUpdate(viewUpdate);
				}
			}),
			EditorView.lineWrapping
		];

		editor.components.editor = new EditorView({
			doc: "",
			extensions: extensions,
			parent: document.querySelector(editor.props.selector),
			lineNumbers: true,
			mode: editor.state.mode,
			lineWrapping: true
		});

		EditorView.theme({
			".cm-content, .cm-gutter": { minHeight: "300px" }
		});
	});

	editor.eventHandlers = {

	};

	editor.template = ``;

	editor.setEditorValue = function( text ){
		//	editor.components.editor.state.update({changes: {from: 0, to: editor.components.editor.state.doc.length, insert: text}});
		editor.components.editor.dispatch({
			changes: { from: 0, to: editor.components.editor.state.doc.length, insert: text }
		});
	};

	return editor;
};
