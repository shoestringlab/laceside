import {a7} from '/lib/altseven/dist/a7.js';

export var Editor = function Editor(props){
  const editor = a7.components.Constructor(a7.components.View, [props], true);

  editor.state = {
    esModule: false
  };

   editor.on( "rendered", function(){
    editor.props.editor = CodeMirror.fromTextArea( document.getElementById( "codeWindow" ), {
      lineNumbers: true
    });

    editor.props.editor.refresh();

    editor.props.editor.on( "change", function(){
      a7.model.set( "editorContents", editor.props.editor.getValue() );
    });
  });

  editor.eventHandlers = {
    executeCode: function(){
      a7.events.publish( "sandbox.execute", { editorContents: editor.props.editor.getValue(), esModule: editor.state.esModule } );
    },
    setEsModule: function( event ){
      editor.state.esModule = event.currentTarget.checked;
    }
  };

  editor.template = function(){
    let templ = `<form><label for="codeWindow">Write some code here ...</label>
    <br>
    <textarea id="codeWindow"></textarea>
    <div class="buttonRow">
      <button type="button" data-onclick="executeCode">Run</button> <input type="checkbox" name="esModule" data-onclick="setEsModule"> ES Module
    </div>
    </form>`;
    return templ;
  };

  return editor;
}
