-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: laceside
-- ------------------------------------------------------
-- Server version	5.5.5-10.11.8-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appLibraries` (
  `appID` varchar(50) NOT NULL,
  `libraryID` varchar(50) NOT NULL,
  KEY `appLibrary_FK` (`libraryID`),
  KEY `appLibrary_FK_1` (`appID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appLibraries`
--

LOCK TABLES `appLibraries` WRITE;
/*!40000 ALTER TABLE `appLibraries` DISABLE KEYS */;
INSERT INTO `appLibraries` VALUES ('ck9eyulsc000066ilh3vkh0dy','ck9ez9rgt0000ypil3nsfh9za'),('ck9eyulsc000066ilh3vkh0dy','ck9ezcyzs00008nil4mya4s19'),('ck9de0jw300005tileacy3l0l','ck9ez9rgt0000ypil3nsfh9za'),('ck9ez3g5v0000z0il98v7h177','ck9ez9rgt0000ypil3nsfh9za'),('ck9ez3g5v0000z0il98v7h177','ck9ezbxo600005fil3gw7b1l8'),('cm0q7695v00002863vu9iko4h','cm0q6j8a400002863po2sdebw'),('ck9eyzizn0000l4ileik0bkp3','ck9ezcyzs00008nil4mya4s19'),('ck9eyzizn0000l4ileik0bkp3','ck9ez9rgt0000ypil3nsfh9za'),('ck9ez1bg90000riilf2ibb35s','ck9ezcyzs00008nil4mya4s19'),('ck9ez1bg90000riilf2ibb35s','ck9ez9rgt0000ypil3nsfh9za'),('ck9ez48g900001sil86o8azrm','ck9ez9rgt0000ypil3nsfh9za'),('ck9ez2mwm0000w2ild3z8glx1','ck9ez9rgt0000ypil3nsfh9za'),('ck9eyyhfm0000gyilfq96gism','ck9ez9rgt0000ypil3nsfh9za'),('cm1zj7mi300002865e8mk477l','cm1k8zllg00002865jmle63jo'),('ck9dduxhg0000p9il8dw74tgu',''),('ck9dduxhg0000p9il8dw74tgu','ck9ez9rgt0000ypil3nsfh9za'),('ck9dduxhg0000p9il8dw74tgu','ck9ezbxo600005fil3gw7b1l8'),('cm0dgplb900002863gp85d1ln','ck9ez9rgt0000ypil3nsfh9za');
/*!40000 ALTER TABLE `appLibraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apps`
--

DROP TABLE IF EXISTS `apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apps` (
  `appID` varchar(50) NOT NULL,
  `userID` varchar(50) NOT NULL,
  `jsCode` text DEFAULT NULL,
  `htmlCode` text DEFAULT NULL,
  `cssCode` text DEFAULT NULL,
  `esModule` bit(1) NOT NULL DEFAULT b'0',
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`appID`),
  KEY `apps_FK` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apps`
