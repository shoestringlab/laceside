import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import * as utils from '/js/app.utils.js';
import {Paging} from '/js/view/paging.js';

export var Apps = function Apps(props) {
  var apps = a7.components.Constructor(a7.components.View, [props], true);

  apps.state = {
    apps: [],
    app: props.app || { appID: 0, name: "" },
    offset: 0
  };

  apps.isDirty = function(){
    let isDirty = false;
    let app = apps.state.app;
    let jsCode = a7.model.get( 'jsCode' ) || '';
    let htmlCode = a7.model.get( 'htmlCode' ) || '';
    let cssCode = a7.model.get( 'cssCode' ) || '';
    if( ( app.appID === 0 && ( jsCode.length > 0 || htmlCode.length > 0 || cssCode.length > 0 ) )
          ||
        ( app.appID > 0 && ( app.jsCode !== jsCode || app.htmlCode !== htmlCode || app.cssCode !== cssCode ) )
      ){
        isDirty = true;
    }
    return isDirty;
  };

  apps.template = function(){
    let author =  a7.model.get( "author" );
    let user = a7.model.get( "user" );

    let disabled = ( apps.state.app.name.length > 0 ? '' : 'disabled="disabled"' );
    let offset = parseInt( apps.state.offset, 10 );
    let templ = ``;

    if( user.userID === author.userID ){
		    templ += `<form>
                  <input type="text" name="name" placeholder="Application Name" value="${apps.state.app.name}" data-oninput="checkSavable"/><br/>
                  <button name="save" type="button" data-onclick="saveApp" ${disabled}>Save</button>
                  <button type="button" data-onclick="newApp">New</button>
                  </form>`;
    }

    for( var ix = offset; ix < Math.min( apps.state.apps.length, apps.state.offset + 5 ); ix++ ){
      let app = apps.state.apps[ix];
      if( user.userID === author.userID ){
        templ += `<div class="flexrow"><a data-id="${app.appID}" data-onClick="loadApp"/>${app.name}</a> <a name="trash" data-id="${app.appID}" data-onclick="deleteApp"><svg class="feather">
                  <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#trash"/>
                </svg></a></div>`;
      }else{
        templ += `<div class="flexrow"><a data-id="${app.appID}" data-onClick="loadApp"/>${app.name}</a></div>`;
      }
    }
    templ+=`<div class="paging"></div>`;
    a7.log.trace( "apps offset: " + offset );
    Paging( { id: 'appsPaging', parentID: apps.props.id, selector: apps.props.selector + ' div.paging', records: apps.state.apps, offset: offset } );

    return templ;
	};

	apps.eventHandlers = {
    checkSavable: function( event ){
      if( event.currentTarget.value.trim().length > 0  ){
        apps.element.querySelector( "button[name='save']" ).removeAttribute( "disabled" );
      }else{
        apps.element.querySelector( "button[name='save']" ).setAttribute( 'disabled', 'disabled' );
      }
    },
    saveApp: function( event ){
      let appName = apps.element.querySelector( "input[name='name']" ).value.trim();
      if( appName.length > 0 ){
        if( apps.state.app.appID === 0 ){
          a7.events.publish( "apps.create", {
            name: appName
          });
        }
        else{
          a7.events.publish( "apps.update", {
            name: appName,
            appID: apps.state.app.appID
          });
        }
      }
    },
    deleteApp: function( event ){
      let appID = event.currentTarget.attributes['data-id'].value;
      let dlg = utils.showDialog( " &nbsp; ", "You are about to delete this app, proceed?",
      [{ label: 'Yes', click: function(){
         dlg.close();
         a7.events.publish( "apps.delete", {
           appID: appID
         });
        }},
        { label: "No", click: function(){
          dlg.close();
        }}
      ]);
    },
    loadApp: function( event ){
      let state = apps.getState();
      let user = a7.model.get("author");
      let target = event.currentTarget;
      if( apps.isDirty() ){
        let dlg = utils.showDialog( " &nbsp; ", "Your changes will be discarded, proceed?",
        [{ label: 'Yes', click: function(){
           dlg.close();
           /* a7.events.publish( "apps.load", {
             appID: target.attributes['data-id'].value
           }); */
           a7.router.open( '/u/' + user.username + '/' + event.currentTarget.attributes['data-id'].value );
          }},
          { label: "No", click: function(){
            dlg.close();
          }}
        ]);
      }else{
        /* a7.events.publish( "apps.load", {
          appID: event.currentTarget.attributes['data-id'].value
        }); */
        a7.router.open( '/u/' + user.username + '/' + event.currentTarget.attributes['data-id'].value );
      }
    },
    newApp: function( event ){
      if( apps.isDirty() ){
        let dlg = utils.showDialog( " &nbsp; ", "Your changes will be discarded, proceed?",
        [{ label: 'Yes', click: function(){
           dlg.close();
           a7.events.publish( "apps.new", {} );
          }},
          { label: "No", click: function(){
            dlg.close();
          }}
        ]);
      }else{
        a7.events.publish( "apps.new", {} );
      }
    }
	};

  return apps;
};
