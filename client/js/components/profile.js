import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import {fileuploader,modal,tabs,textinput,constructor} from '/lib/gadget-ui/dist/gadget-ui.es6.js';

export var Profile = function Profile(props) {
  var profile = a7.components.Constructor(a7.components.View, [props], true);

  profile.state = {
    user: props.user,
    visible: false,
    activeTab: 'pTab1'
  };

	profile.eventHandlers = {
    updatePic: function( file ){
        let user = profile.getState().user;
        user.profilePic = file.path + file.filename;
        a7.events.publish( "profile.update", user );
    },
    updateUser: function( event ){
      let user = profile.getState().user;
      user.firstName = profile.element.querySelector( "input[name='firstname']" ).value;
      user.lastName = profile.element.querySelector( "input[name='lastname']" ).value;
      user.nickName = profile.element.querySelector( "input[name='nickname']" ).value;
      a7.events.publish( "user.update", user );
    },
    discardChanges: function( event ){
      let user = profile.getState().user;
      profile.element.querySelector( "input[name='firstname']" ).value = user.firstName;
      profile.element.querySelector( "input[name='lastname']" ).value = user.lastName;
      profile.element.querySelector( "input[name='nickname']" ).value = user.nickName;
    },
    refresh: function( event ){
      a7.events.publish( "profile.refreshProfile" );
    }
	};

  profile.template = function(){
		return `
      <h2>Profile</h2>
      <form>
      <div id="profileContainer">
    		<div id="profileTabs">
    			<div data-tab="pTab1">Basic Info</div>
    			<div data-tab="pTab2">Profile Picture</div>
    		</div><div class="vcontentContainer">
    			<div id="pTab1">
            <div class="vtabContent form">
              <div class="right-align label">First Name</div>
              <div><input name="firstname" type="text" placeholder="First Name" value="${profile.state.user.firstName}"></div>

              <div class="right-align label">Last Name</div>
              <div><input name="lastname" type="text" placeholder="Last Name" value="${profile.state.user.lastName}"></div>

              <div class="right-align label">Nickname</div>
              <div><input name="nickname" type="text" placeholder="Nickname" value="${profile.state.user.nickName}"></div>

              <div class="right-align label">Username</div>
              <div><input name="username" type="text" placeholder="username"  value="${profile.state.user.username}" readonly></div>

              <div></div>
              <div><button name="save" type="button" data-onclick="updateUser">Save Changes</button>
              <button name="discard" type="button" data-onclick="discardChanges">Discard</button></div>
            </div>
          </div>
    			<div id="pTab2">
            <div class="vtabContent">
              <div id="profilePicUploadDiv"></div>
              <div class="right-align"><img style="max-width:300px;" src="${profile.state.user.profilePic}"/></div>
            </div>
          </div>
    		</div>
    	</div>
      </form>
    `;
	};

  profile.on( "rendered", function(){

    // make sure to add true as 3rd argument to add bindings so we can listen for tabSelected event to get the current tab
    let ptabs = constructor( tabs, [ document.querySelector("#profileTabs"), { direction: 'vertical' } ], true );

    ptabs.setActiveTab( profile.getState().activeTab );

    ptabs.on( "tabSelected", function( obj ){
      profile.state.activeTab = obj.activeTab;
      //console.log( obj.activeTab );
    });

    let profileContainer = document.querySelector( "#profileContainer" );

    let options = {
      uploadURI: "/files",
      tags: "file upload",
      willGenerateThumbnails: true,
      title: "Upload Profile Pic",
      showUploadButton: false,
      dropMessage: "Drop Picture Here",
      onUploadComplete: profile.eventHandlers.updatePic
    };

    let fd = constructor( fileuploader, [ profileContainer.querySelector("#profilePicUploadDiv"), options ]);
/*     if( profile.getState().visible ){
      document.querySelector( "#profileModal" ).parentElement.classList.add( 'gadgetui-showModal' );
    } */
  });

  return profile;
};
