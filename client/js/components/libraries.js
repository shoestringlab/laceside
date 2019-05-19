import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';

export var Libraries = function Libraries(props) {
  var libraries = a7.components.Constructor(a7.components.View, [props], true);

  libraries.state = {
    libraries: [],
    library: props.library || { libraryID: 0, name: "", link: "" },
    activeLibraries: []
  };

  libraries.template = function(){
    let disabled = ( libraries.state.library.name.length > 0 ? '' : 'disabled="disabled"' );
		let templ = `<form>
                  <input type="text" name="name" placeholder="Name - e.g. jQuery 3.4.0" value="${libraries.state.library.name}" data-oninput="checkSavable"/><br/>
                  <input type="text" name="link" placeholder="URI - e.g. https://code.jquery.com/jquery-3.4.0.min.js" value="${libraries.state.library.link}"/><br/>
                  <button type="button" data-onclick="saveLibrary" ${disabled}>Save</button>
                  <button type="button" data-onclick="newLibrary">New</button>
                  `;

    libraries.state.libraries.forEach( function( library ){
      templ += `<div class="row"><div class="inline">
                <input type="checkbox" name="libraryID" value="${library.libraryID}" data-link="${library.link}" data-onClick="setLibrary"/><a name="lib" data-onClick="editLibrary" data-id="${library.libraryID}">${library.name}</a>
                </div>
                <a name="trash" data-id="${library.libraryID}" data-onclick="deleteLibrary">
                  <svg class="feather">
                  <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#trash"/>
                  </svg>
                </a></div>`;
    });
    templ += `</form>`;
    return templ;
	};

  libraries.on( "rendered", function(){
    let libs = libraries.state.activeLibraries;
      if( libs ){
        libraries.state.activeLibraries.forEach( function( activeLib ){
          if( activeLib !== null ){
            document.querySelector( libraries.props.selector + " input[type='checkbox'][value='" + activeLib.libraryID + "']" ).checked = true;
          }
        });
      }
  });

	libraries.eventHandlers = {
    checkSavable: function( event ){
     if( event.currentTarget.value.trim().length > 0  ){
       libraries.element.querySelector( "button[name='save']" ).removeAttribute( "disabled" );
     }else{
       libraries.element.querySelector( "button[name='save']" ).setAttribute( 'disabled', 'disabled' );
     }
   },
    saveLibrary: function( event ){
      if( libraries.state.library.libraryID === 0 ){
        a7.events.publish( "library.create", {
          name: document.querySelector( libraries.props.selector + " input[name='name']" ).value,
          link: document.querySelector( libraries.props.selector + " input[name='link']" ).value,
        });
      }else{
        a7.events.publish( "library.update", {
          libraryID: libraries.state.library.libraryID,
          name: document.querySelector( libraries.props.selector + " input[name='name']" ).value,
          link: document.querySelector( libraries.props.selector + " input[name='link']" ).value,
        });
      }
    },
    editLibrary: function( event ){
      let library = libraries.state.libraries.filter( lib => lib.libraryID == event.currentTarget.attributes['data-id'].value )[0];
      libraries.setState( { libraries: libraries.state.libraries, library: library, activeLibraries: libraries.state.activeLibraries });
    },
    deleteLibrary: function( event ){
      a7.events.publish( "library.delete", {
        libraryID: event.currentTarget.attributes['data-id'].value
      });
    },
    setLibrary: function( event ){
      let activeLibs = a7.model.get( "activeLibraries" ) || [];
      if( event.currentTarget.checked ){
        let lib = libraries.state.libraries.find( function( library ){
          if( library.libraryID === parseInt( event.currentTarget.value, 10 )){
            return library;
          }
        });
        activeLibs.push( lib );
      }else{
        for( var ix = 0; ix < activeLibs.length; ix++ ){
          if( activeLibs[ix].libraryID === parseInt( event.currentTarget.value, 10 ) ){
            activeLibs.splice( ix, 1 );
          }
        }
      }
      a7.model.set( "activeLibraries", activeLibs );
      libraries.setState( { libraries: libraries.state.libraries, library: libraries.state.library, activeLibraries: activeLibs });
    },
    newLibrary: function( event ){
      a7.events.publish( "libraries.new", {} );
    }
	};

  return libraries;
}
