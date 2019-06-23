import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';

export var Profile = function Profile(props) {
  var profile = a7.components.Constructor(a7.components.View, [props], true);

  profile.state = {
    user: props.user,
    visible: false
  };

	profile.eventHandlers = {
    close: function(){
      profile.setState( { user: profile.state.user, visible: false } );
    }
	};

  profile.template = function(){
		return `<div class="titlebar"><span name="title" class="title">Profile</span>
              <span name="close" class="right-align">
              <a name="close">
              <svg class="feather">
                <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#x-circle"/>
              </svg>
              </a>
              </span>
              </div>
              <div id="profileBody">

              </div>`;
	};

  profile.on( "rendered", function(){
    if( profile.state.visible ){
      profile.element.classList.add( "show-modal" );
    }else{
      profile.element.classList.remove( "show-modal" );
    }
  });

  return profile;
}
