import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';

export var Apps = function Apps(props) {
  var apps = a7.components.Constructor(a7.components.View, [props], true);

  apps.state = {
    apps: [],
    app: props.app || { appID: 0, name: "" }
  };

  apps.template = function(){
		let templ = `<form>
                  <input type="text" name="name" placeholder="Application Name" value="${apps.state.app.name}"/><br/>
                  <button type="button" data-onclick="saveApp">Save</button>
                  <button type="button" data-onclick="newApp">New</button>
                  </form>`;

    apps.state.apps.forEach( function( app ){
      templ += `<div class="row"><a data-id="${app.appID}" data-onClick="loadApp"/>${app.name}</a> <a name="trash" data-id="${app.appID}" data-onclick="deleteApp"><svg class="feather">
                  <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#trash"/>
                </svg></a></div>`;
    });
    return templ;
	};

	apps.eventHandlers = {
    saveApp: function( event ){
      if( apps.state.app.appID === 0 ){
        a7.events.publish( "app.create", {
          name: document.querySelector( apps.props.selector + " input[name='name']" ).value
        });
      }
      else{
        a7.events.publish( "app.update", {
          name: document.querySelector( apps.props.selector + " input[name='name']" ).value,
          appID: apps.state.app.appID
        });
      }
    },
    deleteApp: function( event ){
      a7.events.publish( "app.delete", {
        appID: event.currentTarget.attributes['data-id'].value
      });
    },
    loadApp: function( event ){
      a7.events.publish( "app.load", {
        appID: event.currentTarget.attributes['data-id'].value
      });
    },
    newApp: function( event ){
      a7.events.publish( "app.new", {} );
    }
	};

  return apps;
}
