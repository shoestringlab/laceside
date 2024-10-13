import { a7 } from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';

export var sandboxEvents = function init() {

	a7.events.subscribe("sandbox.execute", function (obj) {
		a7.ui.views['console'].setState({ consoleText: '' });
		var app = a7.model.get("app");

		var jsCode = app.jsCode || '';
		var htmlCode = app.htmlCode || '';
		var cssCode = app.cssCode || '';
		var activeLibraries = "";

		var doc = document.getElementById('iframe').contentWindow.document;
		
/* 		var frame = document.getElementById("iframe");
 		var docu = document.implementation.createHTMLDocument("sandbox");
        var destDocument = frame.contentDocument;
        var srcNode = docu.documentElement;
        var newNode = destDocument.importNode(srcNode, true);
        destDocument.replaceChild(newNode, destDocument.documentElement);
		var doc = destDocument;
		var body = document.createElement("body");
		doc.body = body;
		console.log( doc ); */

	/* 		doc.open();
			doc.close(); */
			var libs = doc.querySelectorAll(".jsapp");
			// get any third party libraries specified
			if (libs !== null) {
				libs.forEach(function (lib) {
					doc.head.removeChild(lib);
				});
			}
			var styles = doc.querySelectorAll("style");
			if (styles !== null) {
				styles.forEach(function (style) {
					doc.head.removeChild(style);
				});
			}
			var activeLibIDs = a7.model.get("app").libraries;
			var libraries = a7.model.get( "libraryList" );
			if( activeLibIDs !== undefined ){
				
			activeLibraries = libraries.filter( library => activeLibIDs.indexOf( library.libraryID ) >= 0 );
			}
			
			var scriptTags = [];

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
			console.log( "Rendered document.");


		//});

	});
};
