import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import {menu,constructor} from '/lib/gadget-ui/dist/gadget-ui.es6.js';

export var Header = function Header(props) {
  var header = a7.components.Constructor(a7.components.View, [props], true);

  header.state = {
    user: props.user
  };

	header.eventHandlers = {
		logout: function(){
			a7.events.publish( 'auth.logout', { callback: function(){
        auth.authenticate();
      }}) ;
		},
    showProfile: function(){
      //a7.events.publish( 'profile.show' );
      var currentState = a7.ui.getView('profile').getState();
      a7.ui.getView('profile').setState( { user: currentState.user, visible: true, activeTab: currentState.activeTab } );
    }
	};

  header.on( "rendered", function(){
    let profilePic = header.getState().user.profilePic || '/img/profilePics/anon.png';
    /* if( header.state.user.profilePic !== null ){
      profilePic = '/img/profilePics/' + header.state.user.profilePic;
    } */
    let menuData = [
      { image: profilePic,
					menuItem:{
						items:[
							{ label: "Profile",
								link: header.eventHandlers.showProfile },
							{ label: "Sign out",
								link: header.eventHandlers.logout }
						]
					}}
    ];

    var md = constructor( menu, [ document.querySelector("#profileMenu"), { data: menuData } ] );
  });

  header.template = function(){
		return `<div class="profileHeader" id="profileMenu"></div>`;
	};
  return header;
};
