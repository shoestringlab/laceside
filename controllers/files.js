import {fileservice} from '../model/fileservice.js';
import {createId} from '@paralleldrive/cuid2';
import * as fs from 'fs';
const tempPath = './upload/temp/';

function getArgs( request ){
	let args = {
	  id: request.get("x-id"),
	  tags: request.get("x-tags"),
	  filename: request.get( "x-filename" ),
	  filesize: parseInt( request.get( "x-filesize" ), 10 ),
	  part: parseInt( request.get( "x-filepart" ), 10 ),
	  parts: parseInt( request.get( "x-parts" ), 10 ),
	  contentlength: parseInt( request.get( "Content-Length" ), 10),
	  mimetype: request.get( "x-mimetype" )
	};
  
	if( args.part === 1 ){
	  args.id = createId();
	}
	return args;
  }
  
  function writeFile( request, tempFile ){
	let wstream = fs.createWriteStream( tempPath + tempFile );
	wstream.write( request.body );
	wstream.end();
  }
  
  export var files = (function() {
	return{
	  upload: function( request, response ){
		let args = getArgs( request );
		let tempFile = createId(); 
		// post image or profile pic?
		let path = ( args.tags.indexOf( 'postImage' ) >= 0 ? '/img/postimages/' : '/img/profilepics/' );
	
		writeFile( request, tempFile );
	
		fileservice.upload( args.id, (tempPath + tempFile), args.part, args.parts, args.filename, args.filesize, path )
		  .then( function( file ){
			if( args.part === args.parts ){
	
			  response.send( JSON.stringify( file ) );
	
			}else{
			  response.set("x-Id", args.id );
			  response.end("");
			}
		  })
		  .catch( function( error ){
			response.set( "Status-Code", 500 );
			response.send( error );
		  });
	  }
	};
  
  })();
  