import {a7} from '/node_modules/altseven/dist/a7.min.js';

const app = {
  main: (function() {
    "use strict";

    return {
      init: function(state){
        app.main.run(true);
      },

      run: function(secure){
        a7.ui.register( app.components.Header( { id: 'header', selector: "div[name='header']" } ) );

        a7.ui.register( app.components.Editor( { id: 'editor',
          console: app.components.Console( { id: 'console', consoleText: '', selector: "div[data-id='codeConsole']" } ),
          selector: "div[name='editor']" } ) );
      }
    };
  })(),
  components:  (function() {

    function Header(props) {
      const header = a7.components.Constructor(a7.components.View, [props], true);

      header.state = {};

      header.template = function(){
        return `livesandbox - in-browser JavaScript environment`;
      };
      return header;
    }

    function Editor(props){
      const editor =  a7.components.Constructor(a7.components.View, [props], true);

      editor.state = {};

      editor.on( "rendered", function(){
        editor.props.editor = CodeMirror.fromTextArea( document.getElementById( "codeWindow" ), {
          lineNumbers: true
        });

        editor.props.editor.on( "change", function(){
          a7.model.set( "editorContents", editor.props.editor.getValue() );
        });

        app.utils.takeOverConsole();
      });

      editor.eventHandlers = {
        executeCode: function(){
          //document.querySelector( "#codeConsole" ).innerText = "";
          a7.views['console'].setState( { consoleText: '' } );

          if( document.querySelector( "#codeBlock" ) !== null ){
            document.body.removeChild( document.querySelector( "#codeBlock" ) );
          }
          var scriptTag = document.createElement("script");
          scriptTag.setAttribute( "id", "codeBlock" );
          var inline = document.createTextNode( editor.getValue() );
          scriptTag.appendChild( inline );
          document.body.appendChild( scriptTag );
        }
      };

      editor.template = function(){
        let templ = `<form><label for="codeWindow">Write some code here ...</label>
        <textarea id="codeWindow"></textarea>
        <div data-id="codeConsole"></div>
        <button type="button" data-onclick="executeCode">Run</button>
        </form>`;
        return templ;
      };

      return editor;
    }


    function Console(props){
      const console =  a7.components.Constructor(a7.components.View, [props], true);

      console.state = { consoleText: '' };

      console.template = function(){
        return `<div id="codeConsole">${console.state.consoleText}</div>`;
      };

      return console;
    }

    return {
      Header: Header,
      Editor: Editor,
      Console: Console
    };

  })(),
  utils: {
    // this bit of code based on solution:
    // http://tobyho.com/2012/07/27/taking-over-console-log/
    takeOverConsole: function(){
      var console = window.console;
      if (!console) return;
      function intercept(method){
          var original = console[method];
          console[method] = function(){
              // capture and push to our output div
              document.querySelector( "#codeConsole" ).innerText += Array.prototype.slice.apply(arguments).join(' ') + "\n";
              if (original.apply){
                  // Do this for normal browsers
                  original.apply(console, arguments);
              }else{
                  // Do this for IE
                  var message = Array.prototype.slice.apply(arguments).join(' ');
                  original(message);
              }
          }
      }
      var methods = ['log', 'warn', 'error'];
      for (var i = 0; i < methods.length; i++)
          intercept(methods[i]);
    }
  }
};

export var application = function init(){
	var p = new Promise(function(resolve,
		reject) {
		a7.init({}, resolve, reject);
	});
	p.then(function(state) {
		app.main.init(state);
	});
	p['catch'](function(message) {
		console.log(
			"Something went wrong.");
	});
}
