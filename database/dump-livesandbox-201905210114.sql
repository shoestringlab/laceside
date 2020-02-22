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
INSERT INTO `appLibraries` VALUES (2,6),(7,6),(9,6),(9,10);
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
  `jsCode` varchar(6000) DEFAULT NULL,
  `htmlCode` varchar(6000) DEFAULT NULL,
  `cssCode` varchar(6000) DEFAULT NULL,
  `esModule` bit(1) NOT NULL DEFAULT b'0',
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`appID`),
  KEY `apps_FK` (`userID`),
  CONSTRAINT `apps_FK` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apps`
--

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;
INSERT INTO `apps` VALUES (2,5,'import {floatingpane,constructor} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\nvar fp1 = constructor( floatingpane,\n  [ document.querySelector(\"#fp1\"),\n  {\n    title : \"Random Text\",\n    enableShrink : false,\n    top:100,\n    left:100\n  }] ) ;\n','	<div name=\"collapser\" id=\"fp1\" style=\"background-color: rgba( 255,255,255,.7);\">\n	The newest possible...\n\n	FloatingPane.prototype.config = function( options ){\n		options = ( options === undefined ? {} : options );\n		this.title = ( options.title === undefined ? \"\": options.title );\n		this.path = ( options.path === undefined ? \"/bower_components/gadget-ui/dist/\": options.path );\n		this.position = ( options.position === undefined ? { my: \"right top\", at: \"right top\", of: window } : options.position );\n		this.padding = ( options.padding === undefined ? \"15px\": options.padding );\n		this.paddingTop = ( options.paddingTop === undefined ? \".3em\": options.paddingTop );\n		this.width = ( options.width === undefined ? gadgetui.util.getStyle( this.selector, \"width\" ) : options.width );\n		this.minWidth = ( this.title.length > 0 ? Math.max( 100, this.title.length * 10 ) + 20 : 100 );\n\n		this.height = ( options.height === undefined ? gadgetui.util.getNumberValue( gadgetui.util.getStyle( this.selector, \"height\" ) ) + ( gadgetui.util.getNumberValue( this.padding ) * 2 ) : options.height );\n		this.interiorWidth = ( options.interiorWidth === undefined ? \"\": options.interiorWidth );\n		this.opacity = ( ( options.opacity === undefined ? 1 : options.opacity ) );\n		this.zIndex = ( ( options.zIndex === undefined ? 100000 : options.zIndex ) );\n		this.minimized = false;\n		this.relativeOffsetLeft = 0;\n		this.borderColor = ( options.borderColor === undefined ? \"silver\": options.borderColor );\n		this.headerColor = ( options.headerColor === undefined ? \"black\": options.headerColor );\n		this.headerBackgroundColor = ( options.headerBackgroundColor === undefined ? \"silver\": options.headerBackgroundColor );\n		this.borderRadius = ( options.borderRadius === undefined ? 6 : options.borderRadius );\n		this.enableShrink = false;\n	};\n\n	</div>','#fp1{\n  width:500px;\n  height:300px;\n  overflow:hidden;\n}','','gadget-ui FloatingPane'),(7,5,'import {gadgetui} from \"/lib/gadget-ui/dist/gadget-ui.es6.js\";\n\nvar collapser = gadgetui.objects.Constructor( gadgetui.display.CollapsiblePane, \n        [ document.getElementsByTagName( \"div\" )[0],\n		{\n			title : \"Random Text\",\n			collapse: true,\n			class: \'myPane\',\n			headerClass: \'myHeader\'\n		}]);\n\nconsole.log( \"import {gadgetui} from /lib/gadget-ui/dist/gadget-ui.es6.js\");','<div name=\"collapser\">\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:17:2:Unnecessary \'use strict\'.<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:48:3:Missing \'break\' after \'case\'.<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:84:107:Expected \'!==\' and instead saw \'!=\'.<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:266:11:Expected \'===\' and instead saw \'==\'.<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:272:6:Combine this with the previous \'var\' statement.<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:272:16:Use the object literal notation {} or Object.create(null).<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:277:6:Combine this with the previous \'var\' statement.<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:280:2:\'exception\' was used before it was defined.<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:281:2:Expected an identifier and instead saw \'if\' (a reserved word).<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:281:38:Expected an operator and instead saw \'{\'.<br/>\n  jslint:/Users/rmunn/git/gadgetui/dist/gadget-ui.js:282:4:Cannot read property \"line\" from undefined\n</div>\n','\n.myPane{\n  border: 1px dashed red;\n  border-radius: 5px;\n}\n\ndiv.myPane > div:nth-child(2){\n  padding: .5em;\n}\n\n.myHeader{\n  background-color: #ccf;\n}','','gadget-ui CollapsiblePane'),(9,5,'import {gadgetui} from \'/lib/gadget-ui/dist/gadget-ui.es6.js\';\n\ngadgetui.objects.Constructor( gadgetui.display.Bubble, [document.getElementsByTagName( \"select\" )[0],\n	\"This control is not working...\",\n	{\n		arrowPosition : \"left bottom\",\n		position : \"top right\",\n		arrowDirection : \"middle\",\n		font: \".7em \'Arial\'\",\n		borderWidth : 1,\n		height: 30,\n		padding: 5,\n		arrowSize: 0,\n		borderRadius: 5,\n		closable : true\n	}]);','		<p>Test the Bubble control.</p>\n\n		<p>Select your favorite breakfast food, or enter something new:</p>\n	<div style=\"margin-left: 50px;\">\n\n		<select name=\"food\">\n		\n		</select>\n	</div>','','','gadget-ui Bubble');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libraries`
--

LOCK TABLES `libraries` WRITE;
/*!40000 ALTER TABLE `libraries` DISABLE KEYS */;
INSERT INTO `libraries` VALUES (1,5,'jQuery 3.4.0','https://code.jquery.com/jquery-3.4.0.min.js'),(3,5,'Bootstrap 4.3.1 CSS','https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'),(6,5,'gadget-UI CSS','/lib/gadget-ui/dist/gadget-ui.css'),(9,5,'Open-iconic fonts SVG 1.1.1','https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/fonts/open-iconic.svg'),(10,5,'Open-iconic fonts CSS 1.1.1','https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic.min.css'),(11,5,'ThreeJS 104 Module','https://cdnjs.cloudflare.com/ajax/libs/three.js/104/three.module.js');
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

-- Dump completed on 2019-05-21  1:14:45
