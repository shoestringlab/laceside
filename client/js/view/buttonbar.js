import {a7} from '/lib/altseven/dist/a7.js';

export var ButtonBar = function ButtonBar(props) {
  var buttonBar = a7.components.Constructor(a7.components.View, [props], true);

  buttonBar.state = {
    esModule: props.esModule || 0
  };

	buttonBar.eventHandlers = {
    executeCode: function(){
      a7.events.publish( "sandbox.execute", {} );
    },
    setEsModule: function( event ){
      a7.model.set( "esModule", ( event.currentTarget.checked ? 1 : 0 ) );
    }
	};

  buttonBar.on( "rendered", function(){
    document.querySelector( buttonBar.props.selector + " input[name='esModule']" ).checked = buttonBar.state.esModule;
    a7.model.set( "esModule", buttonBar.state.esModule );
  });

  buttonBar.template = function(){
    var str = `<div class="buttonRow">
      <button type="button" data-onclick="executeCode">Run</button> <input type="checkbox" name="esModule" data-onclick="setEsModule"> ES Module
    </div>`;
		return str;
	};
  return buttonBar;
};
