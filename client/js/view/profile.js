import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import {checkPasswordStrength} from '/js/app.utils.js';
import {fileuploader,modal,tabs,constructor} from '/lib/gadget-ui/dist/gadget-ui.mjs';

export var Profile = function Profile(props) {
  var profile = a7.components.Constructor(a7.components.View, [props], true);

  profile.components.modal = constructor( modal,
          [ document.querySelector("#profileModal"),
            {autoOpen: false, featherPath: '/lib/feather-icons'}], true ) ;

  profile.components.modal.on( "closed", function( obj ){
    a7.router.open( "/u/" + profile.getState().user.username );
    //history.back();
  });

  profile.state = {
    user: props.user,
    visible: false,
    passwordIsValid: false,
    passwordMatches: false,
    currentPasswordMatches: false,
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
      user.emailAddress = profile.element.querySelector( "input[name='emailAddress']" ).value;
      a7.events.publish( "user.update", user );
    },
    discardChanges: function( event ){
      let user = profile.getState().user;
      profile.element.querySelector( "input[name='firstname']" ).value = user.firstName;
      profile.element.querySelector( "input[name='lastname']" ).value = user.lastName;
      profile.element.querySelector( "input[name='nickname']" ).value = user.nickName;
      profile.element.querySelector( "input[name='emailAddress']" ).value = user.emailAddress;
    },
    checkCurrentPassword: function( event ){
      profile.skipRender = true;
      let user = profile.getState().user;
      a7.remote.invoke( "user.checkPassword", { username: user.username, currentPassword: event.currentTarget.value } )
        .then( function( response ) {
          // get json response and pass to handler to resolve
          return response.json();
        })
        .then( function( valid ){
          let dv = profile.element.querySelector( "#currentPasswordMatches" );
          let html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/check-8x.png" title="check.png" height="20">`;
          if( ! valid ){
            html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/x-8x.png" title="x.png" height="20">`;
          }
          dv.innerHTML = html;
          profile.setState( Object.assign( profile.getState(), { currentPasswordMatches: valid } ) );
        });
    },
    checkPasswordStrength: function( event ){
      profile.skipRender = true;
      let cls = ["Weak","Medium","Strong"];
      let password = profile.element.querySelector( "input[name='newPassword']" ).value;
      let strength = checkPasswordStrength( password );
      let pvs = profile.element.querySelector( "#newPasswordValidator span" );
      pvs.classList.remove( ...cls );
      pvs.classList.add( strength.value );
      pvs.innerText = strength.value;
      let valid = false;
      if( password.trim().length > 5 ){
        valid = true;
      }
      profile.setState( Object.assign( profile.getState(), { passwordIsValid: valid } ) );
    },
    checkPasswordMatch: function( event ){
      profile.skipRender = true;
      let valid = ( profile.element.querySelector( "input[name='newPassword']" ).value === profile.element.querySelector( "input[name='newPasswordConfirm']" ).value );
      let dv = profile.element.querySelector( "#newPasswordMatched" );
      let html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/check-8x.png" title="check.png" height="20">`;
      if( ! valid ){
        html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/x-8x.png" title="x.png" height="20">`;
      }
      dv.innerHTML = html;
      profile.setState( Object.assign( profile.getState(), { passwordMatches: valid } ) );
    },
    changePassword: function( event ){
      let user = profile.getState().user;
      a7.events.publish( "user.changePassword", { user: user, newPassword: profile.element.querySelector( "input[name='newPassword']" ).value } );
    },
    refresh: function( event ){
      a7.events.publish( "profile.refreshProfile" );
    }
	};

  profile.template = function(){
    if( profile.state.user.userID === a7.model.get( "user" ).userID ){
  		return `
        <h2>Profile</h2>
        <form>
        <div id="profileContainer">
      		<div id="profileTabs">
      			<div data-tab="pTab1">Basic Info</div>
            <div data-tab="pTab2">Password</div>
      			<div data-tab="pTab3">Profile Picture</div>
      		</div><div class="vcontentContainer">
      			<div id="pTab1">
              <div class="vtabContent form">
                <div>
                  <div class="col w10 right-align label">First Name</div>
                  <div class="col w20"><input name="firstname" type="text" placeholder="First Name" value="${profile.state.user.firstName || ''}"></div>
                </div>
                <div>
                  <div class="col w10 right-align label">Last Name</div>
                  <div class="col w20"><input name="lastname" type="text" placeholder="Last Name" value="${profile.state.user.lastName || ''}"></div>
                </div>
                <div>
                  <div class="col w10 right-align label">Nickname</div>
                  <div class="col w20"><input name="nickname" type="text" placeholder="Nickname" value="${profile.state.user.nickName || ''}"></div>
                </div>
                <div>
                  <div class="col w10 right-align label">Email</div>
                  <div class="col w20"><input name="emailAddress" type="text" placeholder="Email" value="${profile.state.user.emailAddress || ''}"></div>
                </div>
                <div>
                  <div class="col w10 right-align label">Username</div>
                  <div class="col w20"><input name="username" type="text" placeholder="username"  value="${profile.state.user.username || ''}" readonly></div>
                </div>
                <div>
                  <div><button name="save" type="button" data-onclick="updateUser">Save Changes</button>
                  <button name="discard" type="button" data-onclick="discardChanges">Discard</button></div>
                </div>
              </div>
            </div>
            <div id="pTab2">
              <div class="vtabContent form">
                <div>
                  <div class="col w10 right-align label">Current Password</div>
                  <div class="col w20"><input name="currentPassword" type="password" autocomplete="off" placeholder="Current password" data-onchange="checkCurrentPassword"></div>
                  <div class="col w5" id="currentPasswordMatches"></div>
                </div>
                <div>
                  <div class="col w10 right-align label">New Password</div>
                  <div class="col w20"><input name="newPassword" type="password" placeholder="New password" data-onchange="checkPasswordStrength"></div>
                  <div class="col w5" id="newPasswordValidator"><span></span></div>
                </div>
                <div>
                  <div class="col w10 right-align label">New Password (confirm)</div>
                  <div class="col w20"><input name="newPasswordConfirm" type="password" placeholder="New password (confirm)" data-onchange="checkPasswordMatch"></div>
                  <div class="col w5" id="newPasswordMatched"></div>
                </div>
                <div>
                  <div><button name="save" type="button" data-onclick="changePassword">Save Changes</button>
                  <button name="discard" type="button" data-onclick="discardChanges">Discard</button></div>
                </div>
              </div>
            </div>
      			<div id="pTab3">
              <div class="vtabContentSplit">
                <div id="profilePicUploadDiv"></div>
                <div class="right-align"><img style="max-width:300px;" src="${profile.state.user.profilePic || '/img/profilePics/anon.png'}"/></div>
              </div>
            </div>
      		</div>
      	</div>
        </form>
      `;
    }else{
      return ``;
    }
	};

  profile.on( "rendered", function(){

    // make sure to add true as 3rd argument to add bindings so we can listen for tabSelected event to get the current tab
    profile.components.ptabs = constructor( tabs, [ document.querySelector("#profileTabs"), { direction: 'vertical' } ], true );

    profile.components.ptabs.setActiveTab( profile.getState().activeTab );

    profile.components.ptabs.on( "tabSelected", function( obj ){
      profile.state.activeTab = obj.activeTab;
      //console.log( obj.activeTab );
    });

    let profileContainer = document.querySelector( "#profileContainer" );

    let options = {
      uploadURI: "/api/files",
      tags: "file upload",
      willGenerateThumbnails: true,
      title: "Upload Profile Pic",
      showUploadButton: false,
      dropMessage: "Drop Picture Here",
      onUploadComplete: profile.eventHandlers.updatePic
    };

    profile.components.fileuploader = constructor( fileuploader, [ profileContainer.querySelector("#profilePicUploadDiv"), options ]);
/*     if( profile.getState().visible ){
      document.querySelector( "#profileModal" ).parentElement.classList.add( 'gadgetui-showModal' );
    } */
  });

  return profile;
};
