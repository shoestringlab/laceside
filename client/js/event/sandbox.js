import { a7 } from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';

export var sandboxEvents = function init() {

	a7.events.subscribe("sandbox.execute", function (obj) {
		a7.ui.views['console'].setState({ consoleText: '' });
		let jsCode = a7.model.get('jsCode') || '';
		let htmlCode = a7.model.get('htmlCode') || '';
		let cssCode = a7.model.get('cssCode') || '';

		var doc = document.getElementById('iframe').contentWindow.document;
		let libs = doc.querySelectorAll(".jsapp");
		// get any third party libraries specified
		if (libs !== null) {
			libs.forEach(function (lib) {
				doc.head.removeChild(lib);
			});
		}
		let styles = doc.querySelectorAll("style");
		if (styles !== null) {
			styles.forEach(function (style) {
				doc.head.removeChild(style);
			});
		}
		let activeLibraries = a7.model.get("activeLibraries");

		let scriptTags = [];

		// add activeLibraries to the page
		if (activeLibraries && activeLibraries.length) {
			let cssLinks = activeLibraries.filter(library => library.link.endsWith(".css")).map(library => library.link);
			let jslinks = activeLibraries.filter(library => library.link.endsWith(".js")).map(library => library.link).join("','");
			// css gets added as link tags
			cssLinks.forEach(function (link) {
				scriptTags = utils.addTag(scriptTags, doc, 'link', link);
			});
			// js activeLibraries get added via modlazy
			if (jslinks.length) {
				utils.addModLazy(doc);

				let mlScript = `modlazy.load(['${jslinks}'], function(){
          ${jsCode}
        });`;

				scriptTags = utils.addTag(scriptTags, doc, 'script', '', mlScript);
			} else {
				scriptTags = utils.addTag(scriptTags, doc, 'script', '', jsCode);
			}
		} else {
			// no third party libraries (except possibly ES modules)
			scriptTags = utils.addTag(scriptTags, doc, 'script', '', jsCode);
		}

		// add html
		doc.body.innerHTML = htmlCode;

		// inline css
		if (cssCode.length) {
			let styleTag = doc.createElement("style");
			styleTag.innerText = cssCode;
			doc.head.appendChild(styleTag);
		}
		// all script tags
		scriptTags.forEach(function (tag) {
			doc.head.appendChild(tag);
		});

	});
};
