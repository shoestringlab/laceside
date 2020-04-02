import {a7} from '/lib/altseven/dist/a7.js';

export var Menu = function Menu(props) {
  var menu = a7.components.Constructor(a7.components.View, [props], true);

  menu.state = { menuItems: props.menuItems };

	menu.eventHandlers = {
    handleClick: function( event ){
      a7.router.open( event.target.attributes['data-path'].value );
    }
	};

  menu.template = function(){
    let str = `<nav><ul>`
    let idx = 1;
    menu.state.menuItems.forEach( function( item ){
      if( idx === 1 ){
        str += `<li data-onclick="handleClick" data-path="${item.path}">${item.label}</li>`;
      }else{
        str += `<li class="menuItem" data-onclick="handleClick" data-path="${item.path}">${item.label}</li>`;
      }
      idx++;
    });
    str += `</ul></nav>`;
		return str;
	};
  return menu;
};
