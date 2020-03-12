import {a7} from '/lib/altseven/dist/a7.js';
import {Paging} from '/js/components/paging.js';

export var UserHome = function UserHome(props) {
  var userHome = a7.components.Constructor(a7.components.View, [props], true);

  userHome.state = {
    user: props.user,
    apps: props.apps,
    offset: 0
  };

	userHome.eventHandlers = {
    editApp: function( event ){
      a7.events.publish( "ide.show", {
        appID: event.currentTarget.attributes['data-id'].value
      });
    }
	};

  userHome.on( "rendered", function(){

  });

  userHome.template = function(){
    let state = userHome.getState();
		let templ = `<h3>${state.user.nickName}</h3>`;

    let offset = parseInt( state.offset, 10 );

    for( var ix = offset; ix < Math.min( state.apps.length, state.offset + 5 ); ix++ ){
      let app = state.apps[ix];
      templ += `<div class="row"><a data-id="${app.appID}" data-onClick="editApp"/>${app.name}</a></div>`;
    }
    templ+=`<div class="paging"></div>`;
    Paging( { id: 'userHomeAppsPaging', parentID: userHome.props.id, selector: userHome.props.selector + ' div.paging', records: state.apps, offset: offset } );

    return templ;
	};
  return userHome;
};
