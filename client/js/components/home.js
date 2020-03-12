import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';

export var Home = function Home(props) {
  var home = a7.components.Constructor(a7.components.View, [props], true);

  home.state = {
    user: props.user,
    apps: props.apps,
    offset: 0
  };

	home.eventHandlers = {
    
	};

  home.on( "rendered", function(){

  });

  home.template = function(){
    let state = home.getState();

    let templ = `<h3>JS Sandbox Home</h3>`;

    return templ;
	};
  return home;
};
