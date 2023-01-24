-- MySQL dump 10.17  Distrib 10.3.22-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: laceside
-- ------------------------------------------------------
-- Server version	10.3.22-MariaDB-0ubuntu0.19.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appLibraries`
--

DROP TABLE IF EXISTS `appLibraries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appLibraries` (
  `appID` char(35) NOT NULL,
  `libraryID` char(35) NOT NULL,
  KEY `appLibrary_FK` (`libraryID`),
  KEY `appLibrary_FK_1` (`appID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appLibraries`
--

LOCK TABLES `appLibraries` WRITE;
/*!40000 ALTER TABLE `appLibraries` DISABLE KEYS */;
INSERT INTO `appLibraries` VALUES ('13','6'),('13','17'),('11','17'),('11','6'),('12','6'),('9','6'),('14','17'),('14','6'),('15','6'),('16','6'),('16','10'),('7','17'),('7','6'),('2','6'),('17','6');
/*!40000 ALTER TABLE `appLibraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apps`
--

DROP TABLE IF EXISTS `apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apps` (
  `appID` char(35) NOT NULL,
  `userID` char(35) NOT NULL,
  `jsCode` text DEFAULT NULL,
  `htmlCode` text DEFAULT NULL,
  `cssCode` text DEFAULT NULL,
  `esModule` bit(1) NOT NULL DEFAULT b'0',
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`appID`),
  KEY `apps_FK` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apps`
