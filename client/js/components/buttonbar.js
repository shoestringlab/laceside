import {a7} from '/lib/altseven/dist/a7.js';

export var ButtonBar = function ButtonBar(props) {
  var buttonBar = a7.components.Constructor(a7.components.View, [props], true);

  buttonBar.state = {

  };

	buttonBar.eventHandlers = {
    executeCode: function(){
      a7.events.publish( "sandbox.execute", {} );
    },
    setEsModule: function( event ){
      a7.model.set( "esModule", event.currentTarget.checked );
    }
	};

  buttonBar.template = function(){
    var str = `<div class="buttonRow">
      <button type="button" data-onclick="executeCode">Run</button> <input type="checkbox" name="esModule" data-onclick="setEsModule"> ES Module
    </div>`;
		return str;
	};
  return buttonBar;
}
