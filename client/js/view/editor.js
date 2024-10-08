import {a7} from '/lib/altseven/dist/a7.js';
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

export var Editor = function Editor(props){
  const editor = a7.components.Constructor(a7.components.View, [props], true);

  editor.state = {
    mode: props.mode,
    indentWithTabs: true
  };

  editor.on( "rendered", function(){

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


	switch( editor.props.id ){
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

	let extensions =  [minimalSetup,
		EditorView.updateListener.of((viewUpdate) => {
			if (viewUpdate.docChanged) {
			  // Document changed
			  a7.model.set( props.modelKey, viewUpdate.state.doc.toString() );
			}
		}),
		EditorView.lineWrapping 
	];

	editor.components.editor = new EditorView({
		doc: "",
		extensions: extensions,
		parent: document.querySelector( editor.props.selector  ),
		lineNumbers: true,
		mode: editor.state.mode,
		lineWrapping: true
	});

	EditorView.theme({
		".cm-content, .cm-gutter": {minHeight: "300px"}
	  });
	
  });

  editor.eventHandlers = {
  };

  editor.template = ``;

  return editor;
};
