import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';

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
      a7.events.publish( 'profile.show' );
    }
	};

  header.template = function(){
    let profilePic = '/img/profilePics/anon.png';
    if( header.state.user.profilePic !== null ){
      profilePic = '/img/profilePics/' + header.state.user.profilePic;
    }
		return `<div class="profileHeader"><a name="profileLink"  data-onmouseover="showMenu"><img class="profilePic_small" src="${profilePic}"></a> <a name="signout" data-onclick="logout">[ Sign out ]</a></div>`;
	};
  return header;
}
