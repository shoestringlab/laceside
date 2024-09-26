import { a7 } from '/lib/altseven/dist/a7.js';
import { util } from '/lib/gadget-ui/dist/gadget-ui.es.js';

var _mode = "home";

export var ui = (function () {
	"use strict";

	return {
		//	templates: _templates,
		setLayout: function (mode) {
			let secure = (a7.model.get("user").userID != '0');
			_mode = mode;

			switch (mode) {
				case "ide":
					//a7.ui.getNode( a7.ui.selectors['sandBox'] ).style.display='grid';
					//a7.ui.getNode( a7.ui.selectors["ide"] ).classList.remove( "hidden" );
					a7.ui.getNode(a7.ui.getSelector("userHome")).classList.add("hidden");
					a7.ui.getNode(a7.ui.getSelector("home")).classList.add("hidden");

					/* 		  a7.ui.getNode( a7.ui.selectors["editors"] ).classList.remove( "hidden" );
							  a7.ui.getNode( a7.ui.selectors["htmlFrame"] ).classList.remove( "hidden" ); */
					//a7.ui.getNode( a7.ui.selectors["sidebar"] ).parentNode.classList.remove( "hidden" );
					a7.ui.getNode(a7.ui.selectors["app"]).classList.remove("hidden");
					break;
				case "home":
					a7.ui.getNode(a7.ui.getSelector("home")).classList.remove("hidden");
					a7.ui.getNode(a7.ui.getSelector("userHome")).classList.add("hidden");
					a7.ui.getNode(a7.ui.selectors["app"]).classList.add("hidden");
					/* 		  a7.ui.getNode( a7.ui.selectors["editors"] ).classList.add( "hidden" );
							  a7.ui.getNode( a7.ui.selectors["htmlFrame"] ).classList.add( "hidden" ); */
					//a7.ui.getNode( a7.ui.selectors["sidebar"] ).parentNode.classList.add( "hidden" );
					break;
				case "userhome":
					/* a7.ui.getNode("#home").style.display = 'none';
					a7.ui.getNode("#app").style.display = 'none';
					a7.ui.getNode("#sidebar").parentNode.style.display = 'none';
					a7.ui.getNode("#userHome").style.display = 'block'; */
					document.getElementById("home").classList.add("hidden");
					document.getElementById("app").classList.add("hidden");
					//document.getElementById("sidebar").parentNode.classList.add( "hidden" );
					document.getElementById("userHome").classList.remove("hidden");
					/* 	a7.ui.getNode( a7.ui.getSelector("home") ).classList.add( "hidden" );
					a7.ui.getNode( a7.ui.getSelector("userHome") ).classList.remove( "hidden" );
					a7.ui.getNode( a7.ui.selectors["app"] ).classList.add( "hidden" );
					a7.ui.getNode( a7.ui.selectors["sidebar"] ).parentNode.classList.add( "hidden" ); */
					break;
				default:

					break;
			}
		},
		getMode: function(){
			return _mode;
		}
	};
})();
