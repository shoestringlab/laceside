import {a7} from '/lib/altseven/dist/a7.js';
import {Editor} from '/js/components/editor.js';
import * as utils from '/js/app.utils.js';

export var Tabs = function Tabs(props){
  const tabs =  a7.components.Constructor(a7.components.View, [props], true);
  tabs.state = { tabs: ['HTMLEditor','CSSEditor','JSEditor'] };

  tabs.template = function(){
    let templ = `<div class="tabs"><div name="JSEditor" data-onclick="selectTab" data-tab="JSEditor">JavaScript</div><div name="HTMLEditor" data-onclick="selectTab" data-tab="HTMLEditor">HTML</div><div name="CSSEditor" data-onclick="selectTab" data-tab="CSSEditor">CSS</div></div>
                  <div id="HTMLEditor" class="editor"></div>
                  <div id="CSSEditor" class="editor"></div>
                  <div id="JSEditor" class="editor"></div>`;

    Editor( { id: 'jseditor', selector: '#JSEditor', modelKey: 'jsCode', mode: 'javascript' } );
    Editor( { id: 'htmleditor', selector: '#HTMLEditor', modelKey: 'htmlCode', mode: 'htmlmixed' } );
    Editor( { id: 'csseditor', selector: '#CSSEditor', modelKey: 'cssCode', mode: 'css' } );

    return templ;
  };

  tabs.on( "rendered", function(){
    document.querySelector( tabs.props.selector + " div.tabs div[name='JSEditor']" ).style.backgroundColor = '#99f';

    // add modLazy to the iframe so it renders correctly on first execution
    let doc = document.getElementById('iframe').contentWindow.document;
    utils.addModLazy( doc );
  });

  tabs.eventHandlers = {
    selectTab: function( event ){
      let currentTab = event.currentTarget.attributes['data-tab'].value;
      a7.events.publish( "tabs.setTab", { tab: currentTab } );
    }
  };

  return tabs;
}
