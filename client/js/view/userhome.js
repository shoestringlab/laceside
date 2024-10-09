import { a7 } from '/lib/altseven/dist/a7.js';
import {UserApps} from '/js/view/userapps.js';
import {UserLibs} from '/js/view/userlibs.js';
import * as utils from '/js/app.utils.js';
import { tabs, constructor } from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var UserHome = function UserHome(props) {
	var userHome = a7.components.Constructor(a7.components.View, [props], true);

	userHome.state = {activeTab: 'userApps'};

	userHome.eventHandlers = {
		
	};

	userHome.on("rendered", function () {
		let state = userHome.getState();
		userHome.components.tabs = constructor(tabs, [userHome.element.querySelector("#userTabs"), {}], true);
		userHome.components.tabs.setActiveTab(state.activeTab);
		/* userHome.components.tabs.on("tabSelected", function (obj, activeTab) {
			state.activeTab = activeTab;
			userHome.setState( state );
		});
 		*/
		// skip rendering from now on because this view is just a shell
		userHome.skipRender = true;
		UserApps({ id: "userApps", parentID: userHome.props.id, selector: "#userApps" });
		UserLibs({ id: "userLibs", parentID: userHome.props.id, selector: "#userLibs" });
	});

	userHome.template = function () {
		
		let state = userHome.getState();


		let templ = `<div class="tabs">
					<div style="display:inline;" id="userTabs">
						<div name="userApps" data-tab="userApps">Applications</div>
						<div name="userLibs" data-tab="userLibs">Libraries</div>
					</div>
					</div>
			
					<div id="userApps" class="panel">
					</div>
					<div id="userLibs" class="panel">
					</div>`;

		return templ;
	};
	return userHome;
};
