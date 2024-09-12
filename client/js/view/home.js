import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import { lightbox, constructor } from '/lib/gadget-ui/dist/gadget-ui.es.js';


export var Home = function Home(props) {
  var home = a7.components.Constructor(a7.components.View, [props], true);

  home.state = {
    apps: props.apps,
    offset: 0
  };

	home.eventHandlers = {
		signIn: function( event ){
		a7.events.publish( 'auth.showLogin', {} ) ;
		},
		createAccount: function( event ){
			a7.events.publish( 'auth.showSignup' );
		},
		forgotPassword: function( event ){
			a7.events.publish( 'auth.showForgotPassword' );
		}
	};

  home.on( "rendered", function(){
	
	const imageArray = [
		'/img/laceside-userhome.png',
		'/img/laceside-js-editing.png',
		'/img/laceside-sidebar.png'
	];
	
	const lb = constructor( lightbox, [ document.getElementById("homeLightbox"), {images: imageArray, featherPath: "/lib/feather-icons", time: 10000 }], true );
	lb.animate();
  });

  home.template = function(){
    let state = home.getState();

    let templ = `<div class="row">
					<div class="col" width="500">
						<h1>LacesIDE</h1>
				        <a name="signin" data-onclick="signIn">[Sign In]</a>
						<a name="forgotPassword" data-onclick="forgotPassword">[Forgot Password]</a>
						<br> 
						<a name="createAccount" data-onclick="createAccount">[Create Account]</a>
					</div>
				</div>

				<div class="flexrowcentered" style="line-height:10em;">
					<div class="col centered"><h3>Build apps with JavaScript, HTML, and CSS right in your browser</h3></div>
				</div>
				<div class="flexrowcentered">
					<div id="homeLightbox" style="width:70%;">
					</div>
				</div>`;	

    return templ;
	};
  return home;
};
