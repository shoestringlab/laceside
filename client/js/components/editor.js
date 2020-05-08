import {a7} from '/lib/altseven/dist/a7.js';

export var Editor = function Editor(props){
  const editor = a7.components.Constructor(a7.components.View, [props], true);

  editor.state = {
    mode: props.mode,
    indentWithTabs: true
  };

  editor.on( "rendered", function(){

   //editor.element.querySelector( "textarea" ).style.width = width;

   editor.components.editor = CodeMirror.fromTextArea( document.querySelector( editor.props.selector +  " textarea[name='codeWindow']" ), {
    lineNumbers: true,
    mode: editor.state.mode,
    lineWrapping: true
    });

/*     let editorSize = a7.model.get( "editorSize" );
    let height = editorSize.height;
    //let width = editorSize.width;
    //console.log( editor.element.querySelector( ".CodeMirror-scroll" ) );
    editor.element.querySelector( ".CodeMirror" ).setAttribute( "style", "height:" + ( height -60 ) + "px !important");
 */
    editor.components.editor.refresh();

    editor.components.editor.on( "change", function(){
      a7.model.set( props.modelKey, editor.components.editor.getValue() );
    });
  });

  editor.eventHandlers = {
  };

  editor.template = function(){
    let templ = `<form>
    <textarea name="codeWindow" style="overflow:scroll !important;"></textarea>

    </form>`;
    return templ;
  };

  return editor;
};
