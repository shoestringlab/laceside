import {a7} from '/lib/altseven/dist/a7.js';

export var Paging = function Paging(props) {
  var paging = a7.components.Constructor(a7.components.View, [props], true);

  paging.state = {
    offset: props.offset || 0,
    records: props.records || []
  };

	paging.eventHandlers = {
    page: function( event ){
      let offset = parseInt( event.currentTarget.attributes['data-offset'].value, 10 );
      let pState = paging.getState();
      pState.offset = offset;
      paging.setState( pState );

      let state = paging.getParent().getState();
      state.offset = offset;
      paging.getParent().setState( state );
    }
	};

  paging.on( "rendered", function(){

  });

  paging.template = function(){
    let templ = ``;
    let offset = parseInt( paging.state.offset, 10 );
    a7.log.trace( "paging offset: " + offset );
    if( paging.state.records.length > 5 ){
      templ=`<div class="paging">`;
      if( offset > 0 ){
        templ += `<span><a name="previousPage" data-onclick="page" data-offset="${Math.max( 0, paging.state.offset - 5 )}">
                  <svg class="feather">
                    <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#chevron-left"/>
                  </svg>
                  </a></span>`;
      }

      templ+=`<span>${offset+1}-${Math.min(offset+5, paging.state.records.length)} of ${paging.state.records.length}</span>`;
      if( paging.state.offset + 5 < paging.state.records.length ){
        templ += `<span><a name="nextPage" data-onclick="page" data-offset="${Math.min( paging.state.records.length - 5, offset + 5 )}">
                  <svg class="feather">
                    <use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#chevron-right"/>
                  </svg>
                  </a></span>`;
      }
      templ+=`</div>`;
    }
    return templ;
	};
  return paging;
};
