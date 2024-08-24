import {a7} from '/lib/altseven/dist/a7.js';
import {menu,constructor} from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var Header = function Header(props) {
  var header = a7.components.Constructor(a7.components.View, [props], true);

  header.state = {
    user: props.user
  };

	header.eventHandlers = {
		logout: function(){
			a7.events.publish( 'auth.logout', {
        success: "/auth/logoutsuccess",
        failure: "/auth/logoutfailure"
      }) ;
		},
    showProfile: function(){
      //a7.events.publish( 'profile.show' );
      a7.router.open( '/u/' + header.getState().user.username + '/profile', { userID: header.getState().user.userID } );
    },
    signIn: function( event ){
      a7.events.publish( 'auth.showLogin', {} ) ;
    },
    createAccount: function( event ){
      a7.events.publish( 'auth.showSignup', {} ) ;
    }
	};

  header.on( "rendered", function(){
    let state = header.getState();
    let profilePic = state.user.profilePic || '/img/profilePics/anon.png';
    /* if( header.state.user.profilePic !== null ){
      profilePic = '/img/profilePics/' + header.state.user.profilePic;
    } */
    let items = [];
    if( state.user.userID ){
      items = [
        { label: "Profile",
          link: header.eventHandlers.showProfile },
        { label: "Sign out",
          link: header.eventHandlers.logout }
      ];
    }else{
      items = [
        { label: "Create Account",
          link: header.eventHandlers.createAccount },
        { label: "Sign In",
          link: header.eventHandlers.signIn }
      ];
    }

    let menuData = [
      { image: profilePic,
					menuItem:{
						items: items
					}}
    ];

    header.components.menu = constructor( menu, [ document.querySelector("#profileMenu"), { data: menuData } ] );
  });

  header.template = function(){
		return `<div class="profileHeader" id="profileMenu"></div>`;
	};
  return header;
};
