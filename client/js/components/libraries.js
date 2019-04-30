import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';

export var Libraries = function Libraries(props) {
  var libraries = a7.components.Constructor(a7.components.View, [props], true);

  libraries.state = {
    libraries: []
  };

  libraries.template = function(){
		let templ = `<form>
                  <input type="text" name="name" placeholder="Name - e.g. jQuery 3.4.0"/><br/>
                  <input type="text" name="link" placeholder="URI - e.g. https://code.jquery.com/jquery-3.4.0.min.js"/><br/>
                  <button type="button" data-onclick="addLibrary">Save</button>
                  `;

    templ +=`<ul>`;
    libraries.state.libraries.forEach( function( library ){
      templ += `<li><input type="checkbox" name="libraryID" value="${library.libraryID}" data-link="${library.link}" data-onClick="setLibrary"/>${library.name}</li>`;
    });
    templ += `</ul></form>`;
    return templ;
	};

	libraries.eventHandlers = {
    addLibrary: function( event ){
      a7.events.publish( "library.create", {
        name: document.querySelector( libraries.props.selector + " input[name='name']" ).value,
        link: document.querySelector( libraries.props.selector + " input[name='link']" ).value,
      });
    },
    setLibrary: function( event ){
      let activeLibs = a7.model.get( "activeLibraries" ) || [];
      if( event.currentTarget.checked ){
        let lib = libraries.state.libraries.find( function( library ){
          return library.libraryID === parseInt( event.currentTarget.value, 10 );
        });
        activeLibs.push( lib );
      }else{
        for( var ix = 0; ix < activeLibs.length; ix++ ){
          if( activeLibs.libraryID === parseInt( event.currentTarget.value, 10 ) ){
            activeLibs.splice( ix, 1 );
            return true;
          }
        }
      }
      a7.model.set( "activeLibraries", activeLibs );
    }
	};

  return libraries;
}
