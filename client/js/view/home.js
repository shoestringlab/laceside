import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';

export var Home = function Home(props) {
  var home = a7.components.Constructor(a7.components.View, [props], true);

  home.state = {
    apps: props.apps,
    offset: 0
  };

	home.eventHandlers = {
    signIn: function( event ){
      a7.events.publish( 'auth.showLogin', {} ) ;
    }
	};

  home.on( "rendered", function(){

  });

  home.template = function(){
    let state = home.getState();

    let templ = `<h3>JS Sandbox Home</h3>
                  <a name="signin" data-onclick="signIn">[Sign In]</a>

                `;

    return templ;
	};
  return home;
};
