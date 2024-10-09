import {a7} from '/lib/altseven/dist/a7.js';
import {Editor} from '/js/view/editor.js';
import * as utils from '/js/app.utils.js';
import {ButtonBar} from '/js/view/buttonbar.js';
import {tabs as gtabs,constructor} from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var Tabs = function Tabs(props){
  const tabs =  a7.components.Constructor(a7.components.View, [props], true);
  tabs.state = {
  };

  tabs.template = function(){
    let templ = `<div id="btnwrapper">
						<div id="cmdButtons">
						<a title="Save" name="save" data-onclick="saveApp">
							<svg class="feather">
							<use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#save"/>
							</svg>
						</a>
						<a title="Download" name="save" data-onclick="DownloadApp">
							<svg class="feather">
							<use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#download"/>
							</svg>
						</a>
						<a title="Delete" name="save" data-onclick="deleteApp">
							<svg class="feather">
							<use xlink:href="/lib/feather-icons/dist/feather-sprite.svg#trash"/>
							</svg>
						</a>
					</div>
					<div id="msgs">
					</div>
				</div>
				<div class="tabs">
                <div style="display:inline;" id="editorTabs">
                    <div name="JSEditor" data-tab="JSEditor">JavaScript</div>
                    <div name="HTMLEditor" data-tab="HTMLEditor">HTML</div>
                    <div name="CSSEditor"  data-tab="CSSEditor">CSS</div>
                </div>
                <div id="buttonBar" class="buttonBar"></div>
                </div>
                <div id="HTMLEditor" class="editor"></div>
                <div id="CSSEditor" class="editor"></div>
                <div id="JSEditor" class="editor"></div>`;

    Editor( { id: 'jseditor', selector: '#JSEditor', modelKey: 'jsCode', mode: 'javascript' } );
    Editor( { id: 'htmleditor', selector: '#HTMLEditor', modelKey: 'htmlCode', mode: 'htmlmixed' } );
    Editor( { id: 'csseditor', selector: '#CSSEditor', modelKey: 'cssCode', mode: 'css' } );
    ButtonBar( { id: 'buttonbar', parentID: tabs.props.id, selector: '#buttonBar', esModule: 0 } );
    return templ;
  };

  tabs.on( "rendered", function(){

    tabs.components.tabs = constructor( gtabs, [ tabs.element.querySelector("#editorTabs"), {} ], true );
    tabs.components.tabs.on( "tabSelected", function( obj, activeTab ){
      console.log( activeTab );
      //a7.ui.getView( activeTab.toLowerCase() ).components.editor.refresh();
    });

    // add modLazy to the iframe so it renders correctly on first execution
    let doc = document.getElementById('iframe').contentWindow.document;
    utils.addModLazy( doc );
    let editorSize = document.querySelector( "#editors" ).getBoundingClientRect();
    a7.model.set( "editorSize", editorSize );

    window.addEventListener( "resize", function( event ){
      console.log( "resize" );
      let editors = document.querySelectorAll( ".editor" );
      let selectedEditor;
      editors.forEach( function( editor ){
        if( editor.id === tabs.components.tabs.activeTab ){
          selectedEditor = editor;
        }
        editor.setAttribute( "style", "display:none;" );
      });
      let editorSize = document.querySelector( "#editors" ).getBoundingClientRect();
      a7.model.set( "editorSize", editorSize );
      if( selectedEditor !== undefined ){
        editors.forEach( function( editor ){
          let display = ( editor.id === selectedEditor.id ? "block" : "none" );
          editor.setAttribute( "style", "display: " + display + ";" );
        });
      }
    });
  });

  tabs.eventHandlers = {
	saveApp: function (event) {
		let app = a7.model.get("app");
		
		if (app.appID === 0) {
			a7.events.publish("apps.create", {
			});
		}
		else {
			let app = a7.model.get( "app" );
			a7.events.publish("apps.update", app);
		}
	},
	deleteApp: function (event) {
		let appID = a7.model.get( "app" ).appID;
		//let appID = event.currentTarget.attributes['data-id'].value;
		let dlg = utils.showDialog(" &nbsp; ", "You are about to delete this app, proceed?",
			[{
				label: 'Yes', click: function () {
					dlg.close();
					a7.events.publish("apps.delete", {
						appID: appID
					});
				}
			},
			{
				label: "No", click: function () {
					dlg.close();
				}
			}
			]);
	},
	newApp: function (event) {
		let user = a7.model.get("user");
		if (apps.isDirty()) {
			let dlg = utils.showDialog(" &nbsp; ", "Your changes will be discarded, proceed?",
				[{
					label: 'Yes', click: function () {
						dlg.close();
						//a7.events.publish( "apps.new", {} );
						a7.router.open('/u/' + user.username + '/app');
					}
				},
				{
					label: "No", click: function () {
						dlg.close();
					}
				}
				]);
		} else {
			a7.router.open('/u/' + user.username + '/app');
		}
	}
  };

  return tabs;
};
