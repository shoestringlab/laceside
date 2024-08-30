import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import {constructor, modal} from '/lib/gadget-ui/dist/gadget-ui.es.js';
import {cuid} from '/lib/cuid/index.mjs';
export var Message = function Message(props) {
    var message = a7.components.Constructor(a7.components.View, [props], true);
    message.state = {
      message: props.message || ""
      };

    message.components.modal = constructor( modal,
      [ document.querySelector("#messageModal"),
        {autoOpen: false, closeIcon: '/lib/feather-icons/dist/feather-sprite.svg#x-circle'}] ) ;

    message.template = function(){
      let templ = `<h3>${message.getState().message}</h3>
          <button type="button" data-onclick="close">Close</button>
        `;
      return templ;
    };

    message.eventHandlers = {
      close: function(){
        message.components.modal.close();
      }
    };

    return message;
  };
