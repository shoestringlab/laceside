-- MySQL dump 10.17  Distrib 10.3.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: livesandbox
-- ------------------------------------------------------
-- Server version	10.3.13-MariaDB-2

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
  `appID` int(11) NOT NULL,
  `libraryID` int(11) NOT NULL,
  KEY `appLibrary_FK` (`libraryID`),
  KEY `appLibrary_FK_1` (`appID`),
  CONSTRAINT `appLibrary_FK` FOREIGN KEY (`libraryID`) REFERENCES `libraries` (`libraryID`),
  CONSTRAINT `appLibrary_FK_1` FOREIGN KEY (`appID`) REFERENCES `apps` (`appID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appLibraries`
--

LOCK TABLES `appLibraries` WRITE;
/*!40000 ALTER TABLE `appLibraries` DISABLE KEYS */;
INSERT INTO `appLibraries` VALUES (2,6),(9,6),(9,10),(13,6),(13,17),(12,6),(11,17),(11,6),(7,6),(14,6),(14,17);
/*!40000 ALTER TABLE `appLibraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apps`
--

DROP TABLE IF EXISTS `apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apps` (
  `appID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `jsCode` text DEFAULT NULL,
  `htmlCode` text DEFAULT NULL,
  `cssCode` text DEFAULT NULL,
  `esModule` bit(1) NOT NULL DEFAULT b'0',
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`appID`),
  KEY `apps_FK` (`userID`),
  CONSTRAINT `apps_FK` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apps`
--

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;
INSERT INTO `apps` VALUES (2,5,'import {floatingpane,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar fp1 = constructor( floatingpane,\n  [ document.querySelector(\"#fp1\"),\n  {\n    title : \"Random Text\",\n    enableShrink : false,\n    top:100,\n    left:100\n  }] ) ;\n','	<div name=\"collapser\" id=\"fp1\" style=\"background-color: rgba( 255,255,255,.7);\">\n	The newest possible...\n\n	FloatingPane.prototype.config = function( options ){\n		options = ( options === undefined ? {} : options );\n		this.title = ( options.title === undefined ? \"\": options.title );\n		this.path = ( options.path === undefined ? \"/bower_components/gadget-ui/dist/\": options.path );\n		this.position = ( options.position === undefined ? { my: \"right top\", at: \"right top\", of: window } : options.position );\n		this.padding = ( options.padding === undefined ? \"15px\": options.padding );\n		this.paddingTop = ( options.paddingTop === undefined ? \".3em\": options.paddingTop );\n		this.width = ( options.width === undefined ? gadgetui.util.getStyle( this.selector, \"width\" ) : options.width );\n		this.minWidth = ( this.title.length > 0 ? Math.max( 100, this.title.length * 10 ) + 20 : 100 );\n\n		this.height = ( options.height === undefined ? gadgetui.util.getNumberValue( gadgetui.util.getStyle( this.selector, \"height\" ) ) + ( gadgetui.util.getNumberValue( this.padding ) * 2 ) : options.height );\n		this.interiorWidth = ( options.interiorWidth === undefined ? \"\": options.interiorWidth );\n		this.opacity = ( ( options.opacity === undefined ? 1 : options.opacity ) );\n		this.zIndex = ( ( options.zIndex === undefined ? 100000 : options.zIndex ) );\n		this.minimized = false;\n		this.relativeOffsetLeft = 0;\n		this.borderColor = ( options.borderColor === undefined ? \"silver\": options.borderColor );\n		this.headerColor = ( options.headerColor === undefined ? \"black\": options.headerColor );\n		this.headerBackgroundColor = ( options.headerBackgroundColor === undefined ? \"silver\": options.headerBackgroundColor );\n		this.borderRadius = ( options.borderRadius === undefined ? 6 : options.borderRadius );\n		this.enableShrink = false;\n	};\n\n	</div>','#fp1{\n  width:500px;\n  height:300px;\n  overflow:hidden;\n}','','gadget-ui FloatingPane'),(7,5,'import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar collapser = gadgetui.objects.Constructor( gadgetui.display.CollapsiblePane, [ document.querySelector( \"div[name=\'collapser\']\"),\n		{\n			title : \"Random Text\",\n			collapse: true\n		}]);\n','<p>Test the CollapsiblePabe control.</p>\n\n\n\n\n\n		<div style=\"width:400px\" name=\"collapser\">\n\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:17:2:Unnecessary \'use strict\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:48:3:Missing \'break\' after \'case\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:84:107:Expected \'!==\' and instead saw \'!=\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:266:11:Expected \'===\' and instead saw \'==\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:272:6:Combine this with the previous \'var\' statement.<br/>\n\n		</div>','.myPane{\n  border: 1px dashed red;\n  border-radius: 5px;\n}\n\ndiv.myPane > div:nth-child(2){\n  padding: .5em;\n}\n\n.myHeader{\n  background-color: #ccf;\n}','','gadget-ui CollapsiblePane'),(9,5,'import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\ngadgetui.objects.Constructor( gadgetui.display.Bubble, [document.getElementsByTagName( \"select\" )[0],\n	\"This control is not working...\",\n	{\n		arrowPosition : \"left bottom\",\n		position : \"top right\",\n		arrowDirection : \"middle\",\n		font: \".7em \'Arial\'\",\n		borderWidth : 1,\n		height: 30,\n		padding: 5,\n		arrowSize: 0,\n		borderRadius: 5,\n		closable : true\n	}]);','		<p>Test the Bubble control.</p>\n\n		<p>Select your favorite breakfast food, or enter something new:</p>\n	<div style=\"margin-left: 50px;\">\n\n		<select name=\"food\">\n		\n		</select>\n	</div>','','','gadget-ui Bubble'),(11,5,'//import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar user = { food : \"\" };\nvar foods = [ { text: \"cereal\", id : 1 },\n               { text: \"eggs\", id : 2 },\n               { text: \"danish\", id : 3 }\n              ];\n\n// set the model first if we\'re using auto data-binding\ngadgetui.model.set(\"user\", user);\n\ngadgetui.objects.Constructor( gadgetui.input.ComboBox,[  document.querySelector( \"select[name=\'food\']\" ),\n	 {\n    animate: true,\n    glowColor: \'gold\',\n		save : function( text, resolve, reject ){\n				console.log( \"saving new value\" );\n				if( foods.constructor === Array ){\n					var newId = foods.length + 1;\n					foods.push( { text : text, id : newId } );\n					resolve( newId );\n				}else{\n					reject( \"Value was not saved.\" );\n				}\n		},\n		dataProvider : {\n			// you can pre-populate \'data\' or the refresh() function will be called when you instantiate the ComboBox\n			//data : undefined,\n			refresh : function( dataProvider, resolve, reject ){\n				if( foods.constructor === Array ){\n					dataProvider.data = foods;\n					resolve();\n				}else{\n					reject( \"Data set is not an array.\" );\n				}\n			}\n		}\n	}\n]);\n\n document.querySelector( \"select[name=\'food\']\" )\n 	.addEventListener( \"gadgetui-combobox-change\", function( event ){\n 		console.log( event.detail );\n 	});','<p>Test the ComboBox control.</p>\n\n<p>Select your favorite breakfast food, or enter something new:</p>\n<div style=\"margin-left: 50px;\">\n\n  <select name=\"food\" gadgetui-bind=\"user.food\">\n\n  </select>\n</div>','div.gadgetui-combobox-selectwrapper:after {\n    content: url(/lib/feather-icons/dist/icons/chevron-down.svg) !important;\n}','','gadget-ui ComboBox'),(12,5,'import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar fp1 = gadgetui.objects.Constructor( gadgetui.display.Dialog,\n	[ document.querySelector(\"#dlg1\"),\n		{\n			top: 200,\n			left: 200,\n			title : \"Some Dialog\",\n			path : \"/dist/\",\n			enableShrink : false,\n			overflow: \"hidden\",\n			buttons: [\n				{ label: \'Save\', click: function(){ console.log( \'Saved\')}},\n				{ label: \'Cancel\', click: function(){ console.log( \'Cancelled\' )}}\n			]\n		}] );\n','	<p>Test the Dialog control.</p>\n	<div name=\"collapser\" id=\"dlg1\" style=\"background-color: rgba( 255,255,255,.7);\">\n	The newest possible...\n\n	Dialog.prototype.config = function( options ){\n		options = ( options === undefined ? {} : options );\n		this.title = ( options.title === undefined ? \"\": options.title );\n		this.path = ( options.path === undefined ? \"/bower_components/gadget-\n\n	</div>\n','#dlg1{\n width: 400px;\n  overflow: hidden !important;\n  overflow-x: hidden !important;\n}','','gadget-ui Dialog'),(13,5,'\n		var user = {\n			firstname : \"\",\n			lastname : \"\",\n			friends : []\n		};\n\n		var lookuplist = [ {\n			label : \"Abby\",\n			email : \"abby@abby\",\n			value : \"133\",\n			title : \"Abby abby@abby\"\n		}, {\n			label : \"Andy\",\n			email : \"andy@andy\",\n			value : \"153\",\n			title : \"Andy andy@andy\"\n		}, {\n			label : \"Anne\",\n			email : \"anne@anne\",\n			value : \"123\",\n			title : \"Anne anne@anne\"\n		},{\n			label : \"Bobby\",\n			email : \"bobby@bobby\",\n			value : \"456\"\n		}, {\n			label : \"Cara\",\n			email : \"cara@cara\",\n			value : \"789\"\n		}, {\n			label : \"Dan\",\n			email : \"dan@dan\",\n			value : \"102\"\n		} ];\n\n		function renderLabel(item) {\n			return item.label + \"(\" + item.email + \")\";\n		}\n\n		// set the model first if we\'re using auto data-binding\n		gadgetui.model.set(\"user\", user);\n\n		var ll = gadgetui.objects.Constructor( gadgetui.input.LookupListInput,\n			[ document.querySelector( \"input[name=\'friends\']\" ),\n			{\n				emitEvents : false,\n				datasource : lookuplist,\n				model : gadgetui.model,\n				labelRenderer : renderLabel,\n				width: 500\n			}\n		]\n		);\n\n		function logChanges(obj) {\n			console.log(obj);\n			showModel();\n		}\n\n		var reset = document.querySelector(\"input[name=\'resetLookupList\']\");\n		reset.addEventListener(\"click\", function() {\n			ll.reset();\n		});\n','	<p>Test the LookupListInput control</p>\n	<p>Type into the box to find your friends. ( Hint: Start with the letter A. )</p>\n				<div>\n					<input name=\"friends\" type=\"text\" gadgetui-bind=\"user.friends\" placeholder=\"Friends\"/>\n					<input type=\"button\" value=\"Reset Friends list\" name=\"resetLookupList\" />\n				</div>\n	<p>The lookup function matches against the label of this dataset.\n	<p>\n		The dataset for the lookup:\n	</p>\n	<pre>\n		var lookuplist = [ {\n			label : \"Abby\",\n			email : \"abby@abby\",\n			value : \"133\",\n			title : \"Abby abby@abby\"\n		}, {\n			label : \"Andy\",\n			email : \"andy@andy\",\n			value : \"153\",\n			title : \"Andy andy@andy\"\n		}, {\n			label : \"Anne\",\n			email : \"anne@anne\",\n			value : \"123\",\n			title : \"Anne anne@anne\"\n		},{\n			label : \"Bobby\",\n			email : \"bobby@bobby\",\n			value : \"456\"\n		}, {\n			label : \"Cara\",\n			email : \"cara@cara\",\n			value : \"789\"\n		}, {\n			label : \"Dan\",\n			email : \"dan@dan\",\n			value : \"102\"\n		} ];\n	</pre>\n	</p>\n','','\0','gadget-ui LookupListInput'),(14,5,'\n		var user = {\n			icons : []\n		};\n\n		var lookuplist = [{label:\"account-login.png\"},{label:\"account-logout.png\"},{label:\"action-redo.png\"},{label:\"action-undo.png\"},{label:\"align-center.png\"},{label:\"align-left.png\"},{label:\"align-right.png\"},{label:\"aperture.png\"},{label:\"arrow-bottom.png\"},{label:\"arrow-circle-bottom.png\"},{label:\"arrow-circle-left.png\"},{label:\"arrow-circle-right.png\"},{label:\"arrow-circle-top.png\"},{label:\"arrow-left.png\"},{label:\"arrow-right.png\"},{label:\"arrow-thick-bottom.png\"},{label:\"arrow-thick-left.png\"},{label:\"arrow-thick-right.png\"},{label:\"arrow-thick-top.png\"},{label:\"arrow-top.png\"},{label:\"audio.png\"},{label:\"audio-spectrum.png\"},{label:\"badge.png\"},{label:\"ban.png\"},{label:\"bar-chart.png\"},{label:\"basket.png\"},{label:\"battery-empty.png\"},{label:\"battery-full.png\"},{label:\"beaker.png\"},{label:\"bell.png\"},{label:\"bluetooth.png\"},{label:\"bold.png\"},{label:\"bolt.png\"},{label:\"book.png\"},{label:\"bookmark.png\"},{label:\"box.png\"},{label:\"briefcase.png\"},{label:\"british-pound.png\"},{label:\"browser.png\"},{label:\"brush.png\"},{label:\"bug.png\"},{label:\"bullhorn.png\"},{label:\"calculator.png\"},{label:\"calendar.png\"},{label:\"camera-slr.png\"},{label:\"caret-bottom.png\"},{label:\"caret-left.png\"},{label:\"caret-right.png\"},{label:\"caret-top.png\"},{label:\"cart.png\"},{label:\"chat.png\"},{label:\"check.png\"},{label:\"chevron-bottom.png\"},{label:\"chevron-left.png\"},{label:\"chevron-right.png\"},{label:\"chevron-top.png\"},{label:\"circle-check.png\"},{label:\"circle-x.png\"},{label:\"clipboard.png\"},{label:\"clock.png\"},{label:\"cloud.png\"},{label:\"cloud-download.png\"},{label:\"cloud-upload.png\"},{label:\"cloudy.png\"},{label:\"code.png\"},{label:\"cog.png\"},{label:\"collapse-down.png\"},{label:\"collapse-left.png\"},{label:\"collapse-right.png\"},{label:\"collapse-up.png\"},{label:\"command.png\"},{label:\"comment-square.png\"},{label:\"compass.png\"},{label:\"contrast.png\"},{label:\"copywriting.png\"},{label:\"credit-card.png\"},{label:\"crop.png\"},{label:\"dashboard.png\"},{label:\"data-transfer-download.png\"},{label:\"data-transfer-upload.png\"},{label:\"delete.png\"},{label:\"dial.png\"},{label:\"document.png\"},{label:\"dollar.png\"},{label:\"double-quote-sans-left.png\"},{label:\"double-quote-sans-right.png\"},{label:\"double-quote-serif-left.png\"},{label:\"double-quote-serif-right.png\"},{label:\"droplet.png\"},{label:\"eject.png\"},{label:\"elevator.png\"},{label:\"ellipses.png\"},{label:\"envelope-closed.png\"},{label:\"envelope-open.png\"},{label:\"euro.png\"},{label:\"excerpt.png\"},{label:\"expand-down.png\"},{label:\"expand-left.png\"},{label:\"expand-right.png\"},{label:\"expand-up.png\"},{label:\"external-link.png\"},{label:\"eye.png\"},{label:\"eyedropper.png\"},{label:\"file.png\"},{label:\"fire.png\"},{label:\"flag.png\"},{label:\"flash.png\"},{label:\"folder.png\"},{label:\"fork.png\"},{label:\"fullscreen-enter.png\"},{label:\"fullscreen-exit.png\"},{label:\"globe.png\"},{label:\"graph.png\"},{label:\"grid-four-up.png\"},{label:\"grid-three-up.png\"},{label:\"grid-two-up.png\"},{label:\"hard-drive.png\"},{label:\"header.png\"},{label:\"headphones.png\"},{label:\"heart.png\"},{label:\"home.png\"},{label:\"image.png\"},{label:\"inbox.png\"},{label:\"infinity.png\"},{label:\"info.png\"},{label:\"italic.png\"},{label:\"justify-center.png\"},{label:\"justify-left.png\"},{label:\"justify-right.png\"},{label:\"key.png\"},{label:\"laptop.png\"},{label:\"layers.png\"},{label:\"lightbulb.png\"},{label:\"link-broken.png\"},{label:\"link-intact.png\"},{label:\"list.png\"},{label:\"list-rich.png\"},{label:\"location.png\"},{label:\"lock-locked.png\"},{label:\"lock-unlocked.png\"},{label:\"loop.png\"},{label:\"loop-circular.png\"},{label:\"loop-square.png\"},{label:\"magnifying-glass.png\"},{label:\"map.png\"},{label:\"map-marker.png\"},{label:\"media-pause.png\"},{label:\"media-play.png\"},{label:\"media-record.png\"},{label:\"media-skip-backward.png\"},{label:\"media-skip-forward.png\"},{label:\"media-step-backward.png\"},{label:\"media-step-forward.png\"},{label:\"media-stop.png\"},{label:\"medical-cross.png\"},{label:\"menu.png\"},{label:\"microphone.png\"},{label:\"minus.png\"},{label:\"monitor.png\"},{label:\"moon.png\"},{label:\"move.png\"},{label:\"musical-note.png\"},{label:\"paperclip.png\"},{label:\"pencil.png\"},{label:\"people.png\"},{label:\"person.png\"},{label:\"phone.png\"},{label:\"pie-chart.png\"},{label:\"pin.png\"},{label:\"play-circle.png\"},{label:\"plus.png\"},{label:\"power-standby.png\"},{label:\"print.png\"},{label:\"project.png\"},{label:\"pulse.png\"},{label:\"puzzle-piece.png\"},{label:\"question-mark.png\"},{label:\"rain.png\"},{label:\"random.png\"},{label:\"reload.png\"},{label:\"resize-both.png\"},{label:\"resize-height.png\"},{label:\"resize-width.png\"},{label:\"rss.png\"},{label:\"rss-alt.png\"},{label:\"script.png\"},{label:\"share.png\"},{label:\"share-boxed.png\"},{label:\"shield.png\"},{label:\"signal.png\"},{label:\"signpost.png\"},{label:\"sort-ascending.png\"},{label:\"sort-descending.png\"},{label:\"spreadsheet.png\"},{label:\"star.png\"},{label:\"sun.png\"},{label:\"tablet.png\"},{label:\"tag.png\"},{label:\"tags.png\"},{label:\"target.png\"},{label:\"task.png\"},{label:\"terminal.png\"},{label:\"text.png\"},{label:\"thumb-down.png\"},{label:\"thumb-up.png\"},{label:\"timer.png\"},{label:\"transfer.png\"},{label:\"trash.png\"},{label:\"underline.png\"},{label:\"vertical-align-bottom.png\"},{label:\"vertical-align-center.png\"},{label:\"vertical-align-top.png\"},{label:\"video.png\"},{label:\"volume-high.png\"},{label:\"volume-low.png\"},{label:\"volume-off.png\"},{label:\"warning.png\"},{label:\"wifi.png\"},{label:\"wrench.png\"},{label:\"x.png\"},{label:\"yen.png\"},{label:\"zoom-in.png\"},{label:\"zoom-out.png\"}];\n\n\n		function renderItem( item ){\n			var wrapper = document.createElement( \"div\" );\n			gadgetui.util.setStyle( wrapper, \"padding-right\", 20 );\n			gadgetui.util.setStyle( wrapper, \"position\", \"relative\" );\n			gadgetui.util.setStyle( wrapper, \"display\", \"inline-block\" );\n			var icon = document.createElement( \"div\" );\n			gadgetui.util.setStyle( wrapper, \"width\", 64 );\n			gadgetui.util.setStyle( wrapper, \"margin\", 3 );\n			gadgetui.util.setStyle( icon, \"width\", 64 );\n			gadgetui.util.setStyle( wrapper, \"border\", \"1px solid silver\" );\n			var img = document.createElement( \"img\" );\n			img.setAttribute( \"src\", \"https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/\" + item.label.replace( \".png\", \"-8x.png\") );\n			img.setAttribute( \"title\", item.label );\n			icon.appendChild( img );\n\n			wrapper.appendChild( icon );\n			return wrapper;\n		}\n\n		function renderMenuItem( item ){\n			var wrapper = document.createElement( \"div\" );\n			gadgetui.util.setStyle( wrapper, \"padding-right\", 20 );\n			gadgetui.util.setStyle( wrapper, \"display\", \"block\" );\n			gadgetui.util.addClass( wrapper, \"gadgetui-lookuplist-item\" );\n\n			var icon = document.createElement( \"div\" );\n			//gadgetui.util.setStyle( wrapper, \"width\", 64 );\n			gadgetui.util.setStyle( wrapper, \"margin\", 3 );\n			//gadgetui.util.setStyle( icon, \"width\", 64 );\n			var img = document.createElement( \"img\" );\n			img.setAttribute( \"src\", \"https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/\" + item.label.replace( \".png\", \"-4x.png\") );\n			img.setAttribute( \"title\", item.label );\n			gadgetui.util.setStyle( img, \"margin-right\", 5 );\n			var label = document.createElement( \"span\" );\n			gadgetui.util.setStyle( label, \"font-size\", \".7em\" );\n			label.innerText = item.label;\n\n			icon.appendChild( img );\n			icon.appendChild( label );\n\n			wrapper.appendChild( icon );\n			return wrapper;\n		}\n		// set the model first if we\'re using auto data-binding\n		gadgetui.model.set(\"user\", user);\n\n		var ll = gadgetui.objects.Constructor( gadgetui.input.LookupListInput,\n			[ document.querySelector( \"input[name=\'icons\']\" ),\n			{\n				emitEvents : false,\n				datasource : lookuplist,\n				model : gadgetui.model,\n				itemRenderer: renderItem,\n				menuItemRenderer: renderMenuItem,\n				width: 500\n			}\n		]\n		);\n\n		function logChanges(obj) {\n			console.log(obj);\n			showModel();\n		}\n\n		var reset = document.querySelector(\"input[name=\'resetLookupList\']\");\n		reset.addEventListener(\"click\", function() {\n			ll.reset();\n		});\n','	<p>Test the LookupListInput control</p>\n	<p>Type into the box to find icons in the Open Iconic collection.</p>\n				<div>\n					<input name=\"icons\" type=\"text\" gadgetui-bind=\"user.icons\" placeholder=\"Icons\"/>\n					<input type=\"button\" value=\"Reset Icon list\" name=\"resetLookupList\" />\n				</div>\n	<p>The lookup function matches against the label of the set of icons for open-iconic in PNG format in https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/.\n		The renderer uses the \"-8x\" version of the icons to provide a large item display.\n	</p>','','\0','gadget-ui LookupListINput (advanced)');
/*!40000 ALTER TABLE `apps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libraries`
--

DROP TABLE IF EXISTS `libraries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `libraries` (
  `libraryID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `link` varchar(200) NOT NULL,
  PRIMARY KEY (`libraryID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libraries`
--

LOCK TABLES `libraries` WRITE;
/*!40000 ALTER TABLE `libraries` DISABLE KEYS */;
INSERT INTO `libraries` VALUES (1,5,'jQuery 3.4.0','https://code.jquery.com/jquery-3.4.0.min.js'),(3,5,'Bootstrap 4.3.1 CSS','https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'),(6,5,'gadget-UI CSS','/lib/gadget-ui/dist/gadget-ui.css'),(9,5,'Open-iconic fonts SVG 1.1.1','https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/fonts/open-iconic.svg'),(10,5,'Open-iconic fonts CSS 1.1.1','https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic.min.css'),(11,5,'ThreeJS 104 Module','https://cdnjs.cloudflare.com/ajax/libs/three.js/104/three.module.js'),(13,5,'Feather Icons 4.21.0','https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.21.0/feather.js'),(17,5,'gadget-ui (local)','http://127.0.0.1:4100/lib/gadget-ui/dist/gadget-ui.js'),(18,6,'/lib/gadget-ui/dist/gadget-ui.css','5'),(19,6,'/lib/gadget-ui/dist/gadget-ui.css','5');
/*!40000 ALTER TABLE `libraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userProfile`
--

DROP TABLE IF EXISTS `userProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userProfile` (
  `userID` int(11) NOT NULL,
  `profilePic` varchar(30) DEFAULT NULL,
  `profileTitle` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  CONSTRAINT `fk_userProfile_user` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userProfile`
--

LOCK TABLES `userProfile` WRITE;
/*!40000 ALTER TABLE `userProfile` DISABLE KEYS */;
INSERT INTO `userProfile` VALUES (5,NULL,NULL);
/*!40000 ALTER TABLE `userProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `hash` char(60) NOT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'user','$2a$10$8ps8M143uRO/t2plnLYNgeHH1.iwbJJOsQhNLdfgVJrGPaFLQQsxu','Test','User','2019-04-26 00:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'livesandbox'
--
/*!50003 DROP PROCEDURE IF EXISTS `getApps` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`livesandbox`@`localhost` PROCEDURE `getApps`( IN userID INT, IN rowcount INT, IN rowoffset INT )
BEGIN
	SELECT a.appID, a.userID, a.jsCode, a.htmlCode, a.cssCode, a.esModule, a.name
    FROM  apps a 
    WHERE userID = userID
    LIMIT rowcount OFFSET rowoffset;
   
	SELECT count(*) as totalCount
    FROM  apps
    WHERE userID = userID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getLibraries` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`livesandbox`@`localhost` PROCEDURE `getLibraries`( IN userID INT, IN rowcount INT, IN rowoffset INT )
BEGIN
	SELECT *
    FROM  libraries
    WHERE userID = userID
    LIMIT rowcount OFFSET rowoffset;
   
	SELECT count(*) as totalCount
    FROM  libraries
    WHERE userID = userID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-28 11:39:54