--

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;
INSERT INTO `apps` VALUES ('11','5','//import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar user = { food : \"\" };\nvar foods = [ { text: \"cereal\", id : 1 },\n               { text: \"eggs\", id : 2 },\n               { text: \"danish\", id : 3 }\n              ];\n\n// set the model first if we\'re using auto data-binding\ngadgetui.model.set(\"user\", user);\n\ngadgetui.objects.Constructor( gadgetui.input.ComboBox,[  document.querySelector( \"select[name=\'food\']\" ),\n	 {\n    animate: true,\n    glowColor: \'gold\',\n		save : function( text, resolve, reject ){\n				console.log( \"saving new value\" );\n				if( foods.constructor === Array ){\n					var newId = foods.length + 1;\n					foods.push( { text : text, id : newId } );\n					resolve( newId );\n				}else{\n					reject( \"Value was not saved.\" );\n				}\n		},\n		dataProvider : {\n			// you can pre-populate \'data\' or the refresh() function will be called when you instantiate the ComboBox\n			//data : undefined,\n			refresh : function( dataProvider, resolve, reject ){\n				if( foods.constructor === Array ){\n					dataProvider.data = foods;\n					resolve();\n				}else{\n					reject( \"Data set is not an array.\" );\n				}\n			}\n		}\n	}\n]);\n\n document.querySelector( \"select[name=\'food\']\" )\n 	.addEventListener( \"gadgetui-combobox-change\", function( event ){\n 		console.log( event.detail );\n 	});','<p>Test the ComboBox control.</p>\n\n<p>Select your favorite breakfast food, or enter something new:</p>\n<div style=\"margin-left: 50px;\">\n\n  <select name=\"food\" gadgetui-bind=\"user.food\">\n\n  </select>\n</div>','div.gadgetui-combobox-selectwrapper:after {\n    content: url(/lib/feather-icons/dist/icons/chevron-down.svg) !important;\n}','','gadget-ui ComboBox'),('12','5','import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar fp1 = gadgetui.objects.Constructor( gadgetui.display.Dialog,\n	[ document.querySelector(\"#dlg1\"),\n		{\n			top: 200,\n			left: 200,\n			title : \"Some Dialog\",\n			path : \"/dist/\",\n			enableShrink : false,\n			overflow: \"hidden\",\n			buttons: [\n				{ label: \'Save\', click: function(){ \n                  console.log( \'Saved\')\n                }},\n				{ label: \'Cancel\', click: function(){ \n                	fp1.close();\n                }}\n			]\n		}] );\n','	<p>Test the Dialog control.</p>\n	<div name=\"collapser\" id=\"dlg1\" style=\"background-color: rgba( 255,255,255,.7);\">\n	The newest possible...\n\n	Dialog.prototype.config = function( options ){\n		options = ( options === undefined ? {} : options );\n		this.title = ( options.title === undefined ? \"\": options.title );\n		this.path = ( options.path === undefined ? \"/bower_components/gadget-\n\n	</div>\n','#dlg1{\n width: 400px;\n  overflow: hidden !important;\n  overflow-x: hidden !important;\n}','','gadget-ui Dialog'),('13','5','\n		var user = {\n			firstname : \"\",\n			lastname : \"\",\n			friends : []\n		};\n\n		var lookuplist = [ {\n			label : \"Abby\",\n			email : \"abby@abby\",\n			value : \"133\",\n			title : \"Abby abby@abby\"\n		}, {\n			label : \"Andy\",\n			email : \"andy@andy\",\n			value : \"153\",\n			title : \"Andy andy@andy\"\n		}, {\n			label : \"Anne\",\n			email : \"anne@anne\",\n			value : \"123\",\n			title : \"Anne anne@anne\"\n		},{\n			label : \"Bobby\",\n			email : \"bobby@bobby\",\n			value : \"456\"\n		}, {\n			label : \"Cara\",\n			email : \"cara@cara\",\n			value : \"789\"\n		}, {\n			label : \"Dan\",\n			email : \"dan@dan\",\n			value : \"102\"\n		} ];\n\n		function renderLabel(item) {\n			return item.label + \"(\" + item.email + \")\";\n		}\n\n		// set the model first if we\'re using auto data-binding\n		gadgetui.model.set(\"user\", user);\n\n		var ll = gadgetui.objects.Constructor( gadgetui.input.LookupListInput,\n			[ document.querySelector( \"input[name=\'friends\']\" ),\n			{\n				emitEvents : false,\n				datasource : lookuplist,\n				model : gadgetui.model,\n				labelRenderer : renderLabel,\n				width: 500\n			}\n		]\n		);\n\n		function logChanges(obj) {\n			console.log(obj);\n			showModel();\n		}\n\n		var reset = document.querySelector(\"input[name=\'resetLookupList\']\");\n		reset.addEventListener(\"click\", function() {\n			ll.reset();\n		});\n','	<p>Test the LookupListInput control</p>\n	<p>Type into the box to find your friends. ( Hint: Start with the letter A. )</p>\n				<div>\n					<input name=\"friends\" type=\"text\" gadgetui-bind=\"user.friends\" placeholder=\"Friends\"/>\n					<input type=\"button\" value=\"Reset Friends list\" name=\"resetLookupList\" />\n				</div>\n	<p>The lookup function matches against the label of this dataset.\n	<p>\n		The dataset for the lookup:\n	</p>\n	<pre>\n		var lookuplist = [ {\n			label : \"Abby\",\n			email : \"abby@abby\",\n			value : \"133\",\n			title : \"Abby abby@abby\"\n		}, {\n			label : \"Andy\",\n			email : \"andy@andy\",\n			value : \"153\",\n			title : \"Andy andy@andy\"\n		}, {\n			label : \"Anne\",\n			email : \"anne@anne\",\n			value : \"123\",\n			title : \"Anne anne@anne\"\n		},{\n			label : \"Bobby\",\n			email : \"bobby@bobby\",\n			value : \"456\"\n		}, {\n			label : \"Cara\",\n			email : \"cara@cara\",\n			value : \"789\"\n		}, {\n			label : \"Dan\",\n			email : \"dan@dan\",\n			value : \"102\"\n		} ];\n	</pre>\n	</p>\n','','\0','gadget-ui LookupListInput'),('14','5','\n		var user = {\n			icons : []\n		};\n\n		var lookuplist = [{label:\"account-login.png\"},{label:\"account-logout.png\"},{label:\"action-redo.png\"},{label:\"action-undo.png\"},{label:\"align-center.png\"},{label:\"align-left.png\"},{label:\"align-right.png\"},{label:\"aperture.png\"},{label:\"arrow-bottom.png\"},{label:\"arrow-circle-bottom.png\"},{label:\"arrow-circle-left.png\"},{label:\"arrow-circle-right.png\"},{label:\"arrow-circle-top.png\"},{label:\"arrow-left.png\"},{label:\"arrow-right.png\"},{label:\"arrow-thick-bottom.png\"},{label:\"arrow-thick-left.png\"},{label:\"arrow-thick-right.png\"},{label:\"arrow-thick-top.png\"},{label:\"arrow-top.png\"},{label:\"audio.png\"},{label:\"audio-spectrum.png\"},{label:\"badge.png\"},{label:\"ban.png\"},{label:\"bar-chart.png\"},{label:\"basket.png\"},{label:\"battery-empty.png\"},{label:\"battery-full.png\"},{label:\"beaker.png\"},{label:\"bell.png\"},{label:\"bluetooth.png\"},{label:\"bold.png\"},{label:\"bolt.png\"},{label:\"book.png\"},{label:\"bookmark.png\"},{label:\"box.png\"},{label:\"briefcase.png\"},{label:\"british-pound.png\"},{label:\"browser.png\"},{label:\"brush.png\"},{label:\"bug.png\"},{label:\"bullhorn.png\"},{label:\"calculator.png\"},{label:\"calendar.png\"},{label:\"camera-slr.png\"},{label:\"caret-bottom.png\"},{label:\"caret-left.png\"},{label:\"caret-right.png\"},{label:\"caret-top.png\"},{label:\"cart.png\"},{label:\"chat.png\"},{label:\"check.png\"},{label:\"chevron-bottom.png\"},{label:\"chevron-left.png\"},{label:\"chevron-right.png\"},{label:\"chevron-top.png\"},{label:\"circle-check.png\"},{label:\"circle-x.png\"},{label:\"clipboard.png\"},{label:\"clock.png\"},{label:\"cloud.png\"},{label:\"cloud-download.png\"},{label:\"cloud-upload.png\"},{label:\"cloudy.png\"},{label:\"code.png\"},{label:\"cog.png\"},{label:\"collapse-down.png\"},{label:\"collapse-left.png\"},{label:\"collapse-right.png\"},{label:\"collapse-up.png\"},{label:\"command.png\"},{label:\"comment-square.png\"},{label:\"compass.png\"},{label:\"contrast.png\"},{label:\"copywriting.png\"},{label:\"credit-card.png\"},{label:\"crop.png\"},{label:\"dashboard.png\"},{label:\"data-transfer-download.png\"},{label:\"data-transfer-upload.png\"},{label:\"delete.png\"},{label:\"dial.png\"},{label:\"document.png\"},{label:\"dollar.png\"},{label:\"double-quote-sans-left.png\"},{label:\"double-quote-sans-right.png\"},{label:\"double-quote-serif-left.png\"},{label:\"double-quote-serif-right.png\"},{label:\"droplet.png\"},{label:\"eject.png\"},{label:\"elevator.png\"},{label:\"ellipses.png\"},{label:\"envelope-closed.png\"},{label:\"envelope-open.png\"},{label:\"euro.png\"},{label:\"excerpt.png\"},{label:\"expand-down.png\"},{label:\"expand-left.png\"},{label:\"expand-right.png\"},{label:\"expand-up.png\"},{label:\"external-link.png\"},{label:\"eye.png\"},{label:\"eyedropper.png\"},{label:\"file.png\"},{label:\"fire.png\"},{label:\"flag.png\"},{label:\"flash.png\"},{label:\"folder.png\"},{label:\"fork.png\"},{label:\"fullscreen-enter.png\"},{label:\"fullscreen-exit.png\"},{label:\"globe.png\"},{label:\"graph.png\"},{label:\"grid-four-up.png\"},{label:\"grid-three-up.png\"},{label:\"grid-two-up.png\"},{label:\"hard-drive.png\"},{label:\"header.png\"},{label:\"headphones.png\"},{label:\"heart.png\"},{label:\"home.png\"},{label:\"image.png\"},{label:\"inbox.png\"},{label:\"infinity.png\"},{label:\"info.png\"},{label:\"italic.png\"},{label:\"justify-center.png\"},{label:\"justify-left.png\"},{label:\"justify-right.png\"},{label:\"key.png\"},{label:\"laptop.png\"},{label:\"layers.png\"},{label:\"lightbulb.png\"},{label:\"link-broken.png\"},{label:\"link-intact.png\"},{label:\"list.png\"},{label:\"list-rich.png\"},{label:\"location.png\"},{label:\"lock-locked.png\"},{label:\"lock-unlocked.png\"},{label:\"loop.png\"},{label:\"loop-circular.png\"},{label:\"loop-square.png\"},{label:\"magnifying-glass.png\"},{label:\"map.png\"},{label:\"map-marker.png\"},{label:\"media-pause.png\"},{label:\"media-play.png\"},{label:\"media-record.png\"},{label:\"media-skip-backward.png\"},{label:\"media-skip-forward.png\"},{label:\"media-step-backward.png\"},{label:\"media-step-forward.png\"},{label:\"media-stop.png\"},{label:\"medical-cross.png\"},{label:\"menu.png\"},{label:\"microphone.png\"},{label:\"minus.png\"},{label:\"monitor.png\"},{label:\"moon.png\"},{label:\"move.png\"},{label:\"musical-note.png\"},{label:\"paperclip.png\"},{label:\"pencil.png\"},{label:\"people.png\"},{label:\"person.png\"},{label:\"phone.png\"},{label:\"pie-chart.png\"},{label:\"pin.png\"},{label:\"play-circle.png\"},{label:\"plus.png\"},{label:\"power-standby.png\"},{label:\"print.png\"},{label:\"project.png\"},{label:\"pulse.png\"},{label:\"puzzle-piece.png\"},{label:\"question-mark.png\"},{label:\"rain.png\"},{label:\"random.png\"},{label:\"reload.png\"},{label:\"resize-both.png\"},{label:\"resize-height.png\"},{label:\"resize-width.png\"},{label:\"rss.png\"},{label:\"rss-alt.png\"},{label:\"script.png\"},{label:\"share.png\"},{label:\"share-boxed.png\"},{label:\"shield.png\"},{label:\"signal.png\"},{label:\"signpost.png\"},{label:\"sort-ascending.png\"},{label:\"sort-descending.png\"},{label:\"spreadsheet.png\"},{label:\"star.png\"},{label:\"sun.png\"},{label:\"tablet.png\"},{label:\"tag.png\"},{label:\"tags.png\"},{label:\"target.png\"},{label:\"task.png\"},{label:\"terminal.png\"},{label:\"text.png\"},{label:\"thumb-down.png\"},{label:\"thumb-up.png\"},{label:\"timer.png\"},{label:\"transfer.png\"},{label:\"trash.png\"},{label:\"underline.png\"},{label:\"vertical-align-bottom.png\"},{label:\"vertical-align-center.png\"},{label:\"vertical-align-top.png\"},{label:\"video.png\"},{label:\"volume-high.png\"},{label:\"volume-low.png\"},{label:\"volume-off.png\"},{label:\"warning.png\"},{label:\"wifi.png\"},{label:\"wrench.png\"},{label:\"x.png\"},{label:\"yen.png\"},{label:\"zoom-in.png\"},{label:\"zoom-out.png\"}];\n\n\n		function renderItem( item ){\n			var wrapper = document.createElement( \"div\" );\n			gadgetui.util.setStyle( wrapper, \"padding-right\", 20 );\n			gadgetui.util.setStyle( wrapper, \"position\", \"relative\" );\n			gadgetui.util.setStyle( wrapper, \"display\", \"inline-block\" );\n			var icon = document.createElement( \"div\" );\n			gadgetui.util.setStyle( wrapper, \"width\", 64 );\n			gadgetui.util.setStyle( wrapper, \"margin\", 3 );\n			gadgetui.util.setStyle( icon, \"width\", 64 );\n			gadgetui.util.setStyle( wrapper, \"border\", \"1px solid silver\" );\n			var img = document.createElement( \"img\" );\n			img.setAttribute( \"src\", \"https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/\" + item.label.replace( \".png\", \"-8x.png\") );\n			img.setAttribute( \"title\", item.label );\n			icon.appendChild( img );\n\n			wrapper.appendChild( icon );\n			return wrapper;\n		}\n\n		function renderMenuItem( item ){\n			var wrapper = document.createElement( \"div\" );\n			gadgetui.util.setStyle( wrapper, \"padding-right\", 20 );\n			gadgetui.util.setStyle( wrapper, \"display\", \"block\" );\n			gadgetui.util.addClass( wrapper, \"gadgetui-lookuplist-item\" );\n\n			var icon = document.createElement( \"div\" );\n			//gadgetui.util.setStyle( wrapper, \"width\", 64 );\n			gadgetui.util.setStyle( wrapper, \"margin\", 3 );\n			//gadgetui.util.setStyle( icon, \"width\", 64 );\n			var img = document.createElement( \"img\" );\n			img.setAttribute( \"src\", \"https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/\" + item.label.replace( \".png\", \"-4x.png\") );\n			img.setAttribute( \"title\", item.label );\n			gadgetui.util.setStyle( img, \"margin-right\", 5 );\n			var label = document.createElement( \"span\" );\n			gadgetui.util.setStyle( label, \"font-size\", \".7em\" );\n			label.innerText = item.label;\n\n			icon.appendChild( img );\n			icon.appendChild( label );\n\n			wrapper.appendChild( icon );\n			return wrapper;\n		}\n		// set the model first if we\'re using auto data-binding\n		gadgetui.model.set(\"user\", user);\n\n		var ll = gadgetui.objects.Constructor( gadgetui.input.LookupListInput,\n			[ document.querySelector( \"input[name=\'icons\']\" ),\n			{\n				emitEvents : false,\n				datasource : lookuplist,\n				model : gadgetui.model,\n				itemRenderer: renderItem,\n				menuItemRenderer: renderMenuItem,\n				width: 500\n			}\n		]\n		);\n\n		function logChanges(obj) {\n			console.log(obj);\n			showModel();\n		}\n\n		var reset = document.querySelector(\"input[name=\'resetLookupList\']\");\n		reset.addEventListener(\"click\", function() {\n			ll.reset();\n		});\n','	<p>Test the LookupListInput control</p>\n	<p>Type into the box to find icons in the Open Iconic collection.</p>\n				<div>\n					<input name=\"icons\" type=\"text\" gadgetui-bind=\"user.icons\" placeholder=\"Icons\"/>\n					<input type=\"button\" value=\"Reset Icon list\" name=\"resetLookupList\" />\n				</div>\n	<p>The lookup function matches against the label of the set of icons for open-iconic in PNG format in https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/.\n		The renderer uses the \"-8x\" version of the icons to provide a large item display.\n	</p>','','\0','gadget-ui LookupListInput (advanced)'),('15','5','import {menu,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nlet authAlert = function(){\n  alert(\"Auth option selected.\");\n}\n\nlet menus = [\n  { label: \"User\",\n   menuItem:{\n     items:[\n       { label: \"Profile\",\n        link: \"\" },\n       { label: \"Logout\",\n        link: \"\" }\n     ]\n   }},\n  { label: \"Options\",\n   menuItem: {\n     items:[ { label: \"Files\",\n              menuItem:{\n                items:[\n                  {	label: \"Saving ...\",\n                   link: \"\" },\n                  {	label: \"Loading ...\",\n                   link: \"\" }\n                ]\n              }\n             },\n            {\n              label: \"Logs\",\n              menuItem: {\n                items:[\n                  { label: \"Auth ...\",\n                   link: authAlert }\n                ]\n              }\n            }\n           ]\n   }}\n];\nvar md = constructor( menu, [ document.querySelector(\"#menu\"), { data: menus } ] );','<div id=\"header\">\n  <div id=\"menu\">\n\n  </div>\n</div>','body {font-size: 1em;}\ninput, select, select option{ font-size: 1em;}\n#header{\n  display: flex;\n  padding: .5em .25em .25em .25em;\n  background: #77f;\n}','','gadget-ui Menu'),('16','5','import {modal,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar md = constructor( modal,\n                     [ document.querySelector(\"#modal\"),\n                      {featherPath: \"/lib/feather-icons\"}] ) ;','<p>Test the Modal control.</p>\n\n<div id=\"modal\">\n  Hi@\n</div>\n','body {font-size: 1em;}\ninput, select, select option{ font-size: 1em;}\n#modal{\n  width:500px;\n  height:300px;\n  overflow:hidden;\n}','','gadget-ui Modal'),('17','5','import {tabs,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar tbs = constructor( tabs, [ document.querySelector(\"#tabs-h\"), { } ] );\n\nvar tbs3 = constructor( tabs, [ document.querySelector(\"#tabs-v\"), { direction: \'vertical\' } ] );','\n<div style=\"width: 515px;\">\n  <div id=\"tabs-h\">\n    <div data-tab=\"tab-h1\">One</div>\n    <div data-tab=\"tab-h2\">Two</div>\n    <div data-tab=\"tab-h3\">Three</div>\n  </div>\n  <div style=\"border:1px solid silver; height: 300px; padding: 1em;\">\n    <div id=\"tab-h1\">Content One</div>\n    <div id=\"tab-h2\">Content Two</div>\n    <div id=\"tab-h3\">Content Three</div>\n  </div>\n</div>\n<br><br>\n<div id=\"vertTabContainer\">\n  <div id=\"tabs-v\">\n    <div data-tab=\"tab-v1\">One</div>\n    <div data-tab=\"tab-v2\">Two</div>\n    <div data-tab=\"tab-v3\">Three</div>\n  </div>\n  <div class=\"vcontentContainer\">\n    <div id=\"tab-v1\" class=\"vtabContent\">Content One</div>\n    <div id=\"tab-v2\" class=\"vtabContent\">Content Two</div>\n    <div id=\"tab-v3\" class=\"vtabContent\">Content Three</div>\n  </div>\n</div>','\ninput, select, select option{ font-size: 1em;}\n#header{\n  display: flex;\n  padding: .5em .25em .25em .25em;\n  background: #777;\n}\n\n#tabs-h{\n  width:500px;\n}\n\n#vertTabContainer{\n  /* 	display: grid;\n  grid-template-columns: 10em auto; */\n  border:1px solid silver;\n  width: 90%;\n}\n\n#tabs-v{\n  width: 10em;\n  display:inline-block;\n  height: 320px;\n}\n\n.vtabContent{\n  display:inline;\n  width:auto;\n}\n\n.vcontentContainer{\n  height: 300px;\n\n  display: inline-block;\n  vertical-align: top;\n  padding-left: 1em;\n  padding-top: 1em;\n}','','gadget-ui Tabs'),('18','5','\nvar myroutes = [\n  { path: \'/users\', handler: 1 },\n  { path: \'/user/:userID\', handler: 2 }\n];\n\nfunction _match( path ){\n   return routes.filter( route => ( path.match( new RegExp( route.path ) ) )  );\n };\nlet results = _match( \'/apps\' );\nconsole.log( \'route match:\' + results );\n\nconsole.log( results.length );\n\nresults = _match( \'/user/21\' );\nconsole.log( \'route match:\' + results );\n\nconsole.log( results.length );\n\n','','','','route test'),('19','5','\nopen = function( path, state ){\n    history.pushState( state, \'\', path );\n  };\n\nwindow.onpopstate = function( event ){\n  console.log( \'state: \' + JSON.stringify( event.state ) );\n}\n\nlet mystate = { foo: \"bar\" };\n\nopen( \"/foo\", mystate );','','','\0','history test'),('2','5','import {floatingpane,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar fp1 = constructor( floatingpane,\n  [ document.querySelector(\"#fp1\"),\n  {\n    title : \"Random Text\",\n    enableShrink : false,\n    top:100,\n    left:100\n  }] ) ;\n\nconsole.log( \"Floating Pane\" );','	<div name=\"collapser\" id=\"fp1\" style=\"background-color: rgba( 255,255,255,.7);\">\n	The newest possible...\n\n	FloatingPane.prototype.config = function( options ){\n		options = ( options === undefined ? {} : options );\n		this.title = ( options.title === undefined ? \"\": options.title );\n		this.path = ( options.path === undefined ? \"/bower_components/gadget-ui/dist/\": options.path );\n		this.position = ( options.position === undefined ? { my: \"right top\", at: \"right top\", of: window } : options.position );\n		this.padding = ( options.padding === undefined ? \"15px\": options.padding );\n		this.paddingTop = ( options.paddingTop === undefined ? \".3em\": options.paddingTop );\n		this.width = ( options.width === undefined ? gadgetui.util.getStyle( this.selector, \"width\" ) : options.width );\n		this.minWidth = ( this.title.length > 0 ? Math.max( 100, this.title.length * 10 ) + 20 : 100 );\n\n		this.height = ( options.height === undefined ? gadgetui.util.getNumberValue( gadgetui.util.getStyle( this.selector, \"height\" ) ) + ( gadgetui.util.getNumberValue( this.padding ) * 2 ) : options.height );\n		this.interiorWidth = ( options.interiorWidth === undefined ? \"\": options.interiorWidth );\n		this.opacity = ( ( options.opacity === undefined ? 1 : options.opacity ) );\n		this.zIndex = ( ( options.zIndex === undefined ? 100000 : options.zIndex ) );\n		this.minimized = false;\n		this.relativeOffsetLeft = 0;\n		this.borderColor = ( options.borderColor === undefined ? \"silver\": options.borderColor );\n		this.headerColor = ( options.headerColor === undefined ? \"black\": options.headerColor );\n		this.headerBackgroundColor = ( options.headerBackgroundColor === undefined ? \"silver\": options.headerBackgroundColor );\n		this.borderRadius = ( options.borderRadius === undefined ? 6 : options.borderRadius );\n		this.enableShrink = false;\n	};\n\n	</div>','#fp1{\n  width:500px;\n  height:300px;\n  overflow:hidden;\n}','','gadget-ui FloatingPane'),('20','5','import {Router} from \'/lib/url-router/dist/URLRouter.mjs\';\n\nconst router = new Router();\nrouter.add(\'/people/:username/articles/:articleId(\\\\d+)\', handler);\nconst result = router.find(\'/people/johnsmith/articles/123\');\n\ndocument.body.innerHTML = JSON.stringify( \" results: \" + result);','<html>\n  <body>\n  </body>\n</html>','','','url-router'),('7','5','var collapser = gadgetui.objects.Constructor( gadgetui.display.CollapsiblePane, [ document.querySelector( \"div[name=\'collapser\']\"),\n		{\n			title : \"Random Text\",\n			collapse: true\n		}]);\n','<p>Test the CollapsiblePabe control.</p>\n\n\n\n\n\n		<div style=\"width:400px;\" name=\"collapser\">\n\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:17:2:Unnecessary \'use strict\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:48:3:Missing \'break\' after \'case\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:84:107:Expected \'!==\' and instead saw \'!=\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:266:11:Expected \'===\' and instead saw \'==\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:272:6:Combine this with the previous \'var\' statement.<br/>\n\n		</div>','.myPane{\n  border: 1px dashed red;\n  border-radius: 5px;\n}\n\ndiv.myPane > div:nth-child(2){\n  padding: .5em;\n}\n\n.myHeader{\n  background-color: #ccf;\n}','\0','gadget-ui CollapsiblePane'),('9','5','import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\ngadgetui.objects.Constructor( gadgetui.display.Bubble, [document.getElementsByTagName( \"select\" )[0],\n	\"This control is not working...\",\n	{\n      	class: \"bubbleClass\",\n		position : \"bottom right\",\n		closable : true,\n      featherPath: \"/lib/feather-icons\"\n	}]);\n\n','		<p>Test the Bubble control.</p>\n\n		<p>Select your favorite breakfast food, or enter something new:</p>\n	<div style=\"margin-left: 50px;\">\n\n		<select name=\"food\">\n		\n		</select>\n	</div>','.bubbleClass{\n  border: 1px solid black;\n  padding: 5px;\n  border-radius: 5px;\n  width:220px;\n  font: 14px Arial;\n  background: #fff;\n  opacity: .9;\n\n}','','gadget-ui Bubble'),('ck8mua4l40001245v1xoo48lo','5','','','','\0','blurf'),('ck8mulzwq0000245vln49lbou','5','','','','\0','boobal');
/*!40000 ALTER TABLE `apps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filepart`
--

DROP TABLE IF EXISTS `filepart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filepart` (
  `fileId` varchar(50) NOT NULL,
  `filepath` varchar(500) NOT NULL,
  `filepart` int(11) NOT NULL,
  `parts` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filepart`
--

LOCK TABLES `filepart` WRITE;
/*!40000 ALTER TABLE `filepart` DISABLE KEYS */;
/*!40000 ALTER TABLE `filepart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libraries`
--

DROP TABLE IF EXISTS `libraries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `libraries` (
  `libraryID` char(35) NOT NULL,
  `userID` char(35) NOT NULL,
  `name` varchar(50) NOT NULL,
  `link` varchar(200) NOT NULL,
  PRIMARY KEY (`libraryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libraries`
--

LOCK TABLES `libraries` WRITE;
/*!40000 ALTER TABLE `libraries` DISABLE KEYS */;
INSERT INTO `libraries` VALUES ('10','5','Open-iconic fonts CSS 1.1.1','https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic.min.css'),('17','5','gadget-ui (local)','http://127.0.0.1:4100/lib/gadget-ui/dist/gadget-ui.js'),('6','5','gadget-UI CSS','/lib/gadget-ui/dist/gadget-ui.css');
/*!40000 ALTER TABLE `libraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userProfile`
--

DROP TABLE IF EXISTS `userProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userProfile` (
  `userID` char(35) NOT NULL,
  `profilePic` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userProfile`
--

LOCK TABLES `userProfile` WRITE;
/*!40000 ALTER TABLE `userProfile` DISABLE KEYS */;
INSERT INTO `userProfile` VALUES ('5','/upload/ck6wnbizx0005u7il2ujs29sq.png'),('6','');
/*!40000 ALTER TABLE `userProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` char(35) NOT NULL,
  `username` varchar(45) NOT NULL,
  `hash` char(60) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `nickName` varchar(100) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('5','rmunn','$2a$10$8ps8M143uRO/t2plnLYNgeHH1.iwbJJOsQhNLdfgVJrGPaFLQQsxu','Robert','Munn','Robert','2019-04-26 00:00:00'),('6','user','$2a$10$8ps8M143uRO/t2plnLYNgeHH1.iwbJJOsQhNLdfgVJrGPaFLQQsxu','JS','Coder','Kung Fu Coder','2020-03-21 00:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'laceside'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-07  3:22:36
