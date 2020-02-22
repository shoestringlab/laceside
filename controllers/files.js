const fileService = require( '../model/fileservice' );
const cuid = require( 'cuid' );
const fs = require('fs');
const tempPath = './upload/temp/';

function getArgs( request ){
  let args = {
    id: request.get("x-id"),
    filename: request.get( "x-filename" ),
    filesize: parseInt( request.get( "x-filesize" ), 10 ),
    part: parseInt( request.get( "x-filepart" ), 10 ),
    parts: parseInt( request.get( "x-parts" ), 10 ),
    contentlength: parseInt( request.get( "Content-Length" ), 10),
    mimetype: request.get( "x-mimetype" )
  };

  if( args.part === 1 ){
    args.id = cuid();
  }
  return args;
}

function writeFile( request, tempFile ){
  let wstream = fs.createWriteStream( tempPath + tempFile );
  wstream.write( request.body );
  wstream.end();
}

module.exports = {
  upload: function( request, response ){
    let args = getArgs( request );
    let tempFile = cuid();
    writeFile( request, tempFile );

    fileService.upload( args.id, (tempPath + tempFile), args.part, args.parts, args.filename, args.filesize )
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
