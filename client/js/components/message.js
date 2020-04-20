import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import {constructor, modal} from '/lib/gadget-ui/dist/gadget-ui.es6.js';

export var Message = function Message(props) {
    var message = a7.components.Constructor(a7.components.View, [props], true);
    message.state = {
      message: props.message || ""
      };

    message.components.modal = constructor( modal,
      [ document.querySelector("#messageModal"),
        {autoOpen: false, featherPath: '/lib/feather-icons'}] ) ;

    message.template = `<h3>${message.getState().message}</h3>
        <button type="button" data-onclick="close">Close</button>
      `;

    message.eventHandlers = {
      close: function(){
        message.components.modal.close();
      }
    };

    return message;
  };