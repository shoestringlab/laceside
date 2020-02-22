import {a7} from '/lib/altseven/dist/a7.js';

export var Menu = function Menu(props) {
  var menu = a7.components.Constructor(a7.components.View, [props], true);

  menu.state = { menuItems: props.menuItems };

	menu.eventHandlers = {
    handleClick: function( event ){
      a7.events.publish( event.target.attributes['data-action'].value );
    }
	};

  menu.template = function(){
    var str = `<nav><ul>`
    menu.state.menuItems.forEach( function( item ){
      str += `<li data-onclick="handleClick" data-action="${item.action}">${item.label}</li>`;
    });
    str += `</ul></nav>`;
		return str;
	};
  return menu;
};
