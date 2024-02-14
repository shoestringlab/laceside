import {a7} from '/lib/altseven/dist/a7.js';
import {Paging} from '/js/view/paging.js';

export var UserHome = function UserHome(props) {
  var userHome = a7.components.Constructor(a7.components.View, [props], true);

  userHome.state = {
    user: props.user,
    apps: props.apps,
    offset: 0,
    showNewAppForm: props.showNewAppForm || false
  };

	userHome.eventHandlers = {
    editApp: function( event ){
      let state = userHome.getState();

      a7.router.open( '/u/' + state.user.username + '/' + event.currentTarget.attributes['data-id'].value );
    },
    showIde:function( event ){
      let state = userHome.getState();
      a7.router.open( '/u/' + state.user.username + '/0' );
    },
    createApp: function(event){
      let state = userHome.getState();
      state.showNewAppForm = true;
      userHome.setState( state );
    },
    saveNewApp: function( event ){
      let obj = {};
      obj.name = userHome.element.querySelector( 'input[name="name"]' ).value;
      a7.events.publish( "apps.create", obj );
    },
    cancelNewApp: function(event){
      let state = userHome.getState();
      state.showNewAppForm = false;
      userHome.setState( state );
    }
	};

  userHome.on( "rendered", function(){

  });

  userHome.template = function(){
    let appUser =  a7.model.get( "appUser" );
    let user = a7.model.get( "user" );
    let state = userHome.getState();
		let templ = `<div id="userPanel" class="panel">

                  <h3>Applications</h3>`;

    if( user.userID === appUser.userID ){
      console.log('foo');
      if( state.showNewAppForm ){
        templ +=`<div class="block row link"><input name="name" placeholder="Application Name">
                  <button type="button" data-onclick="saveNewApp">Save</button>
                  <button type="button" data-onclick="cancelNewApp">Cancel</button>
                  </div>`;
      }else{
        templ +=`<div class="block row link" data-onClick="createApp">[Create a New Application]</div>`;
      }
    }
    templ += `</div>
                <div id="userApps" class="panel"><div class="col">
             `;

    let offset = parseInt( state.offset, 10 );

    if( state.apps.length ){
      for( var ix = offset; ix < Math.min( state.apps.length, state.offset + 10 ); ix++ ){
        let app = state.apps[ix];
        templ += `<div class="block row link" data-id="${app.appID}" data-onClick="editApp">${app.name}</div>`;
        if( ix - offset === 4 && state.apps.length > 5 ){
          templ += `</div><div class="col">`;
        }
      }
    }

    templ+=`</div><div class="paging"></div></div>
            <div id="userInfo">
              <div class="right-align">
              <img style="max-width:100px;" src="${state.user.profilePic || '/img/profilePics/anon.png'}"/>
              <br><br>
              <span class="title">${state.user.nickName}</span>
              </div>
            </div>
            `;
    if( state.apps.length ){
      Paging( { id: 'userHomeAppsPaging', parentID: userHome.props.id, selector: userHome.props.selector + ' div.paging', records: state.apps, offset: offset, pageSize: 10 } );
    }
    return templ;
	};
  return userHome;
};