--

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;
INSERT INTO `apps` VALUES ('ck9dduxhg0000p9il8dw74tgu','ck9a4ykk20001245vo0cn23a4','import {gadgetui, combobox,constructor, model} from \'/lib/gadget-ui/dist/gadget-ui.es.js\';\n\n\nvar user = { food : \"\" };\nvar foods = [ { text: \"cereal\", id : 1 },\n               { text: \"eggs\", id : 2 },\n               { text: \"danish\", id : 3 }\n              ];\n\n// set the model first if we\'re using auto data-binding\nmodel.set(\"user\", user);\n\nconst cb = constructor( combobox,[  document.querySelector( \"select[name=\'food\']\" ),\n	 {\n    animate: true,\n    glowColor: \'gold\',\n		save : function( text, resolve, reject ){\n				console.log( \"saving new value\" );\n				if( foods.constructor === Array ){\n					var newId = foods.length + 1;\n					foods.push( { text : text, id : newId } );\n					resolve( newId );\n				}else{\n					reject( \"Value was not saved.\" );\n				}\n		},\n		dataProvider : {\n			// you can pre-populate \'data\' or the refresh() function will be called when you instantiate the ComboBox\n			//data : undefined,\n			refresh : function( dataProvider, resolve, reject ){\n				if( foods.constructor === Array ){\n					dataProvider.data = foods;\n					resolve();\n				}else{\n					reject( \"Data set is not an array.\" );\n				}\n			}\n		}\n	}\n], true);\n\ncb.on(\"keyup\", function(obj){\n	console.log( \"keyup: \");\n	console.dir( obj );\n});\n\n document.querySelector( \"select[name=\'food\']\" )\n 	.addEventListener( \"gadgetui-combobox-change\", function( event ){\n 		console.log( event.detail );\n 	});','<p>Test the ComboBox control.</p>\n\n		<p>Select your favorite breakfast food, or enter something new:</p>\n	<div style=\"margin-left: 50px;\">\n \n		<select name=\"food\" gadgetui-bind=\"user.food\">\n\n		</select>\n	</div>','			body {font-size: 2em;}\n			input, select, select option{ font-size: 1em;}\n\ndiv.gadgetui-combobox-selectwrapper::after{\n  content: url( /lib/feather-icons/dist/icons/chevron-down.svg ) !important;\n}',_binary '','gadget-ui ComboBox test'),('ck9de0jw300005tileacy3l0l','ck9a4ykk20001245vo0cn23a4','import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es.js\';\n\nvar fp1 = gadgetui.objects.Constructor( gadgetui.display.Dialog,\n	[ document.querySelector(\"#dlg1\"),\n		{\n			top: 200,\n			left: 200,\n			title : \"Some Dialog\",\n			path : \"/dist/\",\n			enableShrink : false,\n			overflow: \"hidden\",\n			buttons: [\n				{ label: \'Save\', click: function(){ \n                  console.log( \'Saved\')\n                }},\n				{ label: \'Cancel\', click: function(){ \n                	fp1.close();\n                }}\n			]\n		}] );\n','	<p>Test the Dialog control.</p>\n	<div name=\"collapser\" id=\"dlg1\" style=\"background-color: rgba( 255,255,255,.7);\">\n	The newest possible...\n\n	Dialog.prototype.config = function( options ){\n		options = ( options === undefined ? {} : options );\n		this.title = ( options.title === undefined ? \"\": options.title );\n		this.path = ( options.path === undefined ? \"/bower_components/gadget-\n\n	</div>\n','#dlg1{\n width: 400px;\n  overflow: hidden !important;\n  overflow-x: hidden !important;\n}',_binary '','gadget-ui Dialog'),('ck9eyulsc000066ilh3vkh0dy','ck9a4ykk20001245vo0cn23a4','\n		var user = {\n			firstname : \"\",\n			lastname : \"\",\n			friends : []\n		};\n\n		var lookuplist = [ {\n			label : \"Abby\",\n			email : \"abby@abby\",\n			value : \"133\",\n			title : \"Abby abby@abby\"\n		}, {\n			label : \"Andy\",\n			email : \"andy@andy\",\n			value : \"153\",\n			title : \"Andy andy@andy\"\n		}, {\n			label : \"Anne\",\n			email : \"anne@anne\",\n			value : \"123\",\n			title : \"Anne anne@anne\"\n		},{\n			label : \"Bobby\",\n			email : \"bobby@bobby\",\n			value : \"456\"\n		}, {\n			label : \"Cara\",\n			email : \"cara@cara\",\n			value : \"789\"\n		}, {\n			label : \"Dan\",\n			email : \"dan@dan\",\n			value : \"102\"\n		} ];\n\n		function renderLabel(item) {\n			return item.label + \"(\" + item.email + \")\";\n		}\n\n		// set the model first if we\'re using auto data-binding\n		gadgetui.model.set(\"user\", user);\n\n		var ll = gadgetui.objects.Constructor( gadgetui.input.LookupListInput,\n			[ document.querySelector( \"input[name=\'friends\']\" ),\n			{\n				emitEvents : false,\n				datasource : lookuplist,\n				model : gadgetui.model,\n				labelRenderer : renderLabel,\n				width: 500\n			}\n		]\n		);\n\n		function logChanges(obj) {\n			console.log(obj);\n			showModel();\n		}\n\n		var reset = document.querySelector(\"input[name=\'resetLookupList\']\");\n		reset.addEventListener(\"click\", function() {\n			ll.reset();\n		});\n','	<p>Test the LookupListInput control</p>\n	<p>Type into the box to find your friends. ( Hint: Start with the letter A. )</p>\n				<div>\n					<input name=\"friends\" type=\"text\" gadgetui-bind=\"user.friends\" placeholder=\"Friends\"/>\n					<input type=\"button\" value=\"Reset Friends list\" name=\"resetLookupList\" />\n				</div>\n	<p>The lookup function matches against the label of this dataset.\n	<p>\n		The dataset for the lookup:\n	</p>\n	<pre>\n		var lookuplist = [ {\n			label : \"Abby\",\n			email : \"abby@abby\",\n			value : \"133\",\n			title : \"Abby abby@abby\"\n		}, {\n			label : \"Andy\",\n			email : \"andy@andy\",\n			value : \"153\",\n			title : \"Andy andy@andy\"\n		}, {\n			label : \"Anne\",\n			email : \"anne@anne\",\n			value : \"123\",\n			title : \"Anne anne@anne\"\n		},{\n			label : \"Bobby\",\n			email : \"bobby@bobby\",\n			value : \"456\"\n		}, {\n			label : \"Cara\",\n			email : \"cara@cara\",\n			value : \"789\"\n		}, {\n			label : \"Dan\",\n			email : \"dan@dan\",\n			value : \"102\"\n		} ];\n	</pre>\n	</p>\n','',_binary '\0','gadget-ui LookupListInput'),('ck9eyyhfm0000gyilfq96gism','ck9a4ykk20001245vo0cn23a4','import {floatingpane,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es.js\';\n\nvar fp1 = constructor( floatingpane,\n  [ document.querySelector(\"#fp1\"),\n  {\n    title : \"Random Text\",\n    enableShrink : false,\n    top:100,\n    left:100\n  }] ) ;\n\nconsole.log( \"Floating Pane\" );','	<div name=\"collapser\" id=\"fp1\" style=\"background-color: rgba( 255,255,255,.7);\">\n	The newest possible...\n\n	\n	</div>','#fp1{\n  width:500px;\n  height:300px;\n  overflow:hidden;\n}',_binary '','gadget-ui FloatingPane'),('ck9eyzizn0000l4ileik0bkp3','ck9a4ykk20001245vo0cn23a4','var collapser = gadgetui.objects.Constructor( gadgetui.display.CollapsiblePane, [ document.querySelector( \"div[name=\'collapser\']\"),\n		{\n			title : \"Random Text\",\n			collapse: true\n		}]);\n\n\n','<p>Test the CollapsiblePabe control.</p>\n<p>Control works</p>\n\n\n\n\n		<div style=\"width:400px;\" name=\"collapser\">\n\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:17:2:Unnecessary \'use strict\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:48:3:Missing \'break\' after \'case\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:84:107:Expected \'!==\' and instead saw \'!=\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:266:11:Expected \'===\' and instead saw \'==\'.<br/>\n			jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:272:6:Combine this with the previous \'var\' statement.<br/>\n\n		</div>','.myPane{\n  border: 1px dashed red;\n  border-radius: 5px;\n}\n\ndiv.myPane > div:nth-child(2){\n  padding: .5em;\n}\n\n.myHeader{\n  background-color: #ccf;\n}',_binary '\0','gadget-ui CollapsiblePane'),('ck9ez0gf40000ocil7ja34zrw','ck9a4ykk20001245vo0cn23a4','import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es.js\';\n\n\nconst bubble = gadgetui.objects.Constructor( gadgetui.display.Bubble, [ { color: \'black\', borderColor: \'red\', backgroundColor:\'white\', borderWidth:1, font: \"Nimbus Roman Bold\", fontSize: 20, justifyText: false\n}], true );\n\nbubble.setText( `Pick your preferred food. Add a choice if you prefer something else.` );\n\nbubble.setBubble(6,40, 280, 100, \'topright\', 70, 45 );\n\n\nbubble.render();\n\nbubble.attachToElement( document.getElementById(\'food\'), \'bottomleft\' );\n\ndocument.querySelector(\"#food\").addEventListener(\"change\", function(event){\n    bubble.destroy();\n});\n\nconsole.log( \"Bubble component example.\" );','<!doctype html>\n<html>\n	<head>\n		<title>gadget-ui Bubble Test</title>\n		<link rel=\"stylesheet\" href=\"/lib/gadget-ui/dist/gadget-ui.css\"/>\n		<link rel=\"stylesheet\" href=\"/lib/open-iconic/font/css/open-iconic.css\"/>\n		<script src=\'/lib/velocity/velocity.js\'></script>\n\n\n	</head>\n\n	<body>\n		<p>Test the Bubble control.</p>\n\n		<p>Select your favorite breakfast food, or enter something new:</p>\n	<div id=\"main\" style=\" width:500px;\" >\n\n		<select id=\"food\" name=\"food\" gadgetui-bind=\"user.food\" >\n			<option>cereal</option>\n			<option>toast</option>\n		</select>\n	</div>\n	<canvas id=\"bubbleCnvs\" height=\"200\" width=\"310\">\n		<div>Show me this Text</div>\n\n	</canvas>\n	</body>\n</html>\n','body {font-size: 1em;}\n			input, select, select option{ font-size: 1em;}\n\n			.bubbleClass{\n				border: 1px solid black;\n				padding: 5px;\n				border-radius: 5px;\n				width:220px;\n				font: 12px Arial;\n				background: #fff;\n				opacity: .7;\n\n			}\n\n			#bubbleCnvs{\n				z-index:2;\n				position:absolute;\n				background-color: \"#ff9900\";\n	\n			}\n\n			#main{\n				display:flex;\n				flex-direction:row-reverse;\n			}',_binary '','gadget-ui Bubble example'),('ck9ez1bg90000riilf2ibb35s','ck9a4ykk20001245vo0cn23a4','\n		var user = {\n			icons : []\n		};\n\n		var lookuplist = [{label:\"account-login.png\"},{label:\"account-logout.png\"},{label:\"action-redo.png\"},{label:\"action-undo.png\"},{label:\"align-center.png\"},{label:\"align-left.png\"},{label:\"align-right.png\"},{label:\"aperture.png\"},{label:\"arrow-bottom.png\"},{label:\"arrow-circle-bottom.png\"},{label:\"arrow-circle-left.png\"},{label:\"arrow-circle-right.png\"},{label:\"arrow-circle-top.png\"},{label:\"arrow-left.png\"},{label:\"arrow-right.png\"},{label:\"arrow-thick-bottom.png\"},{label:\"arrow-thick-left.png\"},{label:\"arrow-thick-right.png\"},{label:\"arrow-thick-top.png\"},{label:\"arrow-top.png\"},{label:\"audio.png\"},{label:\"audio-spectrum.png\"},{label:\"badge.png\"},{label:\"ban.png\"},{label:\"bar-chart.png\"},{label:\"basket.png\"},{label:\"battery-empty.png\"},{label:\"battery-full.png\"},{label:\"beaker.png\"},{label:\"bell.png\"},{label:\"bluetooth.png\"},{label:\"bold.png\"},{label:\"bolt.png\"},{label:\"book.png\"},{label:\"bookmark.png\"},{label:\"box.png\"},{label:\"briefcase.png\"},{label:\"british-pound.png\"},{label:\"browser.png\"},{label:\"brush.png\"},{label:\"bug.png\"},{label:\"bullhorn.png\"},{label:\"calculator.png\"},{label:\"calendar.png\"},{label:\"camera-slr.png\"},{label:\"caret-bottom.png\"},{label:\"caret-left.png\"},{label:\"caret-right.png\"},{label:\"caret-top.png\"},{label:\"cart.png\"},{label:\"chat.png\"},{label:\"check.png\"},{label:\"chevron-bottom.png\"},{label:\"chevron-left.png\"},{label:\"chevron-right.png\"},{label:\"chevron-top.png\"},{label:\"circle-check.png\"},{label:\"circle-x.png\"},{label:\"clipboard.png\"},{label:\"clock.png\"},{label:\"cloud.png\"},{label:\"cloud-download.png\"},{label:\"cloud-upload.png\"},{label:\"cloudy.png\"},{label:\"code.png\"},{label:\"cog.png\"},{label:\"collapse-down.png\"},{label:\"collapse-left.png\"},{label:\"collapse-right.png\"},{label:\"collapse-up.png\"},{label:\"command.png\"},{label:\"comment-square.png\"},{label:\"compass.png\"},{label:\"contrast.png\"},{label:\"copywriting.png\"},{label:\"credit-card.png\"},{label:\"crop.png\"},{label:\"dashboard.png\"},{label:\"data-transfer-download.png\"},{label:\"data-transfer-upload.png\"},{label:\"delete.png\"},{label:\"dial.png\"},{label:\"document.png\"},{label:\"dollar.png\"},{label:\"double-quote-sans-left.png\"},{label:\"double-quote-sans-right.png\"},{label:\"double-quote-serif-left.png\"},{label:\"double-quote-serif-right.png\"},{label:\"droplet.png\"},{label:\"eject.png\"},{label:\"elevator.png\"},{label:\"ellipses.png\"},{label:\"envelope-closed.png\"},{label:\"envelope-open.png\"},{label:\"euro.png\"},{label:\"excerpt.png\"},{label:\"expand-down.png\"},{label:\"expand-left.png\"},{label:\"expand-right.png\"},{label:\"expand-up.png\"},{label:\"external-link.png\"},{label:\"eye.png\"},{label:\"eyedropper.png\"},{label:\"file.png\"},{label:\"fire.png\"},{label:\"flag.png\"},{label:\"flash.png\"},{label:\"folder.png\"},{label:\"fork.png\"},{label:\"fullscreen-enter.png\"},{label:\"fullscreen-exit.png\"},{label:\"globe.png\"},{label:\"graph.png\"},{label:\"grid-four-up.png\"},{label:\"grid-three-up.png\"},{label:\"grid-two-up.png\"},{label:\"hard-drive.png\"},{label:\"header.png\"},{label:\"headphones.png\"},{label:\"heart.png\"},{label:\"home.png\"},{label:\"image.png\"},{label:\"inbox.png\"},{label:\"infinity.png\"},{label:\"info.png\"},{label:\"italic.png\"},{label:\"justify-center.png\"},{label:\"justify-left.png\"},{label:\"justify-right.png\"},{label:\"key.png\"},{label:\"laptop.png\"},{label:\"layers.png\"},{label:\"lightbulb.png\"},{label:\"link-broken.png\"},{label:\"link-intact.png\"},{label:\"list.png\"},{label:\"list-rich.png\"},{label:\"location.png\"},{label:\"lock-locked.png\"},{label:\"lock-unlocked.png\"},{label:\"loop.png\"},{label:\"loop-circular.png\"},{label:\"loop-square.png\"},{label:\"magnifying-glass.png\"},{label:\"map.png\"},{label:\"map-marker.png\"},{label:\"media-pause.png\"},{label:\"media-play.png\"},{label:\"media-record.png\"},{label:\"media-skip-backward.png\"},{label:\"media-skip-forward.png\"},{label:\"media-step-backward.png\"},{label:\"media-step-forward.png\"},{label:\"media-stop.png\"},{label:\"medical-cross.png\"},{label:\"menu.png\"},{label:\"microphone.png\"},{label:\"minus.png\"},{label:\"monitor.png\"},{label:\"moon.png\"},{label:\"move.png\"},{label:\"musical-note.png\"},{label:\"paperclip.png\"},{label:\"pencil.png\"},{label:\"people.png\"},{label:\"person.png\"},{label:\"phone.png\"},{label:\"pie-chart.png\"},{label:\"pin.png\"},{label:\"play-circle.png\"},{label:\"plus.png\"},{label:\"power-standby.png\"},{label:\"print.png\"},{label:\"project.png\"},{label:\"pulse.png\"},{label:\"puzzle-piece.png\"},{label:\"question-mark.png\"},{label:\"rain.png\"},{label:\"random.png\"},{label:\"reload.png\"},{label:\"resize-both.png\"},{label:\"resize-height.png\"},{label:\"resize-width.png\"},{label:\"rss.png\"},{label:\"rss-alt.png\"},{label:\"script.png\"},{label:\"share.png\"},{label:\"share-boxed.png\"},{label:\"shield.png\"},{label:\"signal.png\"},{label:\"signpost.png\"},{label:\"sort-ascending.png\"},{label:\"sort-descending.png\"},{label:\"spreadsheet.png\"},{label:\"star.png\"},{label:\"sun.png\"},{label:\"tablet.png\"},{label:\"tag.png\"},{label:\"tags.png\"},{label:\"target.png\"},{label:\"task.png\"},{label:\"terminal.png\"},{label:\"text.png\"},{label:\"thumb-down.png\"},{label:\"thumb-up.png\"},{label:\"timer.png\"},{label:\"transfer.png\"},{label:\"trash.png\"},{label:\"underline.png\"},{label:\"vertical-align-bottom.png\"},{label:\"vertical-align-center.png\"},{label:\"vertical-align-top.png\"},{label:\"video.png\"},{label:\"volume-high.png\"},{label:\"volume-low.png\"},{label:\"volume-off.png\"},{label:\"warning.png\"},{label:\"wifi.png\"},{label:\"wrench.png\"},{label:\"x.png\"},{label:\"yen.png\"},{label:\"zoom-in.png\"},{label:\"zoom-out.png\"}];\n\n\n		function renderItem( item ){\n			var wrapper = document.createElement( \"div\" );\n			gadgetui.util.setStyle( wrapper, \"padding-right\", 20 );\n			gadgetui.util.setStyle( wrapper, \"position\", \"relative\" );\n			gadgetui.util.setStyle( wrapper, \"display\", \"inline-block\" );\n			var icon = document.createElement( \"div\" );\n			gadgetui.util.setStyle( wrapper, \"width\", 64 );\n			gadgetui.util.setStyle( wrapper, \"margin\", 3 );\n			gadgetui.util.setStyle( icon, \"width\", 64 );\n			gadgetui.util.setStyle( wrapper, \"border\", \"1px solid silver\" );\n			var img = document.createElement( \"img\" );\n			img.setAttribute( \"src\", \"https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/\" + item.label.replace( \".png\", \"-8x.png\") );\n			img.setAttribute( \"title\", item.label );\n			icon.appendChild( img );\n\n			wrapper.appendChild( icon );\n			return wrapper; \n		}\n\n		function renderMenuItem( item ){\n			var wrapper = document.createElement( \"div\" );\n			gadgetui.util.setStyle( wrapper, \"padding-right\", 20 );\n			gadgetui.util.setStyle( wrapper, \"display\", \"block\" );\n			gadgetui.util.addClass( wrapper, \"gadgetui-lookuplist-item\" );\n\n			var icon = document.createElement( \"div\" );\n			//gadgetui.util.setStyle( wrapper, \"width\", 64 );\n			gadgetui.util.setStyle( wrapper, \"margin\", 3 );\n			//gadgetui.util.setStyle( icon, \"width\", 64 );\n			var img = document.createElement( \"img\" );\n			img.setAttribute( \"src\", \"https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/\" + item.label.replace( \".png\", \"-4x.png\") );\n			img.setAttribute( \"title\", item.label );\n			gadgetui.util.setStyle( img, \"margin-right\", 5 );\n			var label = document.createElement( \"span\" );\n			gadgetui.util.setStyle( label, \"font-size\", \".7em\" );\n			label.innerText = item.label;\n\n			icon.appendChild( img );\n			icon.appendChild( label );\n\n			wrapper.appendChild( icon );\n			return wrapper;\n		}\n		// set the model first if we\'re using auto data-binding\n		gadgetui.model.set(\"user\", user);\n\n		var ll = gadgetui.objects.Constructor( gadgetui.input.LookupListInput,\n			[ document.querySelector( \"input[name=\'icons\']\" ),\n			{\n				emitEvents : false,\n				datasource : lookuplist,\n				model : gadgetui.model,\n				itemRenderer: renderItem,\n				menuItemRenderer: renderMenuItem,\n				width: 500\n			}\n		]\n		);\n\n		function logChanges(obj) {\n			console.log(obj);\n			showModel();\n		}\n\n		var reset = document.querySelector(\"input[name=\'resetLookupList\']\");\n		reset.addEventListener(\"click\", function() {\n			ll.reset();\n		});\n','	<p>Test the LookupListInput control</p>\n	<p>Type into the box to find icons in the Open Iconic collection.</p>\n				<div>\n					<input name=\"icons\" type=\"text\" gadgetui-bind=\"user.icons\" placeholder=\"Icons\"/>\n					<input type=\"button\" value=\"Reset Icon list\" name=\"resetLookupList\" />\n				</div>\n	<p>The lookup function matches against the label of the set of icons for open-iconic in PNG format in https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/.\n		The renderer uses the \"-8x\" version of the icons to provide a large item display.\n	</p>','',_binary '\0','gadget-ui LookupListInput (advanced)'),('ck9ez2mwm0000w2ild3z8glx1','ck9a4ykk20001245vo0cn23a4','			import {menu,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es.js\';\n\n			let authAlert = function(){\n				alert(\"Auth option selected.\");\n			}\n\n			let menus = [\n				{ image: \"/img/profilepics/anon.png\",\n					menuItem:{\n						items:[\n							{ image: \"/img/profilepics/anon.png\",\n								link: authAlert },\n							{ label: \"Logout\",\n								link: \"\" }\n						]\n					}},\n				{ label: \"Options\",\n					menuItem: {\n						items:[ { label: \"Files\",\n											menuItem:{\n												items:[\n													{	label: \"Saving ...\",\n														link: \"\" },\n													{	label: \"Loading ...\",\n														link: \"\" }\n												]\n											}\n										},\n										{\n											label: \"Logs\",\n											menuItem: {\n												items:[\n													{ label: \"System\",\n														menuItem:{\n															items:[\n																{	label: \"Saving ...\",\n																	link: \"\" },\n																{	label: \"Loading ...\",\n																	link: \"\" }\n															]\n														}\n													}\n												]\n											}\n										}\n							]\n					}}\n			];\n			var md = constructor( menu, [ document.querySelector(\"#menu\"), { data: menus } ], true );\n\n			md.on( \"clicked\", function( obj, item ){\n				console.log( \"clicked\" );\n				console.log( obj );\n				console.log( item );\n			});','    <div id=\"header\">\n      <div id=\"menu\">\n\n      </div>\n    </div>','			body {font-size: 1em;}\n			input, select, select option{ font-size: 1em;}\n      #header{\n        display: flex;\n				padding: .5em .25em .25em .25em;\n        background: #77f;',_binary '','gadget-ui Menu example'),('ck9ez3g5v0000z0il98v7h177','ck9a4ykk20001245vo0cn23a4','import {modal,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es.js\';\n\nvar md = constructor( modal,\n                     [ document.querySelector(\"#modal\"),\n                      {featherPath: \"/lib/feather-icons\"}] ) ;','<p>Test the Modal control.</p>\n\n<div id=\"modal\">\n  This modal was generated by gadget-ui.\n</div>\n','body {font-size: 1em;}\ninput, select, select option{ font-size: 1em;}\n#modal{\n  width:500px;\n  height:300px;\n  overflow:hidden;\n}\n\nconsole.log( \"Modal generated.\" );',_binary '','gadget-ui Modal'),('ck9ez48g900001sil86o8azrm','ck9a4ykk20001245vo0cn23a4','import {tabs,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es.js\';\n\nvar tbs = constructor( tabs, [ document.querySelector(\"#tabs-h\"), { } ] );\n\nvar tbs3 = constructor( tabs, [ document.querySelector(\"#tabs-v\"), { direction: \'vertical\' } ] );','\n<div style=\"width: 515px;\">\n  <div id=\"tabs-h\">\n    <div data-tab=\"tab-h1\">One</div>\n    <div data-tab=\"tab-h2\">Two</div>\n    <div data-tab=\"tab-h3\">Three</div>\n  </div>\n  <div style=\"border:1px solid silver; height: 300px; padding: 1em;\">\n    <div id=\"tab-h1\">Content One</div>\n    <div id=\"tab-h2\">Content Two</div>\n    <div id=\"tab-h3\">Content Three</div>\n  </div>\n</div>\n<br><br>\n<div id=\"vertTabContainer\">\n  <div id=\"tabs-v\">\n    <div data-tab=\"tab-v1\">One</div>\n    <div data-tab=\"tab-v2\">Two</div>\n    <div data-tab=\"tab-v3\">Three</div>\n  </div>\n  <div class=\"vcontentContainer\">\n    <div id=\"tab-v1\" class=\"vtabContent\">Content One</div>\n    <div id=\"tab-v2\" class=\"vtabContent\">Content Two</div>\n    <div id=\"tab-v3\" class=\"vtabContent\">Content Three</div>\n  </div>\n</div>\n','\ninput, select, select option{ font-size: 1em;}\n#header{\n  display: flex;\n  padding: .5em .25em .25em .25em;\n  background: #777;\n}\n\n#tabs-h{\n  width:500px;\n}\n\n#vertTabContainer{\n  /* 	display: grid;\n  grid-template-columns: 10em auto; */\n  border:1px solid silver;\n  width: 90%;\n}\n\n#tabs-v{\n  width: 10em;\n  display:inline-block;\n  height: 320px;\n}\n\n.vtabContent{\n  display:inline;\n  width:auto;\n}\n\n.vcontentContainer{\n  height: 300px;\n\n  display: inline-block;\n  vertical-align: top;\n  padding-left: 1em;\n  padding-top: 1em;\n}',_binary '','gadget-ui Tabs'),('cm0dgplb900002863gp85d1ln','ck9a4ykk20001245vo0cn23a4','import {progressbar,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es.js\';\n\n		var pb1 = constructor( progressbar, [ document.querySelector(\"#pb\"), {id: \'pbxx1\', label: \'progress\', width: 400} ], true ) ;\n		pb1.render();\n		let myInterval = \"\";\n		let started = false;\n		let paused = true;\n		let increase = true;\n\n		document.querySelector( \"button[name=\'start\']\" ).addEventListener( \"click\", function(){\n			if( ! started ){\n				pb1.start();\n				started = true;\n			}\n			if( paused ){\n				paused = false;\n				\n				myInterval = setInterval(function () {\n				pb1.updatePercent( percent );\n				if( increase ){\n					percent = percent + 10;\n					\n				}else{\n					percent = percent - 10;\n				}\n				if( percent === 100 || percent === 0 ){\n					increase = !increase;\n				} \n				}, 500);\n			}\n		});\n\n		document.querySelector( \"button[name=\'stop\']\" ).addEventListener( \"click\", function(){\n			clearInterval(myInterval);\n			paused = true;\n		});\n\n        console.log( \"Progress Bar\" );\n        let percent = 10;','<link rel=\"stylesheet\" href=\"/lib/gadget-ui/dist/gadget-ui.css\"/>\n<br>\n<br>\n\n<p>Test the Progress bar control.</p>\n		<button name=\"start\">Start</button>\n		<button name=\"stop\">Stop</button>\n	<div id=\"pb\">\n	\n	</div>','#pb{\n  width:100%;\n  margin-left:auto;\n  margin-right:auto;\n}',_binary '','gadget-ui Progress Bar'),('cm0q7695v00002863vu9iko4h','ck9a4ykk20001245vo0cn23a4','$( document ).ready(function() {\n \n    $( \"a\" ).click(function( event ) {\n \n        alert( \"As you can see, the link no longer took you to jquery.com\" );\n \n        event.preventDefault();\n \n    });\n \n});\n','<a href=\"https://jquery.org\">jQuery</a>\n\n','',_binary '\0','jQuery alert example'),('cm11z0afg00002865vnqwr02i','ck9a4ykk20001245vo0cn23a4','const int8 = new Int8Array([0, 1, 2]); \nconsole.log(int8);\n\nconst uint8 = new Uint8Array([-1, 256, 3.5]); \nconsole.log(uint8); \n\nconst uint8c = new Uint8ClampedArray([-1, 256, 3.5]);\nconsole.log(uint8c); ','','',_binary '','TypeArray example'),('cm1209q7m0000286552q5zrec','ck9a4ykk20001245vo0cn23a4','import {a7} from \'/lib/altseven/dist/a7.js\';\nimport {floatingpane} from \'/lib/gadget-ui/dist/gadget-ui.es.js\';\n\nvar app = {\n  main: (function() {\n    \"use strict\";\n\n    return {\n      init: function(state) {\n\n        // cache initial selectors\n        a7.ui.setSelector( \'anonDiv\', \"div[name=\'anon\']\" );\n        a7.ui.setSelector(\'secureDiv\', \"div[name=\'secure\']\");\n\n        // render the login form\n        app.components.LoginForm( { id: \'loginForm\', selector: \"div[name=\'anon\']\" } );\n\n        var user = a7.model.get(\"user\");\n\n        app.components.Header( { id: \'header\', user: user, selector: \"div[name=\'header\']\" } );\n\n        app.components.Todo( {\n          id: \'todo\',\n          selector: \"div[name=\'app\']\"\n        } );\n\n        a7.events.publish( \"app.init\", { secure: state.secure });\n      }\n    };\n  })(),\n\n  auth: (function() {\n    \"use strict\";\n\n    var _authenticate = function() {\n      var promise = new Promise(function(resolve, reject) {\n        // check whether user is authenticated\n        a7.security.isAuthenticated(resolve, reject);\n      });\n\n      promise.then(function(secure) {\n        a7.ui.views[\'header\'].setState( { user: a7.model.get( \"user\" ) } );\n        app.ui.setLayout(secure);\n      });\n    };\n\n		var _logout;\n\n    return {\n      authenticate: _authenticate\n    };\n  })(),\n  components: (function() {\n\n    function Todo(props) {\n      var todo = a7.components.Constructor(a7.components.View, [props], true);\n\n      todo.state = {\n        text: \"\"\n      };\n\n      app.components.TodoList( { id: \'todoList\', parentID: \'todo\', items: [], selector: \"div[data-id=\'todoList\']\" } );\n\n      todo.template = function(){\n        return `<div name=\"todoForm\">\n				<h3>TODO</h3>\n				<div data-id=\"todoList\"></div>\n				<form>\n					<input name=\"todoInput\" value=\"${todo.state.text}\" data-onchange=\"changeTodoInput\" />\n					<button type=\"button\" name=\"todoSubmit\" data-onclick=\"clickSubmit\">Add ${todo.children.todoList.state.items.length + 1}</button>\n				</form>\n				</div>`;\n      };\n\n      todo.eventHandlers = {\n        changeTodoInput: function(event) {\n          todo.state.text = event.target.value;\n        },\n        clickSubmit: function(event) {\n          event.preventDefault();\n          var newItem = {\n            text: todo.state.text,\n            id: Date.now()\n          };\n\n          todo.setState( { text: \'\' } );\n          var items = todo.children.todoList.state.items.concat(newItem);\n          todo.children.todoList.setState({\n            items: items\n          });\n        }\n      };\n\n      return todo;\n    }\n\n    function TodoList(props) {\n      var todolist = a7.components.Constructor(a7.components.View, [props], true);\n      todolist.state = {\n        items: props.items\n      };\n\n      todolist.template = function() {\n        var str = `<ul>`;\n        this.state.items.forEach(function(item) {\n          str += `<li>${item.text}</li>`;\n        });\n        str += `</ul>`;\n        return str;\n      };\n\n      return todolist;\n    }\n\n    function LoginForm(props) {\n      var loginform = a7.components.Constructor(a7.components.View, [props], true);\n      loginform.state = {\n        username: \"\",\n        password: \"\"\n      };\n\n      loginform.template = `<div name=\"loginDiv\" class=\"pane\" style=\"width:370px;\">\n						<div class=\"right-align\">\n							<div class=\"col md right-align\"><label for=\"username\">Username</label></div>\n							<div class=\"col md\"><input name=\"username\" type=\"text\" data-onchange=\"handleUsername\"/></div>\n						</div>\n						<div class=\"right-align\">\n							<div class=\"col md right-align\"><label for=\"password\">Password</label></div>\n							<div class=\"col md\"><input name=\"password\" type=\"password\" data-onchange=\"handlePassword\"/></div>\n						</div>\n						<div class=\"right-align\">\n							<div class=\"col md\"></div>\n							<div class=\"col md\"><input name=\"login\" type=\"button\" value=\"Login\" data-onclick=\"handleClick\"/></div>\n						</div>\n					</div>\n					<p>\n						<h3>Instructions</h3>\n					</p>\n					<p>\n						Login using the credentials:\n					</p>\n					<p>\n						&nbsp;&nbsp;username : user\n					</p>\n					<p>\n						&nbsp;&nbsp;password: password\n					</p>`;\n\n      loginform.eventHandlers = {\n        handleClick: function(event) {\n\n          a7.router.open( \'/auth/login\', {\n            username: loginform.state.username,\n            password: loginform.state.password,\n            success: \'/test/app\'\n          });\n        },\n        handleUsername: function(event) {\n          loginform.state.username = event.target.value;\n        },\n        handlePassword: function(event) {\n          loginform.state.password = event.target.value;\n        }\n      };\n\n      return loginform;\n    }\n\n    function Header(props) {\n      var header = a7.components.Constructor(a7.components.View, [props], true);\n        \n      header.state = {\n        user: props.user\n      };\n\n			header.eventHandlers = {\n				logout: function(){\n					a7.router.open( \'/auth/logout\', { success: \'/test/tl.htm\' }) ;\n				}\n			};\n\n      header.template = function(){\n				return `Welcome, ${header.state.user.firstName} <a name=\"signout\" data-onclick=\"logout\">[ Sign out ]</a>`;\n			};\n\n      return header;\n    }\n\n    return {\n      Todo: Todo,\n      TodoList: TodoList,\n      LoginForm: LoginForm,\n      Header: Header\n    };\n\n  })(),\n\n  events: (function() {\n    a7.events.subscribe( \"app.show\", function( obj ){\n      a7.ui.views[\'header\'].setState( { user: a7.model.get( \"user\" ) } );\n      app.ui.setLayout(true);\n    });\n\n    a7.events.subscribe( \"app.init\", function( obj ){\n      app.auth.authenticate();\n    });\n  })(),\n  remote: {},\n  ui: (function() {\n    \"use strict\";\n    return {\n      //	templates: _templates,\n      setLayout: function(secure) {\n        a7.ui.getNode( secure ? a7.ui.selectors[\'secureDiv\'] : a7.ui.selectors[\'anonDiv\'] ).style.display = \'block\';\n        a7.ui.getNode(!secure ?  a7.ui.selectors[\'secureDiv\'] :  a7.ui.selectors[\'anonDiv\'] ).style.display = \'none\';\n      }\n    };\n  })()\n};\nexport var application = function init() {\n\n  var options = {\n    console: {\n      enabled: true,\n      container: floatingpane\n    },\n    logging: {\n      logLevel: \"INFO,ERROR,FATAL,TRACE\"\n    },\n    // remote module is optional, only required if you want to use the built-in auth system / token system\n    // or if you want to use the remote module for remote calls\n    remote: {\n      modules: {},\n      loginURL: \"/api/auth/login\",\n			logoutURL: \"/api/auth/logout\",\n      refreshURL: \"/api/auth/refresh\",\n      useTokens: true // defaults to true for the auth system\n    },\n    // router is optional. If you leave out the router options, it will not be initialized on app init.\n    // you can manually init the router later if you choose, e.g. a7.router.init( options, [routes] );\n    router: {\n      options: { useEvents: true },\n      routes: [\n        [ \'/auth/login\', \'auth.login\' ],\n        [ \'/auth/logout\', \'auth.logout\' ],\n        [ \'/test/app\', \'app.show\' ],\n        [ \'/test/tl.htm\', \'app.init\' ]\n      ]\n    },\n    ui: {\n      timeout: 30000\n    }\n  };\n\n  var p = new Promise(function(resolve, reject) {\n    a7.init(options, resolve, reject);\n  });\n  p.then(function(state) {\n    app.main.init(state);\n    a7.log.info(\"App init.\");\n  });\n  p[\'catch\'](function(message) {\n    console.log(message);\n  });\n\n  return app;\n};\n\nconsole.log( \"run app\");\nvar app = application();\n\n\n\n\n\n\n\n','<!doctype html>\n<html>\n\n<head>\n	<title>alt-7</title>\n	<link href=\"/lib/altseven/dist/a7.css\" rel=\"stylesheet\" type=\"text/css\">\n	<link href=\"/lib/gadget-ui/dist/gadget-ui.css\" rel=\"stylesheet\" type=\"text/css\">\n	<link href=\"/lib/open-iconic/font/css/open-iconic.css\" rel=\"stylesheet\" type=\"text/css\">\n</head>\n\n<body>\n	<div>\n\n		<h1>\n			altseven Task List\n		</h1>\n	</div>\n\n	<div name=\"main\">\n		<div name=\"anon\" style=\"display:none;\">\n		</div>\n		<div name=\"secure\" style=\"display:none;\">\n			<div name=\"header\">\n\n			</div>\n			<div name=\"app\">\n\n			</div>\n		</div>\n	</div>\n\n\n</body>\n\n</html>\n','',_binary '','altseven todo app'),('cm1zj7mi300002865e8mk477l','ck9a4ykk20001245vo0cn23a4','// This is a basic implementation example taken from the two.js homepage\n// licensed under the MIT license\n\nvar params = {\n  fullscreen: false\n}\nvar elem = document.body;\nvar two = new Two(params).appendTo(elem);\n\nvar circle = two.makeCircle(-70, 0, 50);\nvar rect = two.makeRectangle(70, 0, 100, 100);\ncircle.fill = \'#FF8000\';\ncircle.stroke = \'orangered\';\nrect.fill = \'rgba(0, 200, 255, 0.75)\';\nrect.stroke = \'#1C75BC\';\n\n// Groups can take an array of shapes and/or groups.\nvar group = two.makeGroup(circle, rect);\n\n// And have position, rotation, scale like all shapes.\ngroup.position.set(two.width / 2, two.height / 2);\ngroup.rotation = Math.PI;\ngroup.scale = 0.75;\n\n// You can also set the same properties a shape have.\ngroup.linewidth = 7;\n\ntwo.update();','','',_binary '\0','Two.js basic example'),('cm1zlrs5n00012863ofbebk9y','ck9a4ykk20001245vo0cn23a4','let colors = [\'red\',\'green\',\'blue\',\'yellow\',\'orange\'];\nlet deleted = colors.filter( color => color !== \'red\' );\nconsole.log(colors);\nconsole.log( deleted );','','',_binary '','array filter test');
/*!40000 ALTER TABLE `apps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filepart`
--

DROP TABLE IF EXISTS `filepart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filepart` (
  `fileId` varchar(50) NOT NULL,
  `filepath` varchar(500) NOT NULL,
  `filepart` int(11) NOT NULL,
  `parts` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filepart`
--

LOCK TABLES `filepart` WRITE;
/*!40000 ALTER TABLE `filepart` DISABLE KEYS */;
INSERT INTO `filepart` VALUES ('ck9ayt82t0000hdil7lbz5q70','./upload/temp/ck9ayt82u0001hdilckwa85pf',1,1);
/*!40000 ALTER TABLE `filepart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libraries`
--

DROP TABLE IF EXISTS `libraries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libraries` (
  `libraryID` varchar(50) NOT NULL,
  `userID` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `link` varchar(200) NOT NULL,
  PRIMARY KEY (`libraryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libraries`
--

LOCK TABLES `libraries` WRITE;
/*!40000 ALTER TABLE `libraries` DISABLE KEYS */;
INSERT INTO `libraries` VALUES ('ck9ez9rgt0000ypil3nsfh9za','ck9a4ykk20001245vo0cn23a4','gadget-UI CSS','/lib/gadget-ui/dist/gadget-ui.css'),('ck9ezbxo600005fil3gw7b1l8','ck9a4ykk20001245vo0cn23a4','Open-iconic fonts CSS 1.1.1','https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic.min.css'),('ck9ezcyzs00008nil4mya4s19','ck9a4ykk20001245vo0cn23a4','gadget-ui (local)','http://laceside.local/lib/gadget-ui/dist/gadget-ui.js'),('cm0q6j8a400002863po2sdebw','ck9a4ykk20001245vo0cn23a4','jQuery 3.7.1','https://code.jquery.com/jquery-3.7.1.min.js'),('cm1k8zllg00002865jmle63jo','ck9a4ykk20001245vo0cn23a4','Two.js 0.8.14','https://cdnjs.cloudflare.com/ajax/libs/two.js/0.8.14/two.min.js'),('cm1k9btof00002863fewhcxdn','ck9a4ykk20001245vo0cn23a4','Chart.js 4.4.1 CDN','https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js'),('cm1zk0rwn00002863ey84w22w','ck9a4ykk20001245vo0cn23a4','Apache eCharts 5.5.0','https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js'),('cm1zka22000002865rqrqi41j','ck9a4ykk20001245vo0cn23a4','math.js 13.1.1','https://cdnjs.cloudflare.com/ajax/libs/mathjs/13.1.1/math.js');
/*!40000 ALTER TABLE `libraries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwordReset`
--

DROP TABLE IF EXISTS `passwordReset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passwordReset` (
  `emailAddress` varchar(100) NOT NULL,
  `resetID` varchar(50) NOT NULL,
  `expires` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwordReset`
--

LOCK TABLES `passwordReset` WRITE;
/*!40000 ALTER TABLE `passwordReset` DISABLE KEYS */;
INSERT INTO `passwordReset` VALUES ('robert@shoestringlab.com','ck9nbg59s00005rilf0q4hb6r','2020-04-30 17:04:34'),('robert@shoestringlab.com','ck9wtyvy00000biil08an7hou','2020-05-07 08:52:57'),('robert@shoestringlab.com','ck9xcwrpo0000lpil1te8021w','2020-05-07 17:43:11'),('robert@shoestringlab.com','ssji459c04wzz147alo1c5ae','2024-09-10 15:48:43'),('robert@shoestringlab.com','cvflegydh9k6e4jytckahyt6','2024-09-10 15:50:13'),('robert@shoestringlab.com','opdhazaokswiefth2guqot2m','2024-09-10 15:56:32'),('robert@shoestringlab.com','eszsg6raei1078orwpb0ivw9','2024-09-10 16:12:09'),('robertdmunn@gmail.com','tdlfoq90t8kasgqarfsbs7mb','2024-09-10 17:28:02'),('robert@shoestringlab.com','zmycynyaib86xjwqg1oz0air','2024-09-10 00:00:00'),('robert@shoestringlab.com','ge7dyx16ci773anzbqz6699m','2024-09-10 00:00:00'),('robert@shoestringlab.com','q6au25mub62tfpej575k03nd','2024-09-10 00:00:00'),('robert@shoestringlab.com','sw11qh1kf7krfgrgb0io9hu7','2024-09-10 00:00:00'),('robert@shoestringlab.com','qdp0ca616krrmnmq16lfp84e','2024-09-10 18:37:41'),('robert@shoestringlab.com','sx1hcokbgknwcuodzrd9om1f','2024-09-10 00:00:00'),('robert@robertmunn.com','x1qlwpmeb1qyzyaox8zuokkh','2024-09-11 00:00:00');
/*!40000 ALTER TABLE `passwordReset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userConfirmation`
--

DROP TABLE IF EXISTS `userConfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userConfirmation` (
  `userConfirmationID` varchar(50) NOT NULL,
  `userID` varchar(50) NOT NULL,
  `confirmed` bit(1) NOT NULL DEFAULT b'0',
  `confirmedDate` datetime NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userConfirmation`
--

LOCK TABLES `userConfirmation` WRITE;
/*!40000 ALTER TABLE `userConfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `userConfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userProfile`
--

DROP TABLE IF EXISTS `userProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userProfile` (
  `userID` varchar(50) NOT NULL,
  `profilePic` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userProfile`
--

LOCK TABLES `userProfile` WRITE;
/*!40000 ALTER TABLE `userProfile` DISABLE KEYS */;
INSERT INTO `userProfile` VALUES ('ck9a4ykk20001245vo0cn23a4','/img/profilepics/wclq67irouco2id5c505vkup.png');
/*!40000 ALTER TABLE `userProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` varchar(50) NOT NULL,
  `username` varchar(45) NOT NULL,
  `hash` varchar(200) NOT NULL,
  `salt` varchar(50) NOT NULL DEFAULT '000',
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `nickName` varchar(100) DEFAULT NULL,
  `emailAddress` varchar(100) DEFAULT NULL,
  `disabled` bit(1) NOT NULL DEFAULT b'1',
  `dateUpdated` datetime DEFAULT curdate(),
  `dateCreated` datetime DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `users_emailAddress` (`emailAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('ck9a4ykk20001245vo0cn23a4','rmunn','d280dd5d214ebdff8faecc17b7f890e89e13e0ca0dde28b5ac029a6266a3f99b4dfd09eddbf4ac6bde0f42a72ab6d3569c4a70f7c0b1ac29bf553c9d0b979bfc','e7d967448d390360fca7d4553fdef4b8','Roberto','Munn','Robert','robert@robertmunn.com',_binary '\0','2024-09-27 12:05:11','2019-04-26 00:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-13 14:18:13
