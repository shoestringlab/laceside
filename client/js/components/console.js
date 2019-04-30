import {a7} from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';
//import {customConsole} from '/js/custom_console.js';

export var Console = function Console(props){
  const console =  a7.components.Constructor(a7.components.View, [props], true);
  console.listening = false;
  console.state = { consoleText: '' };

   console.on( "rendered", function(){
    if( ! console.listening ){
      utils.takeOverConsole();
      console.listening = true;
    }
  });
  console.template = function(){
    return `${console.state.consoleText}`;
  };

  return console;
}
